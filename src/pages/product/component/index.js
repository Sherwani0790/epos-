import React, { useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import SecondaryButton from "../../../ui-components/secondarybutton";
import DefaultButton from "../../../ui-components/defaultbutton";
import GlobalInputField from "../../../ui-components/globalinputfield";
import GlobalDropdown from "../../../ui-components/globaldropdown";
const AddEditProduct = (props) => {
    const { onHide, editData } = props;
    //Formik Vaidations
    const validationSchema = Yup.object().shape({
        productName: Yup.mixed().required("Product Name is required"),
        gender: Yup.mixed().required("Gender is required"),
        category: Yup.mixed().required("Category is required"),
        barCode: Yup.mixed().required("Barcode is required"),
    });

    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: {
            productName: "",
            gender: "",
            category: "",

            barCode: "",
        },
        onSubmit: async (values) => {
            if (editData === null) {
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
    const genderName = [
        { name: "S", code: "AD" },
        { name: "M", code: "US" },
        { name: "L", code: "US" },
        { name: "XL", code: "US" },
    ];
    const categoryName = [
        { name: "ABC", code: "ML" },
        { name: "XYZ", code: "FM" },
        { name: "General", code: "OT" },
    ];
    return (
        <>
            <div className="container-fluid">
                <form onSubmit={formik.handleSubmit}>
                    <div className="grid">
                        {/* <div className="col-12 md:col-6 pb-3">
                            <GlobalDropdown label="Product Name" name="productName" id="productName" options={productName} optionLabel="name" optionValue="name" placeholder="Select" isRequired value={formik.values.productName} onChange={formik.handleChange} />
                            {getFormErrorMessage("productName")}
                        </div> */}
                        <div className="col-12 md:col-6 pb-3">
                            <GlobalInputField label="Product Name" name="productName" id="productName" placeholder="Enter Product Name" isRequired value={formik.values.productName} onChange={formik.handleChange} />
                            {getFormErrorMessage("productName")}
                        </div>

                        <div className="col-12 md:col-6 pb-3">
                            <GlobalDropdown label="Gender" id="gender" name="gender" options={genderName} optionLabel="name" optionValue="name" placeholder="Select" isRequired value={formik.values.gender} onChange={formik.handleChange} />
                            {getFormErrorMessage("gender")}
                        </div>

                        <div className="col-12 md:col-6 pb-3">
                            <GlobalDropdown label="Category" id="category" name="category" options={categoryName} optionLabel="name" optionValue="name" placeholder="Select" isRequired value={formik.values.category} onChange={formik.handleChange} />
                            {getFormErrorMessage("category")}
                        </div>

                        <div className="col-12 md:col-6 pb-3">
                            <GlobalInputField label="BarCode" name="barCode" id="barCode" placeholder="Enter BarCode" isRequired value={formik.values.barCode} onChange={formik.handleChange} />
                            {getFormErrorMessage("barCode")}
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
        </>
    );
};

export default AddEditProduct;
