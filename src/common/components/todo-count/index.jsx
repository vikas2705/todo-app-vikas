import React from "react";

const TodoCount = props => {
    const { todoList = [] } = props;
    return <div>Todos count: {todoList.length}</div>;
};

export default TodoCount;
