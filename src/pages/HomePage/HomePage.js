import React, {useState} from 'react';
import SongForm from "../../components/SongForm/SongForm";
import MusicTable from "../../components/MusicTable/MusicTable";
import classes from "./HomePage.module.css";
import {useSelector} from "react-redux";

// Wrapper component which renders the HomePage elements
const HomePage = () => {

    const [showForm, setShowForm] = useState(false);
    const isAdmin = useSelector(state => state.auth.role) === "admin";

    // Shows the SongForm
    const showFormHandler = () => {
        setShowForm(true);
    }

    // Hides the SongForm
    const hideFormHandler = () => {
        setShowForm(false);
    }

    return (
        <div className={classes.homePage}>
            <h1>Welcome to SongRanker</h1>
            {isAdmin ? <h2>Admin Dashboard</h2> : <h2>Start Discovering New Music</h2>}
            <h4>Click on a table header to sort!</h4>
            {isAdmin && <button className={classes.addBtn} onClick={showFormHandler}>+ Add song</button>}
            <MusicTable />
            {showForm && <SongForm onBackdropClick={hideFormHandler}/>}
        </div>
    );
};

export default HomePage;
