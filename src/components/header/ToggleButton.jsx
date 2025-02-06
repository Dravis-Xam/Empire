import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleVisibility } from './visibilitySlice';
import images from "./imagesUrls"

const ToggleButton = () => {
    const dispatch = useDispatch();

    return (
        <button onClick={() => dispatch(toggleVisibility())}>
            <img src={images.cart}/>
        </button>
    );
};

export default ToggleButton;