import React from 'react';
import { Link } from 'react-router-dom';

const ImageButton = ({ imageUrl, linkTo, altText }) => {
    return (
        <Link to={linkTo}>
        <img 
            src={imageUrl} 
            alt={altText} 
            style={{ 
                cursor: 'pointer',
            }} />
        </Link>
    );
};

export default ImageButton;