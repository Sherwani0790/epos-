import React, { useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import GlobalInputField from "../../../../ui-components/globalinputfield";
import DefaultButton from "../../../../ui-components/defaultbutton";
import SecondaryButton from "../../../../ui-components/secondarybutton";
import GlobalDropdown from "../../../../ui-components/globaldropdown";
import { toast } from "react-toastify";
import { addClientCreditRequest, getClientCreditRequestMainList, resetClientCreditRequestMainListSlice } from "../../../../redux/auth_slice/clientcreditreq_slice";
// import { reduxService } from '../../../../redux/services/redux_utils';
import { useDispatch, useSelector } from "react-redux";

import { getClientList } from "../../../../redux/auth_slice/client_slice";
const AddeditRequest = (props) => {
    const { editData, onHide } = props;

    const dispatch = useDispatch();
    const clientRequestReducer = useSelector((state) => state.clientCreditRequestMainList);

    const { data, addSuccess, addError } = clientRequestReducer;

    useEffect(() => {
        dispatch(getClientCreditRequestMainList());
    }, [dispatch]);

    const clientReducer = useSelector((state) => state.clientMainList);

    const { data: list } = clientReducer;
    useEffect(() => {
        dispatch(getClientList());
    }, [dispatch]);

    // const addClientCreditRequest = useSelector((state) => state.clientCreditRequestMainList);
    // const { addSuccess, addError } = addClientCreditRequest;
    // const editSupportReducer = useSelector((state) => state.clientCreditRequestMainList);
    // const { updateData, updateSuccess, updateError, editLoading } = editSupportReducer;

    //Formik Vaidations
    const validationSchema = Yup.object().shape({
        client_name: Yup.mixed().required("Client Name is required"),
        requested_Credit_Limit: Yup.mixed().required("Request Credit Limit is required"),
        // assign_To: editData === null ? null : Yup.mixed().required("Assign To is required"),
        // status_text: editData === null ? null : Yup.mixed().required("Status is required"),
        current_Credit_Limit: Yup.mixed().required("Current Credit Limit is required"),
    });

    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: {
            client_name: "",
            previous_credit_limit: "",
            requested_Credit_Limit: "",
            current_Credit_Limit: "",
        },
        onSubmit: async (values) => {
            // return;
            console.log(values);
            const payload = {
                id: values.id,
                client_id: values.client_id,
                client_name: values.client_name,
                previous_credit_limit: values.previous_credit_limit,
                requested_Credit_Limit: values.requested_Credit_Limit,
                current_Credit_Limit: values.current_Credit_Limit,
                request_type: "",
                status: "",
                createdDate: "",
                createdBy: "",
                creditRequest: "",
            };
            if (editData === null) {
                console.log("object", addClientCreditRequest(payload));
                dispatch(addClientCreditRequest(payload));
            }
            // else {
            //     payload.id = editData.id;
            //     dispatch(updateSupport(values));

            // }
        },
    });
    // console.log("data", clientRequestReducer)

    useEffect(() => {
        if (addSuccess !== undefined) {
            if (addSuccess === true) {
                toast.success("Successfully Added");
                onHide();
                formik.resetForm();
                dispatch(resetClientCreditRequestMainListSlice());
            } else {
                toast.error(addError);
            }
        }
    }, [addSuccess, addError, dispatch]);

    //Formik Error
    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };
    const settingValuesHanlder = (result) => {
        console.log({ result });
        formik.setFieldValue("client_name", result?.client_name);
        formik.setFieldValue("client_id", result?.client_id);
        formik.setFieldValue("previous_credit_limit", result?.previous_credit_limit);
        formik.setFieldValue("requested_Credit_Limit", result?.requested_Credit_Limit);
        formik.setFieldValue("current_Credit_Limit", result?.current_Credit_Limit);
    };
    useEffect(() => {
        if (editData !== null) {
            settingValuesHanlder(editData);
        }
    }, [editData]);

    // useEffect(() => {
    //     if (formik.values.previous_credit_limit && formik.values.requested_Credit_Limit) {
    //         const newCurrentCreditLimit = parseFloat(formik.values.previous_credit_limit) - parseFloat(formik.values.requested_Credit_Limit);
    //         formik.setFieldValue("current_Credit_Limit", newCurrentCreditLimit);
    //     }
    // }, [formik.values.previous_credit_limit, formik.values.requested_Credit_Limit]);

    // Update current_Credit_Limit whenever requested_Credit_Limit or previous_credit_limit changes
    useEffect(() => {
        if (formik.values.previous_credit_limit && formik.values.requested_Credit_Limit) {
            const newCurrentCreditLimit = parseFloat(formik.values.previous_credit_limit) + parseFloat(formik.values.requested_Credit_Limit);
            formik.setFieldValue("current_Credit_Limit", newCurrentCreditLimit.toFixed(2));
        }
    }, [formik.values.previous_credit_limit, formik.values.requested_Credit_Limit]);

    // Update previous_credit_limit and current_Credit_Limit based on client name selection
    const handleClientNameChange = (e) => {
        formik.handleChange(e);
        const selectedClientName = e.value;
        const selectedClient = data.find((client) => client.client_name === selectedClientName);
        if (selectedClient) {
            formik.setFieldValue("previous_credit_limit", selectedClient.previous_credit_limit);
            // Add logic here to set current credit limit if needed
        }
    };

    return (
        <>
            <div className="container-fluid">
                <form onSubmit={formik.handleSubmit}>
                    <div className="grid">
                        <div className="col-12 md:col-6 pb-3">
                            <GlobalDropdown
                                label="Client Name"
                                name="client_name"
                                id="client_name"
                                options={list}
                                optionLabel="client_name"
                                optionValue="client_name"
                                placeholder="Select"
                                isRequired
                                value={formik.values.client_name}
                                // onChange={formik.handleChange}
                                // onChange={(e) => {
                                //     formik.handleChange(e);
                                //     const selectedClientId = e.name;
                                //     const selectedClient = data.find(client => client.client_name === selectedClientId);
                                //     if (selectedClient) {
                                //         formik.setFieldValue("previous_credit_limit", selectedClient.previous_credit_limit);
                                //     }
                                // }}
                                onChange={handleClientNameChange}
                            />

                            {getFormErrorMessage("client_name")}
                        </div>

                        <div className="col-12 md:col-6 pb-3">
                            <GlobalInputField
                                label="Previous Credit Limit"
                                name="previous_credit_limit"
                                id="previous_credit_limit"
                                placeholder="0.00"
                                // isRequired
                                disabled
                                value={formik.values.previous_credit_limit}
                                onChange={formik.handleChange}
                            />
                            {getFormErrorMessage("previous_credit_limit")}
                        </div>

                        <div className="col-12 md:col-6 pb-3">
                            <GlobalInputField
                                label="Request Credit Limit"
                                name="requested_Credit_Limit"
                                id="requested_Credit_Limit"
                                placeholder="0.00"
                                isRequired
                                // disabled
                                value={formik.values.requested_Credit_Limit}
                                onChange={formik.handleChange}
                            />
                            {getFormErrorMessage("requested_Credit_Limit")}
                        </div>
                        <div className="col-12 md:col-6 pb-3">
                            <GlobalInputField label="Current Credit Limit" name="current_Credit_Limit" id="current_Credit_Limit" placeholder="0.00" isRequired disabled value={formik.values.current_Credit_Limit} onChange={formik.handleChange} />
                            {getFormErrorMessage("current_Credit_Limit")}
                        </div>

                        <div className="col-12 mb-3">
                            <div className="text-center">
                                <DefaultButton
                                    label="Cancel"
                                    style={{ marginRight: "7px" }}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        onHide();
                                    }}
                                />
                                <SecondaryButton
                                    type="submit"
                                    style={{ marginLeft: "7px" }}
                                    label={editData == null ? "Save" : "Update"}
                                    // loading={editData == null ? addLoading : editLoading}
                                />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddeditRequest;
