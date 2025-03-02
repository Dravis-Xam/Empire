import React, { useState } from 'react';
import images from './imagesUrls'; // Ensure this exports an object with a `search` property
import items from '../../modules/items'; // Import the items
import Item from '../item/Item'; // Import the Item component
import './SearchBar.css';
import { X } from 'lucide-react';

export default function SearchBar() {
    const [searchQuery, setSearchQuery] = useState(''); // State to store the input value
    const [hasText, setHasText] = useState(false); // State to track if input has text
    const [filteredItems, setFilteredItems] = useState([]); // State to store filtered items
    const [selectedItem, setSelectedItem] = useState(null); // State to store the selected item

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchQuery(value);
        setHasText(value.length > 0); // Update hasText based on whether input has text

        // Filter items based on the search query
        const filtered = items.filter(item =>
            item.name.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredItems(filtered);
    };

    const handleSearch = () => {
        console.log('Search Query:', searchQuery); // Perform search action
        setSearchQuery(''); // Clear the input field
        setHasText(false); // Reset hasText state
        setFilteredItems([]); // Clear the filtered items
        setSelectedItem(null); // Clear the selected item
    };

    const handleItemClick = (item) => {
        setSelectedItem(item); // Set the selected item
        setSearchQuery(''); // Clear the search input
        setHasText(false); // Reset hasText state
        setFilteredItems([]); // Clear the search results
    };

    const handleCloseItem = () => {
        setSelectedItem(null); // Clear the selected item
    };

    return (
        <div className='searchbar-container'>
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
            {hasText && (
                <div className='search-results'>
                    {filteredItems.map(item => (
                        <div
                            key={item.itemId}
                            className='search-result-item'
                            onClick={() => handleItemClick(item)} // Make the item clickable
                        >
                            <img src={item.details.image} alt={item.name} className='item-image' />
                            <div className='item-details'>
                                <h3>{item.name}</h3>
                                <p>Price: ${item.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {selectedItem && (
                <div className='selected-item-card'>
                    <button className='close-btn' onClick={handleCloseItem}>
                        <X />
                    </button>
                    <Item prop={selectedItem} /> {/* Render the Item component for the selected item */}
                </div>
            )}
        </div>
    );
}