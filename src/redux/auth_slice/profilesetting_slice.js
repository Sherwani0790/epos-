import Axios from 'axios';
import appURL from '../../constants/appURL';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

const updatePasswordProfile = createSlice({
    name: 'updatepasswordslice',
    initialState: {},
    reducers: {
        resetUpdatePasswordSlice(state, action) {
            return { ...state, addSuccess: undefined, updateSuccess: undefined }
        }

    },
    extraReducers: (builder) => {

        builder
            .addCase(updatePassword.pending, (state, action) => {
                return { ...state, updateLoading: true }
            })
            .addCase(updatePassword.fulfilled, (state, action) => {

                return { ...state, updateLoading: false, updateData: action.payload, updateSuccess: true }
            })
            .addCase(updatePassword.rejected, (state, action) => {

                return {
                    ...state,
                    updateLoading: false,
                    updateError: action.payload,
                    updateSuccess: false
                }
            });


    },
});

export default updatePasswordProfile.reducer;
export const { resetUpdatePasswordSlice } = updatePasswordProfile.actions;


// Thunks

export const updatePassword = createAsyncThunk('updatePassword/patch', async (body, { rejectWithValue, fulfillWithValue }) => {
    try {
        const { data } = await Axios.patch(appURL.baseUrl + appURL.updatePassword, body);
        return fulfillWithValue(data.data);
    } catch (error) {

        throw rejectWithValue(error.response && error.response.data.Message
            ? error.response.data.Message
            : error.message)

    }

});
