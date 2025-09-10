import { configureStore } from '@reduxjs/toolkit';
import loginUserReducer from "./auth_slice/login_user_slice"
import support_slice from './auth_slice/support_slice';
import usermanagement_slice from './auth_slice/usermanagement_slice';
import client_slice from './auth_slice/client_slice';
import clientcreditreq_slice from './auth_slice/clientcreditreq_slice';
import profilesetting_slice from './auth_slice/profilesetting_slice';
import forgotuser_slice from './auth_slice/forgotuser_slice';

const user = localStorage.getItem("user");
const initialState = {
    loginUser: {
        user: user ? JSON.parse(user) : undefined
    }
};
const store = configureStore({
    reducer: {
        loginUser: loginUserReducer,
        forgetPassword: forgotuser_slice,
        supportMainList:support_slice,
        userMainList:usermanagement_slice,
        clientMainList:client_slice,
        clientCreditRequestMainList :clientcreditreq_slice,
        updatePasswordProfile:profilesetting_slice
    },
    preloadedState: initialState
},
)



export default store;
