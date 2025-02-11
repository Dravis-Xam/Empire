import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleVisibility } from '../../features/visibility/visibilitySlice';
import images from "./imagesUrls"
import "./supButtons.css"

const ToggleButton = () => {
    const dispatch = useDispatch();

    return (
        <button className= "toggle-cart-btn" onClick={() => dispatch(toggleVisibility())}>
            <img src={images.cart}/>
        </button>
    );
};

export default ToggleButton;