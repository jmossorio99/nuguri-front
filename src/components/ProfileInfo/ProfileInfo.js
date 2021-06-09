import React, { useState, useEffect } from 'react';
import {useSelector} from "react-redux";
import classes from "./ProfileInfo.module.css";
import MusicTable from "../MusicTable/MusicTable";
import axios from "../../axios";

function ProfileInfo() {

    const username = useSelector(state => state.auth.username);
    const userId = useSelector(state => state.auth.userId);
    const [ratedList, setRatedList] = useState([]);

    useEffect(()=>{
        let list = [];
        axios.get(`/user/ratedSongs/${userId}`)
        .then(rest => {
            console.log("rated songs:  "+rest.data);
            list.push(rest.data);
            setRatedList(list);
        }).catch(err=>{
            console.log(err);
        });
    });

    return (
        <div className={classes.container}>
            <h1>Hi {username}!</h1>
            <h1>Here are the songs you have rated</h1>
            <MusicTable prof={1} ratedSongs={ratedList} />
        </div>
    )
}

export default ProfileInfo
