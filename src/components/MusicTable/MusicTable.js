import React, {Fragment, useEffect, useState} from 'react';
import TitleItem from '../Layout/TitleTableItems/TitleItem';
import classes from "./MusicTable.module.css";
import {useDispatch, useSelector} from "react-redux";
import {fetchSongs, rateSong, songActions} from "../../store/songs";
import Spinner from "../UI/Spinner/Spinner";
import Modal from "../UI/Modal/Modal";
import YouTubeEmbedded from "../YouTubeEmbedded/YouTubeEmbeddded";
import youTubeIcon from "../../assets/youtubeIcon.svg";
import SongRateForm from "./SongRateForm/SongRateForm";

const MusicTable = (props) => {

    const songs = useSelector(state => state.song.songs);
    const error = useSelector(state => state.song.error);
    const isLoading = useSelector(state => state.song.loading);
    const userId = useSelector(state => state.auth.userId);
    const rateError = useSelector(state => state.song.rateError);
    const rateSuccess = useSelector(state => state.song.rateSuccess);
    const [rateFormError, setRateFormError] = useState(false)
    const dispatch = useDispatch();
    const isProfile = props.prof === 1;

    const [isOpen, setIsOpen] = useState(false);
    const [embedId, setEmbedId] = useState("");

    function songClicked(embedId) {
        setEmbedId(embedId);
        setIsOpen(true);
    }

    useEffect(() => {
            dispatch(fetchSongs());
    }, [dispatch])

    const onRateClickedHandler = (songId, rating) => {
        if (rating < 1 || rating > 10) {
            setRateFormError(true);
            return;
        }
        setRateFormError(false);
        dispatch(rateSong({songId, userId, rating}));
    }

    const closeSuccessModal = () => {
        dispatch(songActions.setRateSuccess(false))
    }

    let list = songs.map((song) => (
        <tr key={song._id}>
            <td><img src={youTubeIcon} alt="Play icon" onClick={() => songClicked(song.embedId)}/></td>
            <td>{song.name}</td>
            <td>{song.artist}</td>
            <td>{song.album}</td>
            <td>{song.rating}</td>
            <td>{song.numRatings}</td>
        </tr>
    ));

    if (isProfile) {
        list = songs.map((song) => (
            <tr key={song._id}>
                <td><img src={youTubeIcon} alt="Play icon" onClick={() => songClicked(song.embedId)}/></td>
                <td>{song.name}</td>
                <td>{song.artist}</td>
                <td>{0}</td>
                <td>{song.numRatings}</td>
            </tr>
        ));
    }

    if (props.isRatingPage) {
        list = songs.map((song) => (
            <tr key={song._id}>
                <td><img src={youTubeIcon} alt="Play icon" onClick={() => songClicked(song.embedId)}/></td>
                <td>{song.name}</td>
                <td>{song.artist}</td>
                <SongRateForm song={song} onRateClicked={onRateClickedHandler}/>
            </tr>
        ));
    }

    let songList = (
        <table className={classes["content-table"]}>
            <thead>
            <tr>
                <th><TitleItem>Youtube</TitleItem></th>
                <th><TitleItem>Title</TitleItem></th>
                <th><TitleItem>Artist</TitleItem></th>
                {!isProfile && !props.isRatingPage && <th><TitleItem>Album</TitleItem></th>}
                {isProfile && <th><TitleItem>My Rating</TitleItem></th>}
                {!props.isRatingPage && <th><TitleItem>Average Rating</TitleItem></th>}
                {!isProfile && !props.isRatingPage && <th><TitleItem>Rates</TitleItem></th>}
                {props.isRatingPage && <th style={{color: "#4ECCA3"}}>Rate</th>}
                {props.isRatingPage && <th style={{color: "#393E46"}}>Placeholder</th>}
            </tr>
            </thead>
            <tbody>{list}</tbody>
        </table>
    )

    if (songs.length === 0) {
        songList = <p>There are currently no songs</p>;
    }

    if (error) {
        songList = <p>Sorry, something went wrong</p>;
    }

    return (
        <Fragment>
            {rateFormError && <p>Please enter a number between 1 and 10</p>}
            {rateError && <p>Something went wrong, please try again later</p>}
            {rateSuccess && <Modal onBackdropClick={closeSuccessModal}><p>Song Rated!</p></Modal>}
            {isLoading ? <Spinner/> : songList}
            {isOpen && <Modal onBackdropClick={() => setIsOpen(false)}><YouTubeEmbedded embedId={embedId}/></Modal>}
        </Fragment>
    )
}

export default MusicTable;
