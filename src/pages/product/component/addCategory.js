import React, { useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import SecondaryButton from "../../../ui-components/secondarybutton";
import DefaultButton from "../../../ui-components/defaultbutton";
import GlobalInputField from "../../../ui-components/globalinputfield";
import GlobalDropdown from "../../../ui-components/globaldropdown";
const AddEditCategory = (props) => {
    const { onHide, editDataCategory } = props;
    //Formik Vaidations
    const validationSchema = Yup.object().shape({
        size: Yup.mixed().required("Size is required"),
        color: Yup.mixed().required("Color is required"),
        qunatity: Yup.mixed().required("Qunatity is required"),
        price: Yup.mixed().required("Price is required"),
    });

    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: {
            size: "",
            color: "",
            qunatity: "",
            price: "",
        },
        onSubmit: async (values) => {
            if (editDataCategory === null) {
                console.log(values);
            } else {
                console.log(values);
            }
        },
    });
    //Formik Error
    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };
    //Drpdown List
    const sizeName = [
        { name: "S", code: "AD" },
        { name: "M", code: "US" },
        { name: "L", code: "US" },
        { name: "XL", code: "US" },
    ];

    const colorName = [
        { name: "ABC", code: "ML" },
        { name: "XYZ", code: "FM" },
        { name: "General", code: "OT" },
    ];
    return (
        <>
            <div className="container-fluid">
                <form onSubmit={formik.handleSubmit}>
                    <div className="grid">
                        <div className="col-12 md:col-6 pb-3">
                            <GlobalDropdown label="Size" id="size" name="size" options={sizeName} optionLabel="name" optionValue="name" placeholder="Select" isRequired value={formik.values.size} onChange={formik.handleChange} />
                            {getFormErrorMessage("size")}
                        </div>

                        <div className="col-12 md:col-6 pb-3">
                            <GlobalDropdown label="Color" id="color" name="color" options={colorName} optionLabel="name" optionValue="name" placeholder="Select" isRequired value={formik.values.color} onChange={formik.handleChange} />
                            {getFormErrorMessage("color")}
                        </div>

                        <div className="col-12 md:col-6 pb-3">
                            <GlobalInputField label="Quantity (Stock)" name="qunatity" id="qunatity" placeholder="Enter Quantity (Stock)" isRequired value={formik.values.qunatity} onChange={formik.handleChange} />
                            {getFormErrorMessage("qunatity")}
                        </div>
                        <div className="col-12 md:col-6 pb-3">
                            <GlobalInputField label="Price" name="price" id="price" placeholder="Enter Price" isRequired value={formik.values.price} onChange={formik.handleChange} />
                            {getFormErrorMessage("price")}
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
                                <SecondaryButton type="submit" style={{ marginLeft: "7px" }} label={editDataCategory == null ? "Save" : "Update"} />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddEditCategory;
