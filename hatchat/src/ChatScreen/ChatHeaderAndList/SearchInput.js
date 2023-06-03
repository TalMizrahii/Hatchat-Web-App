import React, { useRef } from "react";

function SearchInput({ handleSearch }) {
    const searchBox = useRef(null);

    const handleOnChange = () => {
        handleSearch(searchBox.current.value);
    };

    return (
        <div className="input-group rounded">
            <input
                type="search"
                className="form-control rounded"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="search-addon"
                ref={searchBox}
                onChange={handleOnChange}
            />
        </div>
    );
}

export default SearchInput;
