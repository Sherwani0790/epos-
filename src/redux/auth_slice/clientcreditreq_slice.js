import Axios from 'axios';
import appURL from '../../constants/appURL';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

const clientCreditRequestMainList = createSlice({
    name: 'clientCreditRequestMainListView',
    initialState: {},
    reducers: {
        resetClientCreditRequestMainListSlice(state, action) {
            return { ...state, addSuccess: undefined, updateSuccess: undefined,}
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(getClientCreditRequestMainList.pending, (state, action) => {
                return { ...state, loading: true }
            })
            .addCase(getClientCreditRequestMainList.fulfilled, (state, action) => {

                return { ...state, loading: false, data: action.payload }
            })
            .addCase(getClientCreditRequestMainList.rejected, (state, action) => {

                return {
                    ...state,
                    loading: false,
                    error: action.payload
                }
            });

        builder
            .addCase(addClientCreditRequest.pending, (state, action) => {
                return { ...state, addLoading: true }
            })
            .addCase(addClientCreditRequest.fulfilled, (state, action) => {

                return { ...state, addLoading: false, addData: action.payload, addSuccess: true }
            })
            .addCase(addClientCreditRequest.rejected, (state, action) => {

                return {
                    ...state,
                    addLoading: false,
                    addError: action.payload,
                    addSuccess: false
                }
            });
        // builder
        //     .addCase(updateSupport.pending, (state, action) => {
        //         return { ...state, updateLoading: true }
        //     })
        //     .addCase(updateSupport.fulfilled, (state, action) => {

        //         return { ...state, updateLoading: false, updateData: action.payload, updateSuccess: true }
        //     })
        //     .addCase(updateSupport.rejected, (state, action) => {

        //         return {
        //             ...state,
        //             updateLoading: false,
        //             updateError: action.payload,
        //             updateSuccess: false
        //         }
        //     });

        // builder
        //     .addCase(deleteCreditRequest.pending, (state, action) => {
        //         return { ...state, deleteLoading: true }
        //     })
        //     .addCase(deleteCreditRequest.fulfilled, (state, action) => {

        //         return { ...state, deleteLoading: false, delteData: action.payload, deleteSuccess: true }
        //     })
        //     .addCase(deleteCreditRequest.rejected, (state, action) => {

        //         return {
        //             ...state,
        //             deleteLoading: false,
        //             deleteError: action.payload,
        //             deleteSuccess: false
        //         }
        //     });

    },
});

export default clientCreditRequestMainList.reducer;
export const { resetClientCreditRequestMainListSlice } = clientCreditRequestMainList.actions;


// Thunks
export const getClientCreditRequestMainList = createAsyncThunk('clientCreditRequestMainList/fetch', async (id, { rejectWithValue, fulfillWithValue }) => {

    try {
        const { data } = await Axios.get(appURL.baseUrl + appURL.clientCreditRequestMainListView);
        // console.log("object", data);
        return fulfillWithValue(data?.data);
    } catch (error) {

        throw rejectWithValue(error.response && error.response.data.message
            ? error.response.data.message
            : error.message)
    }

});
export const addClientCreditRequest = createAsyncThunk('addClientCreditRequest/add', async (body, { rejectWithValue, fulfillWithValue }) => {
    try {
        const { data } = await Axios.post(appURL.baseUrl + appURL.addClientCreditRequest, body);

        return fulfillWithValue(data.data);
    } catch (error) {
        console.log("object", error)
        throw rejectWithValue(error.response && error.response.data.message
            ? error.response.data.message
            : error.message)

    }

});
// export const updateSupport = createAsyncThunk('updateSupport/patch', async (body, { rejectWithValue, fulfillWithValue }) => {
//     try {
//         const { data } = await Axios.patch(appURL.baseUrl + appURL.updateSupport, body);
//         return fulfillWithValue(data.data);
//     } catch (error) {

//         throw rejectWithValue(error.response && error.response.data.message
//             ? error.response.data.message
//             : error.message)

//     }

// });
// export const deleteCreditRequest = createAsyncThunk('creditRequest/delete', async (deleteId, { rejectWithValue, fulfillWithValue }) => {
//     try {
//         const { data } = await Axios.delete(`${appURL.baseUrl}${appURL.deleteCreditRequest}${deleteId}`);
//         return fulfillWithValue(data.data);
//     } catch (error) {

//         throw rejectWithValue(error.response && error.response.data.msg
//             ? error.response.data.msg
//             : error.message)
//     }
// });
