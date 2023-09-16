import React, { useState } from "react";

const AddTodo = props => {
    const [task, setTask] = useState("");
    const { onAddNewItem } = props;

    const handleTaskChange = e => {
        setTask(e.target.value);
    };

    const handleAddNewItem = () => {
        onAddNewItem(task);
        setTask("");
    };
    console.log("Add to do re rendred");
    return (
        <div className='add-btn-container margin-y-30'>
            <input
                type='text'
                placeholder='Enter task...'
                value={task}
                onChange={handleTaskChange}
            />
            <button onClick={handleAddNewItem}>Add</button>
        </div>
    );
};

export default React.memo(AddTodo);
