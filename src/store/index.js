import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth";
import songsSlice from "./songs";

// configure store to expose auth.js and song.js to others
const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        song: songsSlice.reducer
    }
})

export default store;
