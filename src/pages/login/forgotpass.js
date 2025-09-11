import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useHistory } from "react-router-dom";
// import { forgetPassword, resetChangeStatus } from '../../redux/auth_slice/forgotuser_slice';
const ForgotPass = () => {
    let history = useHistory();
    const dispatch = useDispatch();
    //redux
    const { success, error, loading } = useSelector((state) => state.forgetPassword);
    //forms
    const validationSchema = Yup.object().shape({
        user_email: Yup.string().required("Email is required."),
    });

    const formik = useFormik({
        initialValues: {
            user_email: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (data) => {
            const body = {
                user_email: data.user_email,
            };
            // dispatch(forgetPassword(body));
        },
    });
    useEffect(() => {
        // console.log("This is h", success);
        if (success !== undefined) {
            if (success === true) {
                toast.success("Password has been send to your email address");
                // history.push("/api/resetscreen/"+formik.values.phone);
            } else {
                // console.log("It is coming here");
                toast.error(error);
            }
        }

        return () => {
            // dispatch(resetChangeStatus);
        };
    }, [success]);

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };
    return (
        <>
            <div className="background_image container-fluid">
                <div className="grid pr-5">
                    <div className="lg:col-4 md:col-4"></div>
                    <div className="lg:col-4 md:col-4 col-12">
                        <div className="container" style={{ marginTop: "20%" }}>
                            <p className="sign_in_text">Forgot Password?</p>
                            <p className="sign_text">Enter your email address to reset password!</p>

                            <div className="pt-3">
                                <form className="login_form" onSubmit={formik.handleSubmit}>
                                    <div className="p-mb-4"></div>
                                    <div className="p-mt-4">
                                        <div className="user_Email-Name  mb-3">
                                            <div>
                                                <label>
                                                    <b>Email</b>
                                                </label>
                                            </div>

                                            <div>
                                                <InputText id="user_email" name="user_email" value={formik.values.user_email} onChange={formik.handleChange} autoFocus className="login_input" type="text" placeholder="Enter Email" />
                                                {getFormErrorMessage("user_email")}
                                            </div>
                                        </div>

                                        <div className="flex flex-row justify-content-center mt-5 mt-2">
                                            {/* loading={loading} */}

                                            <Button className="btn sign_in_btn" label="Submit" type="submit" loading={loading} iconPos="right" />
                                        </div>
                                    </div>
                                </form>
                                <div className="flex flex-row justify-content-center mt-2">
                                    <p
                                        className="forget_text"
                                        onClick={(e) => {
                                            history.push("/");
                                        }}
                                    >
                                        Back to Login
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-4 md:col-4"></div>
                </div>
            </div>
        </>
    );
};

export default ForgotPass;
