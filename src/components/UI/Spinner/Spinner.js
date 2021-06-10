import React from 'react';
import classes from "./Spinner.module.css";

// Renders a spinner
const Spinner = () => {
    return (
        <div className={classes.loader} />
    );
};

export default Spinner;
