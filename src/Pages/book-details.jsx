import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function BookDetails({ updateFavorites }) {
    const { id } = useParams();
    const [book, setBook] = useState(null);

    useEffect(() => {
        const fetchBookDetails = async () => {
            const response = await fetch(`https://gutendex.com/books/${id}`);
            const data = await response.json();
            console.log(data);
            setBook(data);
        };
        fetchBookDetails();
    }, [id]);

    if (!book) return <p>Loading...</p>;

    const { formats, title, authors, subjects, languages, download_count, summaries } = book;
    const coverImage = formats && formats["image/jpeg"] ? formats["image/jpeg"] : "default-cover.jpg";
    const authorName = authors && authors.length > 0 ? authors[0].name : "Unknown Author";
    const subject = subjects && subjects.length > 0 ? subjects.join(", ") : "Category not available"
    const language = languages && languages.length > 0 ? languages[0] : "Unknown Language";

    const handleFavoriteToggle = () => {
        let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        if (favorites.some((favorite) => favorite.id === book.id)) {
            favorites = favorites.filter((favorite) => favorite.id !== book.id);
        } else {
            favorites.push(book);
        }
        localStorage.setItem("favorites", JSON.stringify(favorites));
        updateFavorites(favorites);
    };

    const isFavorite = JSON.parse(localStorage.getItem("favorites"))?.some(
        (favorite => favorite.id === book.id)
    );

    const digitalFormatUrl = formats?.["application/epub+zip"] || 
        formats?.["application/pdf"] ||
        formats?.["text/plain"];
    const digitalFormatLink = digitalFormatUrl ? digitalFormatUrl : "#";

    return (
        <div className="body">
            <div className="bookDetails containerColumn">
                <div className="containerRow">
                    <div className="containerColumn">
                        <div className="bookDetailsTitle">{title}</div>
                        <div className="bookDetailsAuthor"><b>Written by:</b> {authorName}</div>
                        <div className="bookDetailsCategory"><b>Subjects:</b> {subject}</div>
                        <div className="bookDetailsLanguage"><b>Language:</b> {language}</div>
                        <div className="bookDetailsDownloads"><b>Downloads:</b> {download_count}</div>
                        <a 
                            href={digitalFormatLink} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="bookDetailsDigitalLink"
                        >Download book</a>
                        <button 
                            className="bookDetailsAddToFavorites" 
                            onClick={handleFavoriteToggle}
                        >
                            {isFavorite ? 
                                (<>Remove <img className="icon" src="/icon/star1.png"/></>) : 
                                (<>Add <img className="icon" src="/icon/star1-hollow.png"/></>)
                            }
                        </button>
                    </div>
                    <img className="bookDetailsImage" src={coverImage} alt={title}/>
                </div>
                <div className="bookDetailsSummary">
                    <div className="bookDetailsSummaryTitle">Summary</div>
                    {summaries}
                </div>
            </div>
        </div>
    );
};