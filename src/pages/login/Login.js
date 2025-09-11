import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "primereact/button";
import "./Login.css";
// import { resetChangeStatus, loginUser } from "../../redux/auth_slice/login_user_slice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { useHistory } from "react-router-dom";

const Login = () => {
    const dispatch = useDispatch();
    let history = useHistory();
    //redux
    const { success, error, loading } = useSelector((state) => state.loginUser);

    useEffect(() => {
        if (success !== undefined) {
            if (success === true) {
                toast.success("successfully logged in");
            } else {
                toast.warn(error);
            }
        }
        return () => {
            // dispatch((resetChangeStatus))
        };
    }, [success]);
    //forms
    const validationSchema = Yup.object().shape({
        // password: Yup.string().required("Password is required.").min(8, 'Minimum length should be 8'),
        password: Yup.string().required("Password is required.").min(8, "Maximum length should be 8"),
        // .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"),
        username: Yup.string().required("Email is required."),
    });

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (data) => {
            // dispatch(loginUser(data));
        },
    });

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };
    return (
        <div className="background_image container-fluid">
            <div className="grid pr-5">
                <div className="lg:col-4 md:col-4"></div>
                <div className="lg:col-4 md:col-4 col-12">
                    <div className="container" style={{ marginTop: "20%" }}>
                        <p className="sign_in_text">Sign In</p>
                        <p className="sign_text">Enter your Email & Password to Login</p>

                        <div className="pt-3">
                            <form className="login_form" onSubmit={formik.handleSubmit}>
                                <div className="p-mb-4">{/* <h1 className="login_h1">Login</h1> */}</div>
                                <div className="p-mt-4">
                                    <div className="user_Email-Name  mb-3">
                                        <div>
                                            <label>
                                                <b>Email</b>
                                            </label>
                                        </div>

                                        <div>
                                            <InputText id="username" name="username" value={formik.values.username} onChange={formik.handleChange} autoFocus className="login_input" type="text" placeholder="Enter Email" />
                                            {getFormErrorMessage("username")}
                                        </div>
                                    </div>
                                    <div className="user_Email-Name mb-3">
                                        <div>
                                            <label>
                                                <b>Password</b>
                                            </label>
                                        </div>
                                        <div>
                                            <Password className="login_input input_pass" value={formik.values.password} onChange={formik.handleChange} name="password" id="password" type="password" placeholder="Enter Password" toggleMask />
                                            {getFormErrorMessage("password")}
                                        </div>
                                    </div>
                                    <div className="flex justify-content-end">
                                        <p
                                            className="forget_text"
                                            onClick={(e) => {
                                                history.push("/api/forgotpass");
                                            }}
                                        >
                                            Forgot password?
                                        </p>
                                    </div>
                                    <div className="flex flex-row justify-content-center mt-5 mt-2">
                                        <Button className="btn sign_in_btn" label="Login" loading={loading} type="submit" iconPos="right" />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="lg:col-4 md:col-4"></div>
            </div>
        </div>
    );
};

export default Login;
