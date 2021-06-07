import React from 'react';
import {useSelector} from "react-redux";
import classes from "./ProfileInfo.module.css";
import MusicTable from "../MusicTable/MusicTable";

function ProfileInfo() {

    const username = useSelector(state => state.auth.username);

    return (
        <div className={classes.container}>
            <h1>Hi {username}!</h1>
            <h1>Here are the songs you have rated</h1>
            <MusicTable prof={1} />
        </div>
    )
}

export default ProfileInfo
