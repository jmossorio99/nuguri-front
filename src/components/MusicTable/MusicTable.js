import React, {Fragment, useEffect, useState} from 'react';
import TitleItem from '../Layout/TitleTableItems/TitleItem';
import classes from "./MusicTable.module.css";
import {useDispatch, useSelector} from "react-redux";
import {deleteSong, fetchRatedSongs, fetchSongs, rateSong, songActions} from "../../store/songs";
import Spinner from "../UI/Spinner/Spinner";
import Modal from "../UI/Modal/Modal";
import YouTubeEmbedded from "../YouTubeEmbedded/YouTubeEmbeddded";
import youTubeIcon from "../../assets/youtubeIcon.svg";
import SongRateForm from "./SongRateForm/SongRateForm";
import SongForm from "../SongForm/SongForm";

const MusicTable = (props) => {

    const [showForm, setShowForm] = useState(false);
    const songs = useSelector(state => state.song.songs);
    const searchSongs = useSelector(state => state.song.searchSongs);
    const ratedSongs = useSelector(state => state.song.ratedSongs);
    const error = useSelector(state => state.song.error);
    const isLoading = useSelector(state => state.song.loading);
    const userId = useSelector(state => state.auth.userId);
    const rateError = useSelector(state => state.song.rateError);
    const rateSuccess = useSelector(state => state.song.rateSuccess);
    const [rateFormError, setRateFormError] = useState(false)
    const dispatch = useDispatch();
    const isProfile = props.prof;
    const [isOpen, setIsOpen] = useState(false);
    const [embedId, setEmbedId] = useState("");
    const [filterState, setFilterState] = useState(0);
    const isAdmin = useSelector(state => state.auth.role) === "admin";
    const [editingSong, setEditingSong] = useState(null);

    function songClicked(embedId) {
        setEmbedId(embedId);
        setIsOpen(true);
    }

    const showFormHandler = (song) => {
        setEditingSong(song);
        setShowForm(true);
    }

    const hideFormHandler = () => {
        setShowForm(false);
    }

    useEffect(() => {
        dispatch(fetchSongs());
        dispatch(songActions.setSearchSongs([]));
        if (isProfile) dispatch(fetchRatedSongs(userId));
    }, [dispatch, userId, isProfile])

    const sort = (notSortedList) => {
        const list = [...notSortedList];
        console.log(list);
        if (filterState === 0) {
            return list;
        }
        if (filterState === 1) {
            return list.sort((a, b) => a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1);
        }
        if (filterState === 2) {
            return list.sort((a, b) => a.name.toUpperCase() < b.name.toUpperCase() ? 1 : -1);
        }
        if (filterState === 3) {
            return list.sort((a, b) => a.artist.toUpperCase() > b.artist.toUpperCase() ? 1 : -1);
        }
        if (filterState === 4) {
            return list.sort((a, b) => a.artist.toUpperCase() < b.artist.toUpperCase() ? 1 : -1);
        }
        if (filterState === 5) {
            return list.sort((a, b) => a.album.toUpperCase() > b.album.toUpperCase() ? 1 : -1);
        }
        if (filterState === 6) {
            return list.sort((a, b) => a.album.toUpperCase() < b.album.toUpperCase() ? 1 : -1);
        }
        if (filterState === 7) {
            return list.sort((a, b) => a.userRating < b.userRating ? 1 : -1);
        }
        if (filterState === 8) {
            return list.sort((a, b) => a.userRating > b.userRating ? 1 : -1);
        }
        if (filterState === 9) {
            return list.sort((a, b) => a.rating < b.rating ? 1 : -1);
        }
        if (filterState === 10) {
            return list.sort((a, b) => a.rating > b.rating ? 1 : -1);
        }
        if (filterState === 11) {
            return list.sort((a, b) => a.numRatings < b.numRatings ? 1 : -1);
        }
        if (filterState === 12) {
            return list.sort((a, b) => a.numRatings > b.numRatings ? 1 : -1);
        }
    }

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

    const onDeleteSongClicked = (songId) => {
        dispatch(deleteSong({songId}))
    }

    let list = null;
    if (songs.length > 0) {
        if (!isProfile && !props.isRatingPage) {
            const sortedSongs = sort(songs);
            list = sortedSongs.map((song) => (
                <tr key={song._id}>
                    <td><img src={youTubeIcon} alt="Play icon" onClick={() => songClicked(song.embedId)}/></td>
                    <td>{song.name}</td>
                    <td>{song.artist}</td>
                    <td>{song.album}</td>
                    <td>{song.numRatings === 0 ? "N/A" : song.rating}</td>
                    <td>{song.numRatings}</td>
                    {isAdmin && (
                        <div className={classes.actions}>
                            <button onClick={() => showFormHandler(song)}>Edit</button>
                            <button onClick={() => onDeleteSongClicked(song._id)}>Delete</button>
                        </div>
                    )}
                </tr>
            ));
        }
    }

    if (ratedSongs.length > 0) {
        if (isProfile) {
            list = sort(ratedSongs).map((song) => (
                <tr key={song.songId}>
                    <td><img src={youTubeIcon} alt="Play icon" onClick={() => songClicked(song.embedId)}/></td>
                    <td>{song.name}</td>
                    <td>{song.artist}</td>
                    <td>{song.userRating}</td>
                    <td>{song.numRatings === 0 ? "N/A" : song.rating}</td>
                </tr>
            ));
        }
    }

    if (searchSongs.length > 0) {
        if (props.isRatingPage) {
            list = sort(searchSongs).map((song) => (
                <tr key={song._id}>
                    <td><img src={youTubeIcon} alt="Play icon" onClick={() => songClicked(song.embedId)}/></td>
                    <td>{song.name}</td>
                    <td>{song.artist}</td>
                    <SongRateForm song={song} onRateClicked={onRateClickedHandler}/>
                </tr>
            ));
        }
    }

    const manageFilter = (id) => {
        switch (id) {
            case 'title':
                if (filterState === 1) {
                    setFilterState(2);
                } else if (filterState === 2) {
                    setFilterState(0);
                } else {
                    setFilterState(1);
                }
                break;
            case 'artist':
                if (filterState === 3) {
                    setFilterState(4);
                } else if (filterState === 4) {
                    setFilterState(0);
                } else {
                    setFilterState(3);
                }
                break;
            case 'album':
                if (filterState === 5) {
                    setFilterState(6);
                } else if (filterState === 6) {
                    setFilterState(0);
                } else {
                    setFilterState(5);
                }
                break;
            case 'my':
                if (filterState === 7) {
                    setFilterState(8);
                } else if (filterState === 8) {
                    setFilterState(0);
                } else {
                    setFilterState(7);
                }
                break;
            case 'rating':
                if (filterState === 9) {
                    setFilterState(10);
                } else if (filterState === 10) {
                    setFilterState(0);
                } else {
                    setFilterState(9);
                }
                break;
            case 'rates':
                if (filterState === 11) {
                    setFilterState(12);
                } else if (filterState === 12) {
                    setFilterState(0);
                } else {
                    setFilterState(11);
                }
                break;
            default:
                setFilterState(0);
        }
    }

    let songList = (
        <table className={classes["content-table"]}>
            <thead>
            <tr>
                <th><h5 style={{margin: "10px 0 0 0"}}>Youtube</h5></th>
                <th><TitleItem
                    onClick={() => manageFilter('title')}>Title {filterState === 1 ? '▼' : filterState === 2 ? '▲' : null}</TitleItem>
                </th>
                <th><TitleItem
                    onClick={() => manageFilter('artist')}>Artist {filterState === 3 ? '▼' : filterState === 4 ? '▲' : null}</TitleItem>
                </th>
                {!isProfile && !props.isRatingPage && <th><TitleItem
                    onClick={() => manageFilter('album')}>Album {filterState === 5 ? '▼' : filterState === 6 ? '▲' : null}</TitleItem>
                </th>}
                {isProfile && <th><TitleItem onClick={() => manageFilter('my')}>My
                    Rating {filterState === 7 ? '▼' : filterState === 8 ? '▲' : null}</TitleItem></th>}
                {!props.isRatingPage && <th><TitleItem onClick={() => manageFilter('rating')}>Average
                    Rating {filterState === 9 ? '▼' : filterState === 10 ? '▲' : null}</TitleItem></th>}
                {!isProfile && !props.isRatingPage && <th><TitleItem
                    onClick={() => manageFilter('rates')}>Rates {filterState === 11 ? '▼' : filterState === 12 ? '▲' : null}</TitleItem>
                </th>}
                {props.isRatingPage && <th><h5 style={{color: "#4ECCA3", margin: "10px 0 0 0"}}>Rate</h5></th>}
                {props.isRatingPage && <th style={{color: "#393E46"}}>Placeholder</th>}
                {isAdmin && !props.isRatingPage && !isProfile &&  <th><h5 style={{margin: "10px 0 0 0", textAlign: "center"}}>Actions</h5></th>}
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
            {showForm && <SongForm title={editingSong.name} artist={editingSong.artist} album={editingSong.album}
                                   embedId={editingSong.embedId} isEdit onBackdropClick={hideFormHandler}
                                   songId={editingSong._id}/>}
        </Fragment>
    )
}

export default MusicTable;
