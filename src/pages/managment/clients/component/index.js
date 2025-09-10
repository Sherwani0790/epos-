import React, { useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";

import { useDispatch, useSelector } from "react-redux";
import GlobalInputField from "../../../../ui-components/globalinputfield";
import GlobalDropdown from "../../../../ui-components/globaldropdown";
import GlobalTextarea from "../../../../ui-components/globaltextarea";
import DefaultButton from "../../../../ui-components/defaultbutton";
import SecondaryButton from "../../../../ui-components/secondarybutton";
import { toast } from "react-toastify";
import { addClient, getClientList, resetClientSlice } from "../../../../redux/auth_slice/client_slice";

const AddEditClient = (props) => {
  const dispatch = useDispatch();
  const { onHide, editData } = props;

  //Redux Selector
  const addUserReducer = useSelector((state) => state.clientMainList);
  const { addLoading, addSuccess, addError } = addUserReducer;
  // const editUserReducer = useSelector((state) => state.userMainList);
  // const { updateData, updateSuccess, updateError, editLoading } = editUserReducer;




  //Formik Vaidations
  const validationSchema = Yup.object().shape({
    client_name: Yup.mixed().required("Full Name is required"),
    
  });

  const formik = useFormik({
    validationSchema: validationSchema,
    initialValues: {
      client_name: "",
      
    },
    onSubmit: async (values) => {
      const payload = {
        id: values.id,
        client_name: values.client_name,

      };
      if (editData === null) {
        dispatch(addClient(payload));
      } else {
        // payload.id = editData.id;
        // dispatch(updateUser(payload));
      }
    },
  });
  useEffect(() => {
    if (addSuccess !== undefined) {
      if (addSuccess === true) {
        toast.success("Successfully Added");
        onHide();
        formik.resetForm();
        dispatch(getClientList());
      } else {
        toast.error(addError);
      }
    }
    // if (updateSuccess !== undefined) {
    //   if (updateSuccess === true) {
    //     toast.success("Status Updated Successfully");
    //     formik.resetForm();
    //     onHide();
    //     dispatch(getClientList());
    //   } else {
    //     toast.error(updateError);
    //   }
    // }
    return () => {
      dispatch(resetClientSlice());
    };
  }, [addSuccess, addError]);

  const settingValuesHanlder = (result) => {
    console.log({ result });
    formik.setFieldValue("client_name", result?.client_name);
  };
  useEffect(() => {
    if (editData !== null) {
      settingValuesHanlder(editData);
    }
  }, [editData]);



  //Formik Error
  const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
  const getFormErrorMessage = (name) => {
    return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
  };
  //Drpdown List
  // const roleName = [
  //   { name: "Admin", code: "AD" },
  //   { name: "User", code: "US" },
  // ];
  // const genderName = [
  //   { name: "Male", code: "ML" },
  //   { name: "Female", code: "FM" },
  //   { name: "Other", code: "OT" },
  // ];

  return (
    <>
      <div className="container-fluid">
        <form onSubmit={formik.handleSubmit}>
          <div className="grid">
            <div className="col-12 md:col-6 pb-3">
              <GlobalInputField label="Client Name" name="client_name" id="client_name" placeholder="Enter Full Name" isRequired disabled={editData !== null} value={formik.values.client_name} onChange={formik.handleChange} />
              {getFormErrorMessage("client_name")}
            </div>
            {/* <div className="col-12 md:col-6 pb-3">
              <GlobalDropdown label="gender" name="gender" id="gender" options={genderName} optionLabel="name" optionValue="name" placeholder="Select" disabled={editData !== null} value={formik.values.gender} onChange={formik.handleChange} />
              {getFormErrorMessage("gender")}
            </div>

            <div className="col-12 md:col-6 pb-3">
              <GlobalDropdown label="Role" id="role" name="role" options={roleName} optionLabel="name" optionValue="name" placeholder="Select" isRequired value={formik.values.role} onChange={formik.handleChange} />
              {getFormErrorMessage("role")}
            </div> */}

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
                <SecondaryButton type="submit" style={{ marginLeft: "7px" }} label={editData == null ? "Save" : "Update"} loading={addLoading} />
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default AddEditClient
