import { get, post } from '../utils/request';

export const login = async (email, password) => {
    const getEmail = await get(`users?email=${email}`);
    const getPassword = await get(`users?password=${password}`);
    if (getEmail.length > 0 && getPassword.length > 0) {
        if (getEmail[0].id === getPassword[0].id) {
            return getEmail[0];
        }
    }
}

export const checkEmail = async (email) => {
    return get(`users?email=${email}`);
}

export const register = async (data) => {
    return post(`users`, data);
}