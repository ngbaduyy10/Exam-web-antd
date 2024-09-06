import {get} from "../utils/request";

export const getTopic = async () => {
    return get("topics");
}

export const getTopicById = async (id) => {
    return get(`topics/${id}`);
}