import React, { Fragment } from 'react';
import headphonesIcon from "../../assets/headphones-icon.svg";
import classes from "./Header.module.css";
import NavigationItems from "./NavigationItems/NavigationItems";

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
