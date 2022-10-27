import {createSlice} from "@reduxjs/toolkit";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {get, post} from "../../network/AxiosService";

const initialState = {
    loading: false,
    data: [],
    error: "",
    success: ''
};

export const fetchCareer = createAsyncThunk("career", (params) => {
    return get(params);
});

export const postCareerForm = createAsyncThunk("postCareerForm", (params) => {
    return post(params);
});


const careerSlice = createSlice({
    name: "career",
    initialState,
    reducers: {
        clear: (state) => {
            state.success = '';
            state.error = ''
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCareer.pending, (state) => {
            state.loading = true;
            state.data = [];
            state.error = "";
        });
        builder.addCase(fetchCareer.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.error = "";
        });
        builder.addCase(fetchCareer.rejected, (state, action) => {
            state.loading = false;
            state.data = [];
            state.error = action.error;
        });


        //-- post
        builder.addCase(postCareerForm.pending, (state) => {
            state.loading = true;
            state.success = '';
            state.error = "";
        });
        builder.addCase(postCareerForm.fulfilled, (state, action) => {

            state.loading = false;
            state.success = action.success;
            state.error = "";
        });
        builder.addCase(postCareerForm.rejected, (state, action) => {

            state.loading = false;
            state.success = '';
            state.error = action.error;
        });

    }
});

export default careerSlice.reducer;
export const {clear} = careerSlice.actions;