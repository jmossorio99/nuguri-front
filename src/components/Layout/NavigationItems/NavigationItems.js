import React from 'react';
import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const NavigationItems = () => {
    return (
        <ul className={classes.navigationItems}>
            <NavigationItem link="/">Home</NavigationItem>
            <NavigationItem link="/rank">Rank songs</NavigationItem>
            <NavigationItem link="/profile">Profile</NavigationItem>
            <div className={classes.line}></div>
            <NavigationItem link="/logout">Sign out</NavigationItem>
        </ul>
    );
};

export default NavigationItems;
