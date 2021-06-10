import React, {useState} from 'react';
import classes from "../MusicTable.module.css";

// Form for the rating of a song. Handles the rating input and triggers a callback function when the rate button
// is clicked. That function is passed by props from a parent component.
const SongRateForm = (props) => {

    const [rate, setRate] = useState("");

    const rateChangedHandler = (event) => {
        const newRate = event.target.value;
        setRate(newRate);
    }

    return (
        <React.Fragment>
            <td><input type={"number"} autoComplete={"off"} value={rate} onChange={rateChangedHandler}
                       className={classes.ratingInput}/></td>
            <td>
                <button className={classes.ratingButton} onClick={() => props.onRateClicked(props.song._id, rate)}>Rate</button>
            </td>
        </React.Fragment>
    );
};

export default SongRateForm;
