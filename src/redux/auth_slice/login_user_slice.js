import Axios from 'axios';
import appURL from '../../constants/appURL';
// import { axiosApi } from '../../service/axios_api';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

const loginUserReducer = createSlice({
    name: 'loginUser',
    initialState: {},
    reducers: {
        resetChangeStatus(state, action) {
            return { ...state, success: undefined, editSuccess: undefined }
        },
        logout(state, action) {
            // localStorage.removeItem("user");
            localStorage.clear();
            // window.location.reload();
            return { };
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state, action) => {
                return { loading: true }
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                localStorage.setItem("user", JSON.stringify(action.payload));
                return { loading: false, user: action.payload, success:true}
            })
            .addCase(loginUser.rejected, (state, action) => {
                return {
                    loading: false,
                    success: false,
                    error: action.payload
                }
            });
    },
});

export default loginUserReducer.reducer;
export const { resetChangeStatus, logout } = loginUserReducer.actions;

// Thunks
export const loginUser = createAsyncThunk('loginUser/fetch', async (body, { rejectWithValue, fulfillWithValue }) => {
    try {
        const { data } = await Axios.post(appURL.baseUrl + appURL.adminLogin, body);
        return fulfillWithValue(data.data);

    } catch (error) {
        throw rejectWithValue(error.response && error.response.data.Message
            ? error.response.data.Message
            : error.message)

    }

});

