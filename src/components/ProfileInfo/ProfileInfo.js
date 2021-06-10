import React from 'react';
import {useSelector} from "react-redux";
import classes from "./ProfileInfo.module.css";
import MusicTable from "../MusicTable/MusicTable";

// This component renders the profile information of the current logged in user
function ProfileInfo() {

    const username = useSelector(state => state.auth.username);
    const userId = useSelector(state => state.auth.userId);

    return (
        <div className={classes.container}>
            <h1>Hi {username}!</h1>
            <h1>Here are the songs you have rated</h1>
            <MusicTable prof={true} userId={userId} isRatingPage={false} />
        </div>
    )
}

export default ProfileInfo
