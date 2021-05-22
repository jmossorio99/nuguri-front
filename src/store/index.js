import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth";
import songsSlice from "./songs";

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        song: songsSlice.reducer
    }
})

export default store;
