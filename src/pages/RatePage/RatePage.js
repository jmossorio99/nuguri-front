import React, {useState} from 'react';
import classes from "./RatePage.module.css";
import MusicTable from "../../components/MusicTable/MusicTable";

const RatePage = () => {

    const [songName, setSongName] = useState("");

    const songNameChangeHandler = (event) => {
        const newName = event.target.value;
        setSongName(newName);
    };

    const searchClickedHandler = () => {
        if (songName.trim().length > 0){
            console.log(songName)
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
