import React, { useState } from 'react';
import images from './imagesUrls'; // Ensure this exports an object with a `search` property
import './SearchBar.css';

export default function SearchBar() {
    const [searchQuery, setSearchQuery] = useState(''); // State to store the input value
    const [hasText, setHasText] = useState(false); // State to track if input has text

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchQuery(value);
        setHasText(value.length > 0); // Update hasText based on whether input has text
    };

    const handleSearch = () => {
        console.log('Search Query:', searchQuery); // Perform search action
        setSearchQuery(''); // Clear the input field
        setHasText(false); // Reset hasText state
    };

    return (
        <div className='searchbar'>
            <input
                type='text'
                value={searchQuery}
                onChange={handleInputChange}
                className={`search-input ${hasText ? 'has-text' : ''}`} // Apply class if input has text
                placeholder='Search...'
            />
            <button className='searchBtn' onClick={handleSearch}>
                <img src={images.search} alt='Search' /> {/* Ensure `images.search` contains the correct URL */}
            </button>
        </div>
    );
}