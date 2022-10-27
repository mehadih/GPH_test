import {createSlice} from "@reduxjs/toolkit";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {get, post} from "../../network/AxiosService";

const initialState = {
    loading: false,
    data: [],
    error: "",
};

export const fetchHome = createAsyncThunk("home", (params) => {
    return get(params);
});


const dataSlice = createSlice({
    name: "home",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchHome.pending, (state) => {
            state.loading = true;
            state.data = [];
            state.error = "";
        });
        builder.addCase(fetchHome.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.error = "";
        });
        builder.addCase(fetchHome.rejected, (state, action) => {
            state.loading = false;
            state.data = [];
            state.error = action.error;
        });
    }
});

export default dataSlice.reducer;
