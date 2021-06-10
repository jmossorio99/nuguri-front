import React, {useState} from 'react';
import classes from "./RatePage.module.css";
import MusicTable from "../../components/MusicTable/MusicTable";
import loupe from "../../assets/loupe.png";

// Wrapping component to show the RatePage elemenets
const RatePage = () => {

    const [songName, setSongName] = useState("");

    // Handles changes in the current songName to be searched
    // @param event: the input that triggered the change
    const songNameChangeHandler = (event) => {
        const newName = event.target.value;
        setSongName(newName);
    };

    return (
        <section className={classes.ratePage}>
            <h1>Rate a song</h1>
            <div className={classes.inputForm}>
                <img alt={"Magnifying glass"} src={loupe} />
                <input type={"text"} onChange={songNameChangeHandler} id={"songName"} name={"songName"}
                       value={songName} autoComplete={"off"} placeholder={"Start typing the name of a song"} />
            </div>
            <MusicTable isRatingPage songName={songName} />
        </section>
    );
};

export default RatePage;
