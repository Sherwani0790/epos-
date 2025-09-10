import Axios from 'axios';
import appURL from '../../constants/appURL';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

const supportMainList = createSlice({
    name: 'supportListView',
    initialState: {},
    reducers: {
        resetSupportSlice(state, action) {
            return { ...state, addSuccess: undefined, updateSuccess: undefined, deleteSuccess: undefined }
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(getSupportList.pending, (state, action) => {
                return { ...state, loading: true }
            })
            .addCase(getSupportList.fulfilled, (state, action) => {

                return { ...state, loading: false, data: action.payload }
            })
            .addCase(getSupportList.rejected, (state, action) => {

                return {
                    ...state,
                    loading: false,
                    error: action.payload
                }
            });

        builder
            .addCase(addSupport.pending, (state, action) => {
                return { ...state, addLoading: true }
            })
            .addCase(addSupport.fulfilled, (state, action) => {

                return { ...state, addLoading: false, addData: action.payload, addSuccess: true }
            })
            .addCase(addSupport.rejected, (state, action) => {

                return {
                    ...state,
                    addLoading: false,
                    addError: action.payload,
                    addSuccess: false
                }
            });
        builder
            .addCase(updateSupport.pending, (state, action) => {
                return { ...state, updateLoading: true }
            })
            .addCase(updateSupport.fulfilled, (state, action) => {

                return { ...state, updateLoading: false, updateData: action.payload, updateSuccess: true }
            })
            .addCase(updateSupport.rejected, (state, action) => {

                return {
                    ...state,
                    updateLoading: false,
                    updateError: action.payload,
                    updateSuccess: false
                }
            });
        builder
            .addCase(deleteSupport.pending, (state, action) => {
                return { ...state, deleteLoading: true }
            })
            .addCase(deleteSupport.fulfilled, (state, action) => {

                return { ...state, deleteLoading: false, deleteData: action.payload, deleteSuccess: true }
            })
            .addCase(deleteSupport.rejected, (state, action) => {

                return {
                    // ...state,
                    // deleteLoading: false,
                    // addError: action.payload,
                    // addSuccess: false
                    ...state, deleteLoading: false,
                    deleteError: action.payload,
                    deleteSuccess: false
                }
            });

    },
});

export default supportMainList.reducer;
export const { resetSupportSlice } = supportMainList.actions;


// Thunks
export const getSupportList = createAsyncThunk('supportlist/fetch', async (id, { rejectWithValue, fulfillWithValue }) => {

    try {
        const { data } = await Axios.get(appURL.baseUrl + appURL.getSupportList);
        // console.log("object", data);
        return fulfillWithValue(data?.data);
    } catch (error) {

        throw rejectWithValue(error.response && error.response.data.Message
            ? error.response.data.Message
            : error.message)
    }

});
export const addSupport = createAsyncThunk('addSupportTicket/add', async (body, { rejectWithValue, fulfillWithValue }) => {
    try {
        const { data } = await Axios.post(appURL.baseUrl + appURL.addSupport, body);

        return fulfillWithValue(data.data);
    } catch (error) {
        console.log("object", error)
        throw rejectWithValue(error.response && error.response.data.Message
            ? error.response.data.Message
            : error.message)

    }

});
export const updateSupport = createAsyncThunk('updateSupport/patch', async (body, { rejectWithValue, fulfillWithValue }) => {
    try {
        const { data } = await Axios.patch(appURL.baseUrl + appURL.updateSupport, body);
        return fulfillWithValue(data.data);
    } catch (error) {

        throw rejectWithValue(error.response && error.response.data.Message
            ? error.response.data.Message
            : error.message)

    }

});
export const deleteSupport = createAsyncThunk('support/delete', async (deleteId, { rejectWithValue, fulfillWithValue }) => {
    try {
        const { data } = await Axios.delete(`${appURL.baseUrl}${appURL.deleteSupport}${deleteId}`);
        return fulfillWithValue(data.data);
    } catch (error) {

        throw rejectWithValue(error.response && error.response.data.Message
            ? error.response.data.Message
            : error.message)
    }
});
