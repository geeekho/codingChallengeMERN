import axiosInstance from "../../utils/axios";

const API_URL = 'auth/';

// Login user
const login = async (userData) => {
    const response = await axiosInstance.post(API_URL + 'login', userData);

    if (response.data) {
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        axiosInstance.defaults.headers['Authorization'] = `Bearer ${response.data.token}`;
    }

    return response.data;
};

const authService = {
    login
};

export default authService;