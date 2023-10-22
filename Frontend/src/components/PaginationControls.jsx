import React from 'react';

function PaginationControls({
    onPreviousClick,
    onNextClick,
    onPageInputChange,
    onGoClick,
    pageInput,
    totalPages,
    currentPage,
}) {
    return (
        <div className="pagination-controls">
            <button className="pagination-button" onClick={onPreviousClick}>
                Previous
            </button>
            <button className="pagination-button" onClick={onNextClick}>
                Next
            </button>
            <input
                type="number"
                value={pageInput}
                onChange={onPageInputChange}
                min="1"
                max={totalPages}
            />
            <button className="pagination-button" onClick={onGoClick}>
                Go
            </button>
            <p>Page {currentPage + 1}</p>
        </div>
    );
}

export default PaginationControls;
