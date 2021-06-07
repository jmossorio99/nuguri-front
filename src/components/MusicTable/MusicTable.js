import React, {Fragment, useEffect, useState} from 'react';
import TitleItem from '../Layout/TitleTableItems/TitleItem';
import classes from "./MusicTable.module.css";
import {useDispatch, useSelector} from "react-redux";
import {fetchSongs} from "../../store/songs";
import Spinner from "../UI/Spinner/Spinner";
import Modal from "../UI/Modal/Modal";
import YouTubeEmbedded from "../YouTubeEmbedded/YouTubeEmbeddded";
import youTubeIcon from "../../assets/youtubeIcon.svg";

const MusicTable = (props) => {

    const songs = useSelector(state => state.song.songs);
    const error = useSelector(state => state.song.error);
    const isLoading = useSelector(state => state.song.loading);
    const dispatch = useDispatch();
    const isProfile = props.prof===1;

    const [isOpen, setIsOpen] = useState(false);
    const [embedId, setEmbedId] = useState("");

    function songClicked(embedId){
        setEmbedId(embedId);
        setIsOpen(true);
    }

    useEffect(() => {
        if (songs.length === 0) {
            dispatch(fetchSongs());
        }
    }, [dispatch, songs.length])

    const renderSongs = () => {
        let list;
        if(!isProfile){
            list = songs.map((song) => (
                <tr key={song._id}>
                    <td><img src={youTubeIcon} alt="Play icon" onClick={()=>songClicked(song.embedId)} /></td>
                    <td>{song.name}</td>
                    <td>{song.artist}</td>
                    <td>{song.album}</td>
                    <td>{song.rating}</td>
                    <td>{song.rates}</td>
                </tr>
            ));
        }else{
            list = songs.map((song) => (
                <tr key={song._id}>
                    <td><img src={youTubeIcon} alt="Play icon" onClick={()=>songClicked(song.embedId)} /></td>
                    <td>{song.name}</td>
                    <td>{song.artist}</td>
                    <td>{song.rating}</td>
                </tr>
            ));
        }
        return list;
    }

    let songList = (
        <table className={classes["content-table"]}>
            <thead>
            <tr>
                <th><TitleItem>Youtube</TitleItem></th>
                <th><TitleItem>Title</TitleItem></th>
                <th><TitleItem>Artist</TitleItem></th>
                {!isProfile && <th><TitleItem>Album</TitleItem></th>}
                <th><TitleItem>Rating</TitleItem></th>
                {!isProfile && <th><TitleItem>Rates</TitleItem></th>}
            </tr>
            </thead>
            <tbody>{renderSongs()}</tbody>
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
            {isLoading ? <Spinner /> : songList}
            {isOpen && <Modal onBackdropClick={()=>setIsOpen(false)}><YouTubeEmbedded embedId={embedId} /></Modal>}
        </Fragment>
    )
}

export default MusicTable;
