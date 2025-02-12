import { useState, useEffect } from 'react';

import BookCard from '../Components/BookCard.jsx';

import DisplayOptions from '../Functions/DisplayOptions.jsx';
import Pagination from '../Components/Pagination.jsx';

export default function Favorites({ query }) {
    const [favorites, setFavorites] = useState([]);
    const [itemsPerPage, setItemsPerPage] = useState(16);
    const [currentPage, setCurrentPage] = useState(1);

    document.title="Favorites - Gutendex";

    const updateFavorites = (updatedFavorites) => {
        setFavorites(updatedFavorites);
    };

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setFavorites(storedFavorites);
    }, []);

    const filteredFavorites = favorites.filter((book) => 
        book.title.toLowerCase().includes(query.toLowerCase())
    );

    const currentFavorites = filteredFavorites.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );
    
    return (
        <div className="body">
            <div className="title">Favorites</div>
            <div className="containerMain">
                <DisplayOptions 
                    itemsPerPage={itemsPerPage} 
                    setItemsPerPage={setItemsPerPage}
                    setCurrentPage={setCurrentPage}
                />
                <div className="containerBooks">
                    {currentFavorites.map((book) => (
                        <BookCard key={book.id} data={book} updateFavorites={updateFavorites}/>
                    ))}
                </div>
                <Pagination
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalItems={filteredFavorites.length}
                    itemsPerPage={itemsPerPage}
                />
            </div>
        </div>
    );
};