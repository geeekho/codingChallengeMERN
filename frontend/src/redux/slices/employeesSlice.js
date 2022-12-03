import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import employeeService from '../services/employeeService.js';



const initialState = {
    employees: [],
    isError: false,
    isLoading: false,
    message: '',
};


// get Employees list
export const getEmployees = createAsyncThunk('employees/getEmployees', async (obj, thunkAPI) => {
    try {

        const employeesList = await employeeService.getEmployees();
        return employeesList;
    } catch (error) {
        let message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        if (error.response.data.message && error.response.data._id) {
            return thunkAPI.rejectWithValue({ message: error.response.data.message, _id: error.response.data._id });
        }
        return thunkAPI.rejectWithValue(message);
    }
});

// Create new employee
export const addEmployee = createAsyncThunk('employees/addEmployee', async (data, thunkAPI) => {
    try {
        return await employeeService.addEmployee(data);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const employeesSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {
        resetEmployees: (state) => {
            state.employees = [];
            state.isLoading = false;
            state.isError = false;
            state.message = '';
        },
    },
    extraReducers: (builder) => {
        builder
            //get employees
            .addCase(getEmployees.pending, (state) => {
                console.log('pending');
                state.isLoading = true;
                state.message = '';
            })
            .addCase(getEmployees.fulfilled, (state, action) => {
                console.log('fulfilled');
                console.log(action.payload);
                state.isLoading = false;
                state.employees = action.payload.results;
                state.message = '';
            })
            .addCase(getEmployees.rejected, (state, action) => {
                console.log('rejected');
                console.log(action.payload);
                state.isLoading = false;
                state.isError = true;
                state.employees = [];
            })
            //add employee
            .addCase(addEmployee.pending, (state) => {
                console.log('pending');
                state.isLoading = true;
                state.message = '';
            })
            .addCase(addEmployee.fulfilled, (state, action) => {
                console.log('fulfilled');
                console.log(action.payload);
                state.isLoading = false;
                state.message = '';
            })
            .addCase(addEmployee.rejected, (state, action) => {
                console.log('rejected');
                console.log(action.payload);
                state.isLoading = false;
                state.isError = true;
            })
            ;
    },
});

export const { resetEmployees } = employeesSlice.actions;
export default employeesSlice.reducer;