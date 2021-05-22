import React, {Fragment, useEffect} from 'react'
import TitleItem from '../Layout/TitleTableItems/TitleItem';
import classes from "./MusicTable.module.css";
import {useDispatch, useSelector} from "react-redux";
import {fetchSongs} from "../../store/songs";
import Spinner from "../UI/Spinner/Spinner";

const MusicTable = (props) => {

    const songs = useSelector(state => state.song.songs);
    const error = useSelector(state => state.song.error);
    const isLoading = useSelector(state => state.song.loading);
    const dispatch = useDispatch();

    useEffect(() => {
        if (songs.length === 0) {
            dispatch(fetchSongs());
        }
    }, [dispatch, songs.length])

    const renderSongs = () => {
        let list = songs.map((song) => (
            <tr key={song._id}>
                <td>{song.name}</td>
                <td>{song.artist}</td>
                <td>{song.album}</td>
                <td>{song.rating}</td>
                <td>{song.rates}</td>
            </tr>
        ));
        return list;
    }

    let songList = (
        <table className={classes["content-table"]}>
            <thead>
            <tr>
                <th><TitleItem>Title</TitleItem></th>
                <th><TitleItem>Artist</TitleItem></th>
                <th><TitleItem>Album</TitleItem></th>
                <th><TitleItem>Rating</TitleItem></th>
                <th><TitleItem>Rates</TitleItem></th>
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
        </Fragment>
    )
}

export default MusicTable;
