import React from "react";
import { Search } from "lucide-react";
import "./SearchBar.css";

const SearchBar = ({className = "", placeholder = "Buscar...", onSearch }) => {

    const [query, setQuery] = React.useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSearch) onSearch(query);
    };

    const onChange = (e) => {
        setQuery(e.target.value)
    }

    return (
        <form className={`search-bar ${className}`} onSubmit={handleSubmit}>
            <input
                type="text"
                value={query}
                onChange={onChange}
                placeholder={placeholder}
                className={`search-input ${className}-input`}
            />

            <button type="submit" className={`button-glass-s search-button ${className}-button`}>
                <Search />
            </button>

        </form>
    );
};

export default SearchBar;