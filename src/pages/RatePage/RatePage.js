import React, {useState} from 'react';
import classes from "./RatePage.module.css";
import MusicTable from "../../components/MusicTable/MusicTable";
import {useDispatch} from "react-redux";
import {fetchSearchSongs} from "../../store/songs";

const RatePage = () => {

    const [songName, setSongName] = useState("");
    const dispatch = useDispatch();

    const songNameChangeHandler = (event) => {
        const newName = event.target.value;
        setSongName(newName);
    };

    const searchClickedHandler = () => {
        if (songName.trim().length > 0){
            dispatch(fetchSearchSongs(songName));
        }
    };

    return (
        <section className={classes.ratePage}>
            <h1>Rate a song</h1>
            <div className={classes.inputForm}>
                <input type={"text"} onChange={songNameChangeHandler} id={"songName"} name={"songName"}
                       value={songName} placeholder={"Start typing the name of a song"} />
                <button onClick={searchClickedHandler}>Search</button>
            </div>
            <MusicTable isRatingPage />
        </section>
    );
};

export default RatePage;
