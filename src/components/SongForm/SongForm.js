import React, {useState} from 'react';
import classes from "./SongForm.module.css";
import Modal from "../UI/Modal/Modal";
import axios from "../../axios";
import Spinner from "../UI/Spinner/Spinner";
import {fetchSongs} from "../../store/songs";
import {useDispatch} from "react-redux";

const SongForm = (props) => {

    // State slices for handling entered data, errors and overall form validation
    const [title, setTitle] = useState("");
    const [titleTouched, setTitleTouched] = useState(false);
    const titleError = title.trim().length <= 0;
    const [artist, setArtist] = useState("");
    const [artistTouched, setArtistTouched] = useState(false);
    const artistError = artist.trim().length <= 0;
    const [album, setAlbum] = useState("");
    const [albumTouched, setAlbumTouched] = useState(false);
    const albumError = album.trim().length <= 0;
    const [embedId, setEmbedId] = useState("");
    const [embedIdTouched, setEmbedIdTouched] = useState(false);
    const embedIdError = embedId.trim().length <= 0;
    const formIsValid = !(titleError || artistError || albumError || embedIdError);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    // Song submission error handling
    const [error, setError] = useState(false);

    // On change listener for title
    const titleChangedHandler = (event) => {
        const newValue = event.target.value;
        setTitleTouched(true);
        setTitle(newValue);
    }

    // On change listener for artist
    const artistChangedHandler = (event) => {
        const newValue = event.target.value;
        setArtistTouched(true);
        setArtist(newValue);
    }

    // On change listener for album
    const albumChangedHandler = (event) => {
        const newValue = event.target.value;
        setAlbumTouched(true);
        setAlbum(newValue);
    }

    // On change listener for embedId
    const embedIdChangedHandler = (event) => {
        const newValue = event.target.value;
        setEmbedIdTouched(true);
        setEmbedId(newValue);
    }

    // This method handlers the submission of the form
    const submitHandler = (event) => {
        event.preventDefault()
        setTitleTouched(true);
        setAlbumTouched(true);
        setArtistTouched(true);
        setEmbedIdTouched(true);
        if (formIsValid) {
            setLoading(true);
            const songData = {
                name: title,
                artist,
                album,
                embedId
            }
            axios.post("/song", songData)
                .then(res => {
                    setLoading(false);
                    props.onBackdropClick();
                    dispatch(fetchSongs());
                })
                .catch(err => {
                    setLoading(false);
                    setError(true);
                });
        }
    }

    let form = (
        <section>
            <h2>Add a new song</h2>
            <div className={classes.separator}/>
            <form onSubmit={submitHandler}>
                <div className={classes.control}>
                    <label htmlFor="title">Title</label>
                    <input type={"text"} id={"title"} required autoComplete={"off"} value={title}
                           onChange={titleChangedHandler}/>
                    {titleTouched && titleError && <p>Please enter a valid title</p>}
                </div>
                <div className={classes.control}>
                    <label htmlFor="artist">Artist</label>
                    <input type={"text"} id={"artist"} required autoComplete={"off"} value={artist}
                           onChange={artistChangedHandler}/>
                    {artistTouched && artistError && <p>Please enter a valid artist</p>}
                </div>
                <div className={classes.control}>
                    <label htmlFor="album">Album</label>
                    <input type={"text"} id={"album"} required autoComplete={"off"} value={album}
                           onChange={albumChangedHandler}/>
                    {albumTouched && albumError && <p>Please enter a valid album</p>}
                </div>
                <div className={classes.control}>
                    <label htmlFor="embedId">Embed Id</label>
                    <input type={"text"} id={"embedId"} required autoComplete={"off"} value={embedId}
                           onChange={embedIdChangedHandler}/>
                    {embedIdTouched && embedIdError && <p>Please enter a valid Embed Id</p>}
                </div>
                <div className={classes.actions}>
                    <button>Add</button>
                </div>
            </form>
        </section>
    )

    if (error) {
        form = <p>Something went wrong</p>;
    }

    if (loading) {
        form = <Spinner />
    }

    return (
        <Modal onBackdropClick={props.onBackdropClick}>
            {form}
        </Modal>
    );
};

export default SongForm;
