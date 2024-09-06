import { get, post } from '../utils/request'
import {getCookie} from "../helpers/cookie";

export const getAnswer = async () => {
    const userId = getCookie("id")
    return get(`answers?userId=${userId}`)
}

export const postAnswer = async (data) => {
    return post(`answers`, data)
}

export const getAnswerById = async (id) => {
    return get(`answers/${id}`)
}