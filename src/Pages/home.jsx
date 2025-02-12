import React, { useState, useEffect } from 'react';

import BookCard from '../Components/BookCard.jsx';

import DisplayOptions from '../Functions/DisplayOptions.jsx';
import Pagination from '../Components/Pagination.jsx';

export default function Home({ query }) {
    const [loading, setLoading] = useState(false);
    const [books, setBooks] = useState([]);
    const [totalBooks, setTotalBooks] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(16);
    const [currentPage, setCurrentPage] = useState(1);
    const [favorites, setFavorites] = useState([]);

    document.title="Gutendex";

    const fetchBooks = async (query = "", page = 1) => {
        setLoading(true);
        const url = `https://gutendex.com/books/?search=${query}&page=${page}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            setBooks(data.results);
            setTotalBooks(data.count);
        } catch (error) {
            console.error("Error fetching books:", error);
        }
        setLoading(false);
    };

    const updateFavorites = (updatedFavorites) => {
        setFavorites(updatedFavorites);
    };

    const currentBooks = books?.length ? books.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    ) : [];

    useEffect(() => {
        fetchBooks(query, currentPage);

        // const fetchBooks = async () => {
        //     const response = await fetch();
        //     const data = await response.json();

        //     setBooks((prevBooks) => [...prevBooks, ...data.results]);
        //     setTotalBooks(data.count);
        // };
        // fetchBooks();
    }, [query, currentPage]);
    
    return (
        <div className="body">
            <div className="title">Browse all</div>
            <div className="containerMain">
                <DisplayOptions 
                    itemsPerPage={itemsPerPage} 
                    setItemsPerPage={setItemsPerPage}
                    setCurrentPage={setCurrentPage}
                />
                {loading ? <p>Loading...</p> : (
                    <div className="containerBooks">
                        {currentBooks.map((book) => (
                            <BookCard key={book.id} data={book} updateFavorites={updateFavorites}/>
                        ))}
                    </div>
                )}
                <Pagination
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalItems={totalBooks}
                    itemsPerPage={itemsPerPage}
                />
            </div>
        </div>
    );
};