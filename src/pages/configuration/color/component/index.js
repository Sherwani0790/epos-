import React, { useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import GlobalInputField from "../../../../ui-components/globalinputfield";
import DefaultButton from "../../../../ui-components/defaultbutton";
import SecondaryButton from "../../../../ui-components/secondarybutton";
import { apiEPOS } from "../../../../constants/global";
import { toast } from "react-toastify";

const AddEditColor = (props) => {
    const { onHide, editData, onSuccess } = props;

    //Formik Validations
    const validationSchema = Yup.object().shape({
        color: Yup.mixed().required("Color is required"),
    });

    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: {
            color: editData ? editData.colorName : "", // prefill if editing
        },
        onSubmit: async (values) => {
            if (editData === null) {
                const body = {
                    colorId: 0,
                    colorName: values.color,
                    createdDate: new Date().toISOString(),
                    createdBy: 0,
                    lastModifiedDate: new Date().toISOString(),
                    lastModifiedBy: 0,
                };

                try {
                    const response = await apiEPOS.post("ProductColor/create", body);
                    if (response.status === 200) {
                        toast.success("Color added successfully!");
                        if (onSuccess) onSuccess();   // 🔑 refresh parent table
                        formik.resetForm();
                        onHide();
                    }
                } catch (error) {
                    console.error("❌ Error creating color:", error);
                }
            } else {
                const body = {
                    colorId: editData.colorId,
                    colorName: values.color,
                    createdDate: editData.createdDate || new Date().toISOString(),
                    createdBy: editData.createdBy ?? 0,
                    lastModifiedDate: new Date().toISOString(),
                    lastModifiedBy: 0,
                };

                try {
                    const response = await apiEPOS.patch("ProductColor/Update", body);
                    if (response.status === 200) {
                        toast.success("Color updated successfully!");
                        if (onSuccess) onSuccess();   // 🔑 refresh parent table
                        formik.resetForm();
                        onHide();
                    }
                } catch (error) {
                    console.error("❌ Error updating color!", error);
                }
            }
        },

    });
    useEffect(() => {
        if (editData) {
            formik.setValues({
                color: editData.colorName,
            });
        }
    }, [editData]);
    //Formik Error Helpers
    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };

    return (
        <div className="container-fluid">
            <form onSubmit={formik.handleSubmit}>
                <div className="grid">
                    <div className="col-12 pb-3">
                        <GlobalInputField label="Color Name" name="color" id="color" placeholder="Enter Color Name" isRequired value={formik.values.color} onChange={formik.handleChange} />
                        {getFormErrorMessage("color")}
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
                            <SecondaryButton type="submit" style={{ marginLeft: "7px" }} label={editData == null ? "Save" : "Update"} />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddEditColor;
