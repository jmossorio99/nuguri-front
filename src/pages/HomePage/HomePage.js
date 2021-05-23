import React, {useState} from 'react';
import SongForm from "../../components/SongForm/SongForm";
import MusicTable from "../../components/MusicTable/MusicTable";
import classes from "./HomePage.module.css";

const HomePage = () => {

    const [showForm, setShowForm] = useState(false);

    const showFormHandler = () => {
        setShowForm(true);
    }

    const hideFormHandler = () => {
        setShowForm(false);
    }

    return (
        <div className={classes.homePage}>
            <h1>Home Page</h1>
            <MusicTable />
            <button onClick={showFormHandler}>+ Add song</button>
            {showForm && <SongForm onBackdropClick={hideFormHandler}/>}
        </div>
    );
};

export default HomePage;
