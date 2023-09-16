import React from "react";
import { SHOW_LOAD_MORE_LIMIT } from "../../constants/constants";

const LoadMore = props => {
    const { todoList = [], loadNextPage } = props;

    const handleLoadMore = e => {
        loadNextPage();
        e.preventDefault();
        e.stopPropagation();
    };

    return todoList.length < SHOW_LOAD_MORE_LIMIT ? (
        <div>
            <button className='load-more-btn' onClick={handleLoadMore}>
                Load More
            </button>
        </div>
    ) : null;
};

export default React.memo(LoadMore);
