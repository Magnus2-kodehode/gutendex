import { Link, NavLink } from "react-router-dom";

export default function Nav({ onCategorySelect }) {
    const categories = [
        "Adventure",
        "Fantasy",
        "Fiction",
        "Justice",
        "Morality",
        "Mystery",
        "Philosophy",
        "Power",
        "Romance",
        "Society",
        "Thriller",
        "Tragedy",
        "War",
    ];

    return (
        <nav className="nav">
            {categories.map((category) => (
                <Link 
                    key={category} 
                    to={`/category/${category.toLowerCase()}`} 
                    className="navItem"
                >
                    {category}
                </Link>
            ))}
        </nav>
    );
};