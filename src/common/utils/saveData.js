export const saveDataToLocalStorage = todoList => {
    if (!todoList || todoList.length === 0) {
        localStorage.setItem("todo-list", "");
    } else {
        localStorage.setItem("todo-list", JSON.stringify(todoList));
    }
};

export const saveCurrentPageToLocalStorage = pageNum => {
    localStorage.setItem("current-page", pageNum);
};

export const fetchDataFromLocalStorage = () => {
    const savedData = localStorage.getItem("todo-list");
    if (!savedData) {
        return [];
    } else {
        return JSON.parse(savedData);
    }
};

export const fetchCurrentPageFromLocalStorage = () => {
    return Number(localStorage.getItem("current-page")) || 1;
};
