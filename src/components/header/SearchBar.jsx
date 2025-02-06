import React, { useState } from 'react';
import images from './imagesUrls'; 
import './SearchBar.css';

export default function SearchBar() {
    const [searchQuery, setSearchQuery] = useState(''); 
    const [isInputVisible, setIsInputVisible] = useState(false); 

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value); 
    };

    const handleMouseMove = () => {
        setIsInputVisible(true); 
    };

    const handleSearch = () => {
        console.log('Search Query:', searchQuery); 
    };

    return (
        <div className='searchbar' onMouseMove={handleMouseMove}>
            <input
                type='text'
                value={searchQuery}
                onChange={handleInputChange}
                className={`search-input ${isInputVisible ? 'visible' : 'hidden'}`} 
                placeholder='Search...'
            />
            <button className='searchBtn' onClick={handleSearch}>
                <img src={images.search} alt='Search' /> 
            </button>
        </div>
    );
}