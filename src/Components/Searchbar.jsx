import { useState } from "react";

export default function Searchbar({ onSearch }) {
    const [input, setInput] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(input);
    };

    return (
        <form onSubmit={handleSearch}>
            <input 
                className="searchbar" 
                placeholder="Search" 
                value={input} 
                onChange={(e) => setInput(e.target.value)}
            />
        </form>
    );
};