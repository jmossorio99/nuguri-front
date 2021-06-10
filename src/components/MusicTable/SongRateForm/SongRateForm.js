import React, {useState} from 'react';
import classes from "../MusicTable.module.css";

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
