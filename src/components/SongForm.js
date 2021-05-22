import React from 'react';
import classes from "./SongForm.module.css";
import Modal from "./UI/Modal/Modal";

const SongForm = (props) => {

    const submitHandler = (event) => {
        event.preventDefault()
    }

    return (

        <Modal onBackdropClick={props.onBackdropClick}>
            <section>
                <h2>Add a new song</h2>
                <div className={classes.separator}/>
                <form onSubmit={submitHandler}>
                    <div className={classes.control}>
                        <label htmlFor="title">Title</label>
                        <input type={"text"} id={"title"} requried autoComplete={"off"}/>
                    </div>
                    <div className={classes.control}>
                        <label htmlFor="artist">Artist</label>
                        <input type={"text"} id={"artist"} requried autoComplete={"off"}/>
                    </div>
                    <div className={classes.control}>
                        <label htmlFor="album">Album</label>
                        <input type={"text"} id={"album"} requried autoComplete={"off"}/>
                    </div>
                    <div className={classes.actions}>
                        <button>Add</button>
                    </div>
                </form>
            </section>
        </Modal>

    );
};

export default SongForm;
