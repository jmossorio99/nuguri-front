import React, {useState} from 'react';
import SongForm from "../../components/SongForm/SongForm";
import MusicTable from "../../components/MusicTable/MusicTable";
import classes from "./HomePage.module.css";
import {useSelector} from "react-redux";

const HomePage = () => {

    const [showForm, setShowForm] = useState(false);
    const isAdmin = useSelector(state => state.auth.role) === "admin";

    const showFormHandler = () => {
        setShowForm(true);
    }

    const hideFormHandler = () => {
        setShowForm(false);
    }

    return (
        <div className={classes.homePage}>
            {isAdmin ? <h2>Admin Dashboard</h2> : <h2>Start Discovering New Music</h2>}
            <h3>Sort by</h3>
            <MusicTable />
            {isAdmin && <button onClick={showFormHandler}>+ Add song</button>}
            {showForm && <SongForm onBackdropClick={hideFormHandler}/>}
        </div>
    );
};

export default HomePage;
