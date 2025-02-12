import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import DisplayOptions from "../Functions/DisplayOptions.jsx";
import Pagination from "../Components/Pagination.jsx";
import BookCard from '../Components/BookCard.jsx';

export default function Category({ query }) {
    const [loading, setLoading] = useState(false);
    const [books, setBooks] = useState([]);
    const [itemsPerPage, setItemsPerPage] = useState(16);
    const [currentPage, setCurrentPage] = useState(1);
    const [favorites, setFavorites] = useState([]);
    const { category } = useParams();

    document.title=`${category.charAt(0).toUpperCase() + category.slice(1)} - Gutendex`;

    const fetchCategoryBooks = async (category, query = "", page = 1) => {
        setLoading(true);
        try {
            const response = await fetch(`https://gutendex.com/books/?topic=${category}&search=${query}&page=${page}`);
            const data = await response.json();
            setBooks(data.results);
        } catch (error) {
            console.error("Error fetching books:", error);
            setBooks([]);
        }
        setLoading(false);
    };

    const updateFavorites = (updatedFavorites) => {
        setFavorites(updatedFavorites);
    };

    const currentBooks = books.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    useEffect(() => {
        fetchCategoryBooks(category, query, currentPage);
    }, [category, query, currentPage]);

    return (
        <div className="body">
            <div className="title">{category.charAt(0).toUpperCase() + category.slice(1)}</div>
            <div className="containerMain">
                <DisplayOptions 
                    itemsPerPage={itemsPerPage} 
                    setItemsPerPage={setItemsPerPage}
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
                    totalItems={books.length}
                    itemsPerPage={itemsPerPage}
                />
            </div>
        </div>
    );
};