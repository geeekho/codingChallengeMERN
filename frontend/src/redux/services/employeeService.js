import axiosInstance from "../../utils/axios";

const API_URL = 'employees/';

//get employees list
const getEmployees = async () => {
    const response = await axiosInstance.get(API_URL);
    return response.data;
};

//add project
const addEmployee = async (data) => {
    const response = await axiosInstance.post(API_URL, data);
    return response.data;
};


const employeeService = {
    getEmployees,
    addEmployee,
};

export default employeeService;