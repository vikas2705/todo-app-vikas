import React, { useCallback } from "react";
import TodoItem from "../todo-item";

const TodoList = props => {
    const { todoList = [], onMarkComplete, onDelete, onItemSave } = props;

    const handleMarkComplete = useCallback(
        (id, index, completed) => {
            onMarkComplete(id, index, completed);
        },
        [onMarkComplete]
    );

    const handleDelete = useCallback(
        (id, index) => {
            onDelete(id, index);
        },
        [onDelete]
    );

    const handleSaveItem = useCallback(
        (index, text) => {
            onItemSave(index, text);
        },
        [onItemSave]
    );

    return (
        <div className='todo-container margin-y-30'>
            <table>
                {todoList.map((todoItem, index) => {
                    return (
                        <TodoItem
                            todoItem={todoItem}
                            index={index}
                            handleDelete={handleDelete}
                            handleMarkComplete={handleMarkComplete}
                            handleSaveItem={handleSaveItem}
                        />
                    );
                })}
            </table>
        </div>
    );
};

export default React.memo(TodoList);
