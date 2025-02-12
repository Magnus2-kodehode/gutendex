import { Link, NavLink } from "react-router-dom";

import Searchbar from "./Searchbar";

import iconStar2Hollow from "/icon/star2-hollow.png";

export default function Header({ onSearch }) {


    return (
        <header className="header">
            <Link to="/" className="headerTitle">Gutendex</Link>
            <Searchbar onSearch={onSearch}/>
            <Link to="/favorites" className="button">Favorites <img className="icon" src={iconStar2Hollow}/></Link>
        </header>
    );
};