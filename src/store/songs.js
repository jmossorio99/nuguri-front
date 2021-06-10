import {createSlice} from "@reduxjs/toolkit";
import axios from "../axios";

const initialState = {
    songs: [],
    error: false,
    loading: false,
    rateSuccess: false,
    rateError: false
}

const songsSlice = createSlice({
    name: "songs",
    initialState,
    reducers: {
        setSongs(state, action) {
            state.songs = action.payload;
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
        }
    }
});

export const fetchSongs = () => {
    return dispatch => {
        dispatch(songActions.setLoading(true));
        axios.get("/song")
            .then(res => {
                console.log(res.data);
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

export const songActions = songsSlice.actions;
export default songsSlice;
