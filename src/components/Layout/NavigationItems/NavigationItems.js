import React, { Fragment } from 'react';
import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";
import {useSelector} from "react-redux";

const NavigationItems = () => {

    const isLoggedIn = useSelector(state => state.auth.token !== null);

    const navItems = (
        <ul className={classes.navigationItems}>
            <NavigationItem link="/">Home</NavigationItem>
            <NavigationItem link="/rank">Rate songs</NavigationItem>
            <NavigationItem link="/profile">Profile</NavigationItem>
            <div className={classes.line}></div>
            <NavigationItem logout link="/">Sign out</NavigationItem>
        </ul>
    );

    return (
        <Fragment>
            {isLoggedIn && navItems}
        </Fragment>
    );
};

export default NavigationItems;
