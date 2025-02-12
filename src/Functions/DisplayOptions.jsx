import React, { useState, useEffect } from "react";

export default function DisplayOptions({ itemsPerPage, setItemsPerPage, setCurrentPage, data, setData }) {
    const handleItemsPerPage = (e) => {
        setItemsPerPage(Number(e.target.value));
        setCurrentPage(1);
    };

    return (
        <div className="displayOptions">
            <div className="itemsPerPage">
                <label htmlFor="itemsPerPage">Books per page </label>
                <select id="itemsPerPage" value={itemsPerPage} onChange={handleItemsPerPage}>
                    <option value="8">8</option>
                    <option value="16">16</option>
                    <option value="24">24</option>
                    <option value="32">32</option>
                </select>
            </div>
        </div>
    );
};