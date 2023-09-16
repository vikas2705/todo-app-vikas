import { PAGE_SIZE } from "../constants/constants";

export const fetchTodoList = (limit = PAGE_SIZE, skip = 0) => {
    const url = `https://dummyjson.com/todos?limit=${limit}&skip=${skip}`;

    return fetch(url).then(res => res.json());
};
