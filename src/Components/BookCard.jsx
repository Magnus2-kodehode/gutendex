import React,{ useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import iconStar1 from "/icon/star1.png";
import iconStar1Hollow from "/icon/star1-hollow.png";

export default function BookCard({ data, updateFavorites }) {
    const { formats, title, authors, languages, download_count, id } = data;
    const coverImage = formats && formats["image/jpeg"] ? formats["image/jpeg"] : "default-cover.jpg";
    const authorName = authors && authors.length > 0 ? authors[0].name : "Unknown Author";

    const handleFavoriteToggle = () => {
        let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        if (favorites.some((favorite) => favorite.id === data.id)) {
            favorites = favorites.filter((favorite) => favorite.id !== data.id);
        } else {
            favorites.push(data);
        }
        localStorage.setItem("favorites", JSON.stringify(favorites));
        updateFavorites(favorites);
    };

    const isFavorite = JSON.parse(localStorage.getItem("favorites"))?.some(
        (favorite => favorite.id === data.id)
    );

    return (
        <div className="bookCard">
            <Link className="book" to={`/book/${id}`}>
                <img className="bookCardImage" src={coverImage} alt={title}/>
            </Link>
            <Link className="book" to={`/book/${id}`}>
                <div className="bookCardTitle">{title}</div>
            </Link>
            <div className="bookCardAuthor">{authorName}</div>
            <div className="bookCardLanguage">Language: {languages}</div>
            <div className="bookCardDownloads">Downloads: {download_count}</div>
            <button 
                className="bookCardAddToFavorites" 
                onClick={handleFavoriteToggle}
            >
                {isFavorite ? 
                    (<>Remove <img className="icon" src={iconStar1}/></>) : 
                    (<>Add <img className="icon" src={iconStar1Hollow}/></>)
                }
            </button>
        </div>
    );
};