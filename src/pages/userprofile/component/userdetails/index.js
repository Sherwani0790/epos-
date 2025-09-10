import React, { useState } from 'react'
import * as Yup from "yup";
import { useFormik } from 'formik';
// import { Avatar } from 'primereact/avatar'
// import DefaultImg from "../../../../../assets/layout/images/amyelsner.png"
import DefaultImg from "../../../../assets/demo/flags/flags_responsive.png"
// import AddEditUser from '../../../usermanagement/component'
import GlobalInputField from '../../../../ui-components/globalinputfield'
// import DefaultButton from '../../../../ui-components/defaultbutton'
import SecondaryButton from '../../../../ui-components/secondarybutton'
import GlobalTextarea from '../../../../ui-components/globaltextarea';
import GlobalDropdown from '../../../../ui-components/globaldropdown';

const UserDetails = () => {
  //States
  const [image, setImage] = useState(null);
  //Formik Vaidations
  const validationSchema = Yup.object().shape({
    full_Name: Yup.mixed().required("Full Name is required"),
    email_Address: Yup.mixed().required("Email Address is required"),
    assign_Role: Yup.mixed().required("Role is required"),
  });

  const formik = useFormik({
    validationSchema: validationSchema,
    initialValues: {
      full_Name: "",
      email_Address: "",
      user_Name: "",
      phone_No: "",
      gender: "",
      assign_Role: "",
      address: "",
    },
    onSubmit: async (values) => {
      // const payload = {
      //   ...values,
      //   image: image,
      // };
      console.log(values, " Value")

    }
  });

  //Drpdown List
  // const roleName = [
  //   { name: "Admin", code: "AD" },
  //   { name: "User", code: "US" }
  // ];
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
  // Image upload function check size 
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (reader.result && reader.result.length < 2 * 1024 * 1024) { //  size is less than 2MB
          setImage(reader.result);
        } else {
          alert("Image size exceeds 2MB limit.");
        }
      };
      console.log(reader,"image url")
    }
  };
  return (
    <>
      <div className='grid'>
        <div className='md:col-4'>
          {/* <img className='profile-setting-img'
            src={DefaultImg}
          /> */}

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: 'none' }}
            id="file-input"
          />
          <label htmlFor="file-input">
            <img
              className="profile-setting-img"
              src={image || DefaultImg} // Display selected image or default image
              alt="Profile"
              style={{ cursor: 'pointer' }}
            />
          </label>
        </div>
        <div className='col-12'>
          <form onSubmit={formik.handleSubmit}>
            <div className="grid">
              <div className="col-12 md:col-6 pb-3">
                <GlobalInputField
                  label="Full Name"
                  name="full_Name"
                  id="full_Name"
                  placeholder="Enter Full Name"
                  isRequired
                  // disabled
                  value={formik.values.full_Name}
                  onChange={formik.handleChange}
                />
                {getFormErrorMessage('full_Name')}
              </div>
              <div className="col-12 md:col-6 pb-3">
                <GlobalInputField
                  label="Email Address"
                  name="email_Address"
                  id="email_Address"
                  placeholder="Enter Email Address"
                  isRequired
                  // disabled
                  value={formik.values.email_Address}
                  onChange={formik.handleChange}
                />
                {getFormErrorMessage('email_Address')}
              </div>
              <div className="col-12 md:col-6 pb-3">
                <GlobalInputField
                  label="Username"
                  name="user_Name"
                  id="user_Name"
                  placeholder="Enter Username"
                  // isRequired
                  // disabled
                  value={formik.values.user_Name}
                  onChange={formik.handleChange}
                />
                {getFormErrorMessage('user_Name')}
              </div>
              <div className="col-12 md:col-6 pb-3">
                <GlobalInputField
                  label="Phone No"
                  name="phone_No"
                  id="phone_No"
                  placeholder="Enter Phone No"
                  // disabled
                  value={formik.values.phone_No}
                  onChange={formik.handleChange}
                />
                {getFormErrorMessage('phone_No')}
              </div>
              <div className="col-12 md:col-6 pb-3">
                <GlobalDropdown
                  label="Gender"
                  name="gender"
                  id="gender"
                  options={genderName}
                  optionLabel="name"
                  placeholder="Select"
                  // disabled
                  value={formik.values.gender}
                  onChange={formik.handleChange}
                />
                {getFormErrorMessage('gender')}
              </div>
              {/* {editData !== null && ( */}
              {/* <div className="col-12 md:col-6 pb-3">
                <GlobalDropdown
                  label="Role"
                  id="assign_Role"
                  name="assign_Role"
                  options={roleName}
                  optionLabel="name"
                  placeholder="Select"
                  isRequired
                  disabled
                  value={formik.values.assign_Role}
                  onChange={formik.handleChange}
                />
                {getFormErrorMessage('assign_Role')}
              </div> */}
              {/* )} */}
              <div className="col-12 md:col-12 pb-3">
                <GlobalTextarea
                  label="Address"
                  name="address"
                  id="address"
                  rows="3"
                  placeholder="Enter Address"
                  // disabled
                  value={formik.values.address}
                  onChange={formik.handleChange}
                />
                {getFormErrorMessage('address')}
              </div>
              <div className='col-12 mb-3'>
                <div className='text-center'>
                  <SecondaryButton
                    type="submit"
                    style={{ marginLeft: "7px" }}
                    label={"Update"}
                  // loading={editData == null ? addLoading : editLoading}

                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default UserDetails
