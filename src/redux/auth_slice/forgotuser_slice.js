import Axios from 'axios';
// import { axiosApi } from '../../services/axios_api';
import appURL from '../../constants/appURL';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

const forgetPassReducer = createSlice({
    name: 'forgetPassword',
    initialState: {},
    reducers: {
        resetChangeStatus(state, action) {
            return { ...state, addSuccess: undefined, editSuccess: undefined }
        },
    
    },
    extraReducers: (builder) => {
        builder
        .addCase(forgetPassword.pending, (state, action) => {
            return { ...state, loading: true }
        })
        .addCase(forgetPassword.fulfilled, (state, action) => {

            return { ...state, loading: false, data: action.payload, success: true }
        })
        .addCase(forgetPassword.rejected, (state, action) => {

            return {
                ...state,
                loading: false,
                success:false,
                error: action.payload
            }
        });
    },
});

export default forgetPassReducer.reducer;
export const {resetChangeStatus, logout } = forgetPassReducer.actions;

// Thunks
export const forgetPassword = createAsyncThunk('forgetPassword/fetch', async (body, { rejectWithValue, fulfillWithValue }) => {
    try {
        const { data } = await Axios.post(appURL.baseUrl + appURL.forgetPassword, body);
        return fulfillWithValue(data.data);
        
    } catch (error) {
        throw rejectWithValue(error.response && error.response.data.msg
            ? error.response.data.msg
            : error.message)

    }

});

