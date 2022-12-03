import axiosInstance from "../../utils/axios";

const API_URL = 'employees/';

//get employees list
const getEmployees = async () => {
    const response = await axiosInstance.get(API_URL);
    return response.data;
};

const employeeService = {
    getEmployees,
};

export default employeeService;