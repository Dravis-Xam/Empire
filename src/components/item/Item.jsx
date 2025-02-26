import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import AddToCartButton from './AddItem';
import './item.css';

function Item({ prop }) {
    return (
        <div className="item-card">
            <div className="prop-name">{prop.name}</div>
            <div className="prop-details">
                <div className='item-details-container'>
                    <div className="prop-ram"> RAM: {prop.details.ram}-</div>
                    <div className="prop-storage"> Storage: {prop.details.i_storage}-</div>
                    <div className="prop-image-res">
                         Image Resolution: {prop.details.i_resolution}-
                    </div>
                    <div className='prop-see-more'>See more ... </div> 
                    <div className="prop-price"> Price: ${prop.price}-</div>
                </div>
                <div className='item-image-container'>
                    <img src={prop.details.image} alt={prop.name}/>
                </div>
            </div>
            <div className="add-to-cart">
                <AddToCartButton item={prop} />
            </div>
        </div>
    );
}
 
// PropType checks
Item.propTypes = {
    prop: PropTypes.shape({
        name: PropTypes.string.isRequired,
        price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        details: PropTypes.shape({
            ram: PropTypes.string.isRequired,
            i_storage: PropTypes.string.isRequired,
            i_resolution: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
};

export default Item;