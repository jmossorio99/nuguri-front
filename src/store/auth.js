import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    token: null,
    expiration: null,
    username: null,
    error: false
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login(state, action) {
            const {token, expiresIn: expiration} = action.payload;
            state.token = token;
            state.expiration = expiration;
            state.error = false;
            localStorage.setItem("token", token);
            const expirationDate = new Date(new Date().getTime() + expiration * 1000);
            localStorage.setItem("expiration_date", expirationDate.toISOString());
        },
        logout(state) {
            state.token = null;
            state.expiration = null;
            state.error = false;
            localStorage.removeItem("token");
            localStorage.removeItem("expiration_date");
        },
        error(state, action) {
            state.error = action.payload;
        }
    }
});

export const sendAuthRequest = (payload) => {
    const isLogin = payload.isLogin;
    return (dispatch) => {
        axios.post(`http://localhost:8080/auth/${isLogin ? "login" : "signup"}`, {
            username:
            payload.username, password: payload.password
        })
            .then(res => {
                // setTimeout(() => {
                //     dispatch(authActions.logout());
                // }, res.data.expiration)
                dispatch(authActions.login(res.data));
            })
            .catch(err => {
                dispatch(authActions.error(err));
            });
    };
};

export const authActions = authSlice.actions;
export default authSlice;


