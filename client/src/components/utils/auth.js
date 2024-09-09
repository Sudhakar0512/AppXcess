import axios from 'axios';

// const API_URL = 'http://localhost:5000/api';
const API_URL = 'https://app-x-cess.vercel.app/api';

export const checkToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
        try {
            const decoded = JSON.parse(atob(token.split('.')[1]));
            return Date.now() < decoded.exp * 1000;
        } catch {
            return false;
        }
    }
    return false;
};

export const getUser = () => {
    const token = localStorage.getItem('token');
    if (token) {
        try {
            const decoded = JSON.parse(atob(token.split('.')[1]));
            return decoded;
        } catch {
            return null;
        }
    }
    return null;
};

export const login = async (username, password) => {
    const response = await axios.post(`${API_URL}/auth/login`, { username, password });
    localStorage.setItem('token', response.data.token);
};

export const register = async (username, password) => {
    await axios.post(`${API_URL}/auth/register`, { username, password });
};

export const logout = () => {
    localStorage.removeItem('token');
};
