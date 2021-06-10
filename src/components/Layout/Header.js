import React, { Fragment } from 'react';
import headphonesIcon from "../../assets/headphones-iconWhite.svg";
import classes from "./Header.module.css";
import NavigationItems from "./NavigationItems/NavigationItems";

// Header component for the navigation of the web app
const Header = () => {
    return (
        <Fragment>
            <header className={classes.header}>
                <img src={headphonesIcon} alt="icon" />
                <nav>
                    <NavigationItems />
                </nav>
            </header>
        </Fragment>
    );
};

export default Header;
