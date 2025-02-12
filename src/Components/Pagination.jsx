import React from "react";

export default function Pagination({ currentPage, setCurrentPage, totalItems, itemsPerPage }) {
    const totalPages = Math.ceil(totalItems / itemsPerPage)

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    return (
        <div className="pagination">
            <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
            <div>{currentPage}</div>
            <button onClick={nextPage} disabled={currentPage === totalPages}>Next</button>
        </div>
    );
};