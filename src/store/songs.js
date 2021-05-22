import {createSlice} from "@reduxjs/toolkit";
import axios from "../axios";

const initialState = {
    songs: [],
    error: false,
    loading: false
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

export const songActions = songsSlice.actions;
export default songsSlice;
