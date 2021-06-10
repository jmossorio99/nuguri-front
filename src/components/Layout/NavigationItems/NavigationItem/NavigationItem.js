import React, { Fragment } from 'react';
import classes from "./NavigationItem.module.css";
import {NavLink} from "react-router-dom";
import {useDispatch} from "react-redux";
import {authActions} from "../../../../store/auth";

// Simple component to render a single navigation item
const NavigationItem = (props) => {

    const dispatch = useDispatch();

    // Handles a click on the logout button
    const logoutHandler = () => {
        dispatch(authActions.logout());
    }

    let item = (
        <li className={classes.navigationItem}>
            <NavLink exact activeClassName={classes.active} to={props.link}>
                {props.children}
            </NavLink>
        </li>
    );

    if (props.logout) {
        item = (
            <li className={classes.navigationItem}>
                <p onClick={logoutHandler} style={{color: "white", paddingLeft: 8, cursor: "pointer"}}>
                    {props.children}
                </p>
            </li>
        )
    }

    return (
        <Fragment>
            {item}
        </Fragment>
    );
};

export default NavigationItem;
