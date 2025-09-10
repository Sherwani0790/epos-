import React, { useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import GlobalDropdown from "../../../ui-components/globaldropdown";
import GlobalTextarea from "../../../ui-components/globaltextarea";
import GlobalInputField from "../../../ui-components/globalinputfield";
import DefaultButton from "../../../ui-components/defaultbutton";
import SecondaryButton from "../../../ui-components/secondarybutton";
import { useDispatch, useSelector } from "react-redux";
import { addUser, getUserList, resetUserSlice, updateUser } from "../../../redux/auth_slice/usermanagement_slice";
// import { reduxService } from "../../../redux/services/redux_utils";
import { toast } from "react-toastify";

const AddEditUser = (props) => {
    const dispatch = useDispatch();
    const { onHide, editData } = props;

    //Redux Selector
    const addUserReducer = useSelector((state) => state.userMainList);
    const { addLoading, addSuccess, addError } = addUserReducer;
    const editUserReducer = useSelector((state) => state.userMainList);
    const { updateData, updateSuccess, updateError, editLoading } = editUserReducer;

    //Formik Vaidations
    const validationSchema = Yup.object().shape({
        fullName: Yup.mixed().required("Full Name is required"),
        emailAddress: Yup.mixed().required("Email Address is required"),
        role: Yup.mixed().required("Role is required"),
    });

    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: {
            fullName: "",
            emailAddress: "",
            userName: "",
            phoneNumber: "",
            gender: "",
            role: "",
            address: "",
        },
        onSubmit: async (values) => {
            const payload = {
                id: values.id,
                fullName: values.fullName,
                emailAddress: values.emailAddress,
                userName: values.userName,
                phoneNumber: values.phoneNumber,
                address: values.address,
                role: values.role, // Use values.role directly
                gender: values.gender, // Use values.gender directly
                isActive: true,
                password: "",
                profileImageBase64: "",
            };
            if (editData === null) {
                dispatch(addUser(payload));
            } else {
                payload.id = editData.id;
                dispatch(updateUser(payload));
            }
        },
    });
    useEffect(() => {
        if (addSuccess !== undefined) {
            if (addSuccess === true) {
                toast.success("Successfully Added");
                onHide();
                formik.resetForm();
                dispatch(getUserList());
            } else {
                toast.error(addError);
            }
        }
        if (updateSuccess !== undefined) {
            if (updateSuccess === true) {
                toast.success("Status Updated Successfully");
                formik.resetForm();
                onHide();
                dispatch(getUserList());
            } else {
                toast.error(updateError);
            }
        }
        return () => {
            dispatch(resetUserSlice());
        };
    }, [addSuccess, addError, updateData, updateSuccess, updateError,]);


    //Drpdown List
    const roleName = [
        { name: "Admin", code: "AD" },
        { name: "User", code: "US" },
    ];
    const genderName = [
        { name: "Male", code: "ML" },
        { name: "Female", code: "FM" },
        { name: "Other", code: "OT" },
    ];
    //Formik Error
    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };

    const settingValuesHanlder = (result) => {
        // console.log({ result });
        formik.setFieldValue("fullName", result?.fullName);
        formik.setFieldValue("emailAddress", result?.emailAddress);
        formik.setFieldValue("phoneNumber", result?.phoneNumber);
        formik.setFieldValue("userName", result?.userName);
        formik.setFieldValue("gender", result?.gender);
        formik.setFieldValue("role", result?.role);
        formik.setFieldValue("address", result?.address);
    };
    useEffect(() => {
        if (editData !== null) {
            settingValuesHanlder(editData);
        }
    }, [editData]);
    // console.log({ editData });

    return (
        <>
            <div className="container-fluid">
                <form onSubmit={formik.handleSubmit}>
                    <div className="grid">
                        <div className="col-12 md:col-6 pb-3">
                            <GlobalInputField label="Full Name" name="fullName" id="fullName" placeholder="Enter Full Name" isRequired disabled={editData !== null} value={formik.values.fullName} onChange={formik.handleChange} />
                            {getFormErrorMessage("fullName")}
                        </div>
                        <div className="col-12 md:col-6 pb-3">
                            <GlobalInputField label="Email Address" name="emailAddress" id="emailAddress" placeholder="Enter Email Address" isRequired disabled={editData !== null} value={formik.values.emailAddress} onChange={formik.handleChange} />
                            {getFormErrorMessage("emailAddress")}
                        </div>
                        <div className="col-12 md:col-6 pb-3">
                            <GlobalInputField
                                label="Username"
                                name="userName"
                                id="userName"
                                placeholder="Enter Username"
                                // isRequired
                                disabled={editData !== null}
                                value={formik.values.userName}
                                onChange={formik.handleChange}
                            />
                            {getFormErrorMessage("userName")}
                        </div>
                        <div className="col-12 md:col-6 pb-3">
                            <GlobalInputField label="Phone No" name="phoneNumber" id="phoneNumber" placeholder="Enter Phone No" disabled={editData !== null} value={formik.values.phoneNumber} onChange={formik.handleChange} />
                            {getFormErrorMessage("phoneNumber")}
                        </div>
                        <div className="col-12 md:col-6 pb-3">
                            <GlobalDropdown label="gender" name="gender" id="gender" options={genderName} optionLabel="name" optionValue="name" placeholder="Select" disabled={editData !== null} value={formik.values.gender} onChange={formik.handleChange} />
                            {getFormErrorMessage("gender")}
                        </div>
                        {/* {editData !== null && ( */}
                        <div className="col-12 md:col-6 pb-3">
                            <GlobalDropdown label="Role" id="role" name="role" options={roleName} optionLabel="name" optionValue="name" placeholder="Select" isRequired value={formik.values.role} onChange={formik.handleChange} />
                            {getFormErrorMessage("role")}
                        </div>
                        {/* )} */}
                        <div className="col-12 md:col-12 pb-3">
                            <GlobalTextarea label="Address" name="address" id="address" rows="3" placeholder="Enter Address" disabled={editData !== null} value={formik.values.address} onChange={formik.handleChange} />
                            {getFormErrorMessage("address")}
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
                                <SecondaryButton type="submit" style={{ marginLeft: "7px" }} label={editData == null ? "Save" : "Update"} loading={editData == null ? addLoading : editLoading} />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddEditUser;
