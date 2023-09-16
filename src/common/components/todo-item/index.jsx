import React, { useState } from "react";

const TodoItem = props => {
    const {
        todoItem,
        index,
        handleMarkComplete,
        handleDelete,
        handleSaveItem,
    } = props;
    const [editable, setEditable] = useState(false);
    const { todo, completed, id } = todoItem;
    const [todoText, setTodoText] = useState(todo);

    const handleSave = () => {
        // callback
        //  updatedTodo, index
        handleSaveItem(index, todoText);
    };

    return (
        <tr key={`${id}-${index}`}>
            {editable ? (
                <td>
                    <input
                        type='text'
                        value={todoText}
                        onChange={e => {
                            setTodoText(e.target.value);
                        }}
                    />
                </td>
            ) : (
                <td className={`  ${completed ? "line-through" : ""} `}>
                    {todo}
                </td>
            )}

            <td>
                {editable ? (
                    <button
                        onClick={() => {
                            setEditable(false);
                            handleSave();
                        }}
                    >
                        Save
                    </button>
                ) : (
                    <button
                        onClick={() => {
                            setEditable(true);
                        }}
                    >
                        Edit
                    </button>
                )}
            </td>

            <td>
                <button
                    onClick={() => {
                        handleMarkComplete(id, index, completed);
                    }}
                >
                    {completed ? "Mark as Incomplete" : "Mark as Complete"}
                </button>
            </td>
            <td>
                <button
                    onClick={() => {
                        handleDelete(id, index);
                    }}
                >
                    Delete
                </button>
            </td>
        </tr>
    );
};

export default React.memo(TodoItem);
