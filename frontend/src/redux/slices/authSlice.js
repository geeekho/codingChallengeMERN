import { createSlice, createAction, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../services/authService.js';



const initialState = {
    user: null,
    isError: false,
    isAuthenticated: false,
    isLoading: false,
    message: '',
};


// Login user
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    try {

        const loginUser = await authService.login(user);
        return loginUser;
    } catch (error) {
        let message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        if (error.response.data.message && error.response.data._id) {
            return thunkAPI.rejectWithValue({ message: error.response.data.message, _id: error.response.data._id });
        }
        return thunkAPI.rejectWithValue(message);
    }
});

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetAuth: (state) => {
            state.user = null;
            state.isLoading = false;
            state.isAuthenticated = false;
            state.isError = false;
            state.message = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                console.log('pending');
                state.isLoading = true;
                state.message = '';
            })
            .addCase(login.fulfilled, (state, action) => {
                console.log('fulfilled');
                console.log(action.payload);
                state.isLoading = false;
                state.isAuthenticated = true;
                state.user = action.payload;
                state.message = '';
            })
            .addCase(login.rejected, (state, action) => {
                console.log('rejected');
                console.log(action.payload);
                state.isLoading = false;
                state.isError = true;
                // state.message = action.payload.message ? action.payload.message : action.payload;
                state.user = null;
            })
            ;
    },
});

export const { resetAuth } = authSlice.actions;
export default authSlice.reducer;