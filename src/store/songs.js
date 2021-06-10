import {createSlice} from "@reduxjs/toolkit";
import axios from "../axios";

//initial state for songs.js which contains variables for the state of actions like rate success and loading to set the spinner while loading. Also it contains arrays like songs which have all songs saved in the app and ratedSongs which have songs that were rated by the logged user
const initialState = {
    songs: [],
    error: false,
    loading: false,
    rateSuccess: false,
    rateError: false,
    ratedSongs: [],
    searchSongs: []
}

//set methods to the variables of the state 
const songsSlice = createSlice({
    name: "songs",
    initialState,
    reducers: {
        setSongs(state, action) {
            state.songs = action.payload;
        },
        setSearchSongs(state, action) {
            state.searchSongs = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setRateError(state, action) {
            state.rateError = action.payload;
        },
        setRateSuccess(state, action) {
            state.rateSuccess = action.payload;
        },
        setRatedSongs(state, action){
            state.ratedSongs = action.payload;
        }
    }
});

// request to the backend all songs saved in the database(/song), changing state variables if it was an error or if it is loading
export const fetchSongs = () => {
    return dispatch => {
        dispatch(songActions.setLoading(true));
        axios.get("/song")
            .then(res => {
                dispatch(songActions.setSongs(res.data));
                dispatch(songActions.setError(false));
                dispatch(songActions.setLoading(false));
            })
            .catch(err => {
                console.log(err);
                dispatch(songActions.setError(true));
                dispatch(songActions.setLoading(false));
            })
    }
}

// Not needed right
export const fetchSearchSongs = (songName) => {
    return dispatch => {
        dispatch(songActions.setLoading(true));
        axios.get(`/song/findByName/${songName}`)
            .then(res => {
                dispatch(songActions.setSearchSongs(res.data));
                dispatch(songActions.setError(false));
                dispatch(songActions.setLoading(false));
            })
            .catch(err => {
                console.log(err);
                dispatch(songActions.setError(true));
                dispatch(songActions.setLoading(false));
            })
    }
}

// request songs that are beeing rated by the specified user
// @param userId - the userId which rated songs are going to be search
export const fetchRatedSongs = (userId) => {
    return dispatch => {
        dispatch(songActions.setLoading(true));
        axios.get(`/user/ratedSongs/${userId}`)
            .then((res) => {
                dispatch(songActions.setRatedSongs(res.data));
                dispatch(songActions.setError(false));
                dispatch(songActions.setLoading(false));
            })
            .catch(err=>{
                console.log(err);
                dispatch(songActions.setError(true));
                dispatch(songActions.setLoading(false));
            });
    }
}

//request to save a rate to a song
//@param payload - it have songId, userId and rate given
export const rateSong = (payload) => {
    return dispatch => {
        dispatch(songActions.setLoading(true));
        axios.post(`/song/rate/${payload.songId}`, {userId: payload.userId, value: payload.rating})
            .then(res => {
                dispatch(songActions.setLoading(false));
                dispatch(songActions.setRateError(false));
                dispatch(songActions.setRateSuccess(true));
            })
            .catch(err => {
                dispatch(songActions.setLoading(false));
                dispatch(songActions.setRateError(true));
                dispatch(songActions.setRateSuccess(false));
            })
    }
}

//request to delete a song
//@param payload it have songId to be deleted
export const deleteSong = (payload) => {
    return dispatch => {
        dispatch(songActions.setLoading(true));
        axios.delete(`/song/${payload.songId}`)
            .then(res => {
                dispatch(songActions.setLoading(false));
                dispatch(songActions.setError(false));
                dispatch(fetchSongs());
            })
            .catch(err => {
                console.log(err)
                dispatch(songActions.setLoading(false));
                dispatch(songActions.setError(true));
            })
    }
}

export const songActions = songsSlice.actions;
export default songsSlice;
