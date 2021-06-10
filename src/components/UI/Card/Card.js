import React from 'react';
import classes from "./Card.module.css";

// Renders children wrapped in a card
const Card = (props) => {
    return (
        <div className={classes.card}>
            {props.children}
        </div>
    );
};

export default Card;
