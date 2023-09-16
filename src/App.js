import { useCallback, useEffect, useState } from "react";
import "./App.css";
import LoadMore from "./common/components/load-more";
import TodoCount from "./common/components/todo-count";
import TodoList from "./common/components/todo-list";
import { fetchTodoList } from "./common/apis/fetchTodos";
import { PAGE_SIZE } from "./common/constants/constants";
import AddTodo from "./common/components/add-todo";
import {
    fetchCurrentPageFromLocalStorage,
    fetchDataFromLocalStorage,
    saveCurrentPageToLocalStorage,
    saveDataToLocalStorage,
} from "./common/utils/saveData";

function App() {
    const [todoList, setToDoList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const updateData = useCallback(
        updatedList => {
            setToDoList(updatedList);
            saveDataToLocalStorage(updatedList);
            saveCurrentPageToLocalStorage(currentPage);
        },
        [currentPage]
    );

    const getTodoList = useCallback(async () => {
        if (currentPage === 1) {
            const savedTodoListData = fetchDataFromLocalStorage();
            if (savedTodoListData && savedTodoListData.length > 0) {
                setToDoList(savedTodoListData);
                return;
            }
        }

        const skip = (currentPage - 1) * PAGE_SIZE;
        try {
            const res = await fetchTodoList(PAGE_SIZE, skip);
            const { todos = [] } = res;
            const updatedList = [...todoList, ...todos];
            updateData(updatedList);
        } catch (err) {
            console.log(err);
        }
    }, [currentPage, todoList, updateData]);

    const loadNextPage = useCallback(() => {
        const pageNum = fetchCurrentPageFromLocalStorage();
        if (pageNum !== currentPage) {
            setCurrentPage(pageNum + 1);
        } else {
            setCurrentPage(currentPage + 1);
        }
    }, [currentPage]);

    const onMarkComplete = useCallback(
        (id, index, completed) => {
            const todoListCopy = [...todoList];
            todoListCopy[index].completed = !completed;
            updateData(todoListCopy);
        },
        [todoList, updateData]
    );

    const onDelete = useCallback(
        (id, index) => {
            const todoListCopy = [...todoList];
            todoListCopy.splice(index, 1);
            updateData(todoListCopy);
        },
        [updateData, todoList]
    );

    const onItemSave = useCallback(
        (index, updatedText) => {
            const todoListCopy = [...todoList];
            todoListCopy[index].todo = updatedText;
            updateData(todoListCopy);
        },
        [updateData, todoList]
    );

    const onAddNewItem = useCallback(
        task => {
            const newItem = [
                {
                    todo: task,
                    completed: false,
                    userId: null,
                    id: (Math.random() * 10000).toFixed(0),
                },
            ];

            const todoListCopy = [...newItem, ...todoList];
            updateData(todoListCopy);
        },
        [updateData, todoList]
    );

    useEffect(() => {
        getTodoList();
    }, [currentPage]);

    console.log("main page rendered");

    return (
        <div className='margin-x-30 margin-y-30'>
            <AddTodo onAddNewItem={onAddNewItem} />
            <TodoCount todoList={todoList} />
            <TodoList
                todoList={todoList}
                onMarkComplete={onMarkComplete}
                onDelete={onDelete}
                onItemSave={onItemSave}
            />
            <LoadMore todoList={todoList} loadNextPage={loadNextPage} />
        </div>
    );
}

export default App;
