import { get } from '../utils/request';

export const getQuestion = async (id) => {
    return get(`questions?topicId=${id}`);
}