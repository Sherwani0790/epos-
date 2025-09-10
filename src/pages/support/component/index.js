import React, { useEffect } from 'react'
import * as Yup from "yup";
import { useFormik } from 'formik';
import DefaultButton from '../../../ui-components/defaultbutton';
import SecondaryButton from '../../../ui-components/secondarybutton';
import GlobalDropdown from '../../../ui-components/globaldropdown';
import GlobalInputField from '../../../ui-components/globalinputfield';
import GlobalTextarea from '../../../ui-components/globaltextarea';
import { useDispatch, useSelector } from 'react-redux';
import { addSupport, getSupportList, resetSupportSlice, updateSupport } from '../../../redux/auth_slice/support_slice';
import { toast } from 'react-toastify';
// import { Button } from 'primereact/button';

const AddEditTicket = (props) => {
    const dispatch = useDispatch();
    const { onHide, editData } = props;
    //Redux Selector
    const addSupportReducer = useSelector((state) => state.supportMainList);
    const { addLoading, addSuccess, addError } = addSupportReducer;
    const editSupportReducer = useSelector((state) => state.supportMainList);
    const { updateData, updateSuccess, updateError, editLoading } = editSupportReducer;
    //Redux Selector End

    //Formik Vaidations
    const validationSchema = Yup.object().shape({
        title: Yup.mixed().required("Ticket Title is required"),
        ticket_type_text: Yup.mixed().required("Ticke Type is required"),
        priority_text: Yup.mixed().required("priority_text is required"),
        assignedto: Yup.mixed().required("Assign To is required"),
        status_text: Yup.mixed().required("Status is required"),
    });

    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: {
            title: "",
            ticket_type_text: "",
            priority_text: "",
            assignedto: "",
            ticket_details: "",
            status_text: "",
        },
        onSubmit: async (values) => {

            const payload = {
                id: values.id,
                title: values.title,
                ticket_type_text: values.ticket_type_text,
                created_at: "",
                resolution_date: "",
                createdby: "",
                assignedto: values.assignedto,
                priority_text: values.priority_text,
                status_text: values.status_text,
                ticket_details: values.ticket_details,
            };
            if (editData === null) {
                dispatch(addSupport(payload));
            } else {
                payload.id = editData.id;
                dispatch(updateSupport(payload));
                // console.log({ payload })

            }
            // console.log(values, "Payload values on submittion")
        }
    });
    // properties

    useEffect(() => {
        if (addSuccess !== undefined) {
            if (addSuccess === true) {
                toast.success("Successfully Added");
                onHide();
                formik.resetForm();
                dispatch(getSupportList());
            } else {
                toast.error(addError);
            }
        }
        if (updateSuccess !== undefined) {
            if (updateSuccess === true) {
                toast.success("Status Updated Successfully");
                formik.resetForm();
                onHide();
                dispatch(getSupportList());
            } else {
                toast.error(updateError);
            }
        }
        return () => {
            dispatch(resetSupportSlice());
        };
    }, [addSuccess, addError, updateData, updateSuccess, updateError,]);




    //Drpdown List
    const priority_textName = [
        { name: "Critical", code: "CT" },
        { name: "High", code: "HG" },
        { name: "Medium", code: "MD" },
        { name: "Low", code: "LW" },
    ];
    const ticketName = [
        { name: "Feedback", code: "FB" },
        { name: "Error", code: "ER" },
        { name: "Help", code: "HP" },
    ];
    const assignTo = [
        { name: "Ahmed", code: "AH" },
        { name: "Jaleel", code: "JL" },
        { name: "Islam", code: "IS" },
    ];
    const statusText = [
        { name: "Pending", code: "PG" },
        { name: "Succeded", code: "SD" },
        { name: "Rejected", code: "RD" },
    ];

    //Formik Error
    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };

    const settingValuesHanlder = (result) => {
        console.log({ result });
        formik.setFieldValue("title", result?.title);
        formik.setFieldValue("ticket_type_text", result?.ticket_type_text);
        formik.setFieldValue("priority_text", result?.priority_text);
        formik.setFieldValue("assignedto", result?.assignedto);
        formik.setFieldValue("ticket_details", result?.ticket_details);
        formik.setFieldValue("status_text", result?.status_text);
    };
    useEffect(() => {
        if (editData !== null) {
            settingValuesHanlder(editData);
        }
    }, [editData]);
    // console.log({ editData });


    return (
        <>
            <div className='container-fluid'>

                <form onSubmit={formik.handleSubmit}>
                    <div className="grid">
                        <div className="col-12 md:col-6 pb-3">
                            <GlobalInputField
                                label="Ticket Title"
                                name="title"
                                id="title"
                                placeholder="Enter text here"
                                isRequired
                                disabled={editData !== null}
                                value={formik.values.title}
                                onChange={formik.handleChange}
                            />
                            {getFormErrorMessage('title')}
                        </div>
                        <div className="col-12 md:col-6 pb-3">
                            <GlobalDropdown
                                label="Ticket Type"
                                name="ticket_type_text"
                                id="ticket_type_text"
                                options={ticketName}
                                optionLabel="name"
                                optionValue="name"
                                placeholder="Select"
                                isRequired
                                disabled={editData !== null}
                                value={formik.values.ticket_type_text}
                                onChange={formik.handleChange}
                            />
                            {getFormErrorMessage('ticket_type_text')}
                        </div>
                        <div className="col-12 md:col-6 pb-3">
                            <GlobalDropdown
                                label="Priority"
                                id="priority_text"
                                name="priority_text"
                                options={priority_textName}
                                optionLabel="name"
                                optionValue="name"
                                placeholder="Select"
                                isRequired
                                disabled={editData !== null}
                                value={formik.values.priority_text}
                                onChange={formik.handleChange}
                            />
                            {getFormErrorMessage('priority_text')}
                        </div>

                        {/* {editData !== null && ( */}
                        <>
                            <div className="col-12 md:col-6 pb-3">

                                <GlobalDropdown
                                    label="Assign To"
                                    id="assignedto"
                                    name="assignedto"
                                    options={assignTo}
                                    optionLabel="name"
                                    optionValue="name"
                                    placeholder="Select"
                                    isRequired
                                    value={formik.values.assignedto}
                                    onChange={formik.handleChange}
                                />
                                {getFormErrorMessage('assignedto')}
                            </div>
                            <div className="col-12 md:col-6 pb-3">
                                <GlobalDropdown
                                    label="Status"
                                    id="status_text"
                                    name="status_text"
                                    options={statusText}
                                    optionLabel="name"
                                    optionValue="name"
                                    placeholder="Select"
                                    isRequired
                                    value={formik.values.status_text}
                                    onChange={formik.handleChange}
                                />
                                {getFormErrorMessage('status_text')}
                            </div>
                        </>
                        {/* )} */}
                        <div className="col-12 col-md-12 pb-3">
                            <GlobalTextarea
                                label="Ticket Details"
                                name="ticket_details"
                                id="ticket_details"
                                rows="3"
                                placeholder="Enter text here"
                                // isRequired
                                disabled={editData !== null}
                                value={formik.values.ticket_details}
                                onChange={formik.handleChange}
                            />
                            {getFormErrorMessage('ticket_details')}
                        </div>
                        <div className='col-12 mb-3'>
                            <div className='text-center'>
                                <DefaultButton label="Cancel"
                                    style={{ marginRight: "7px" }}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        onHide()
                                    }} />
                                <SecondaryButton
                                    type="submit"
                                    style={{ marginLeft: "7px" }}
                                    label={editData == null ? "Save" : "Update"}
                                    loading={editData == null ? addLoading : editLoading}
                                />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}


export default AddEditTicket
