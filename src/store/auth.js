import {createSlice} from "@reduxjs/toolkit";
import axios from "../axios";

const initialState = {
    token: null,
    username: null,
    error: false
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        authSuccess(state, action) {
          state.token = action.payload.token;
        },
        login(state, action) {
            const {token, expiresIn: expiration} = action.payload;
            state.token = token;
            state.error = false;
            localStorage.setItem("token", token);
            const expirationDate = new Date(new Date().getTime() + expiration * 1000);
            localStorage.setItem("expiration_date", expirationDate);
        },
        logout(state) {
            state.token = null;
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
        axios.post(`/auth/${isLogin ? "login" : "signup"}`, {
            username:
            payload.username, password: payload.password
        })
            .then(res => {
                console.log(res.data)
                setTimeout(() => {
                    dispatch(authActions.logout());
                }, res.data.expiresIn)
                dispatch(authActions.login(res.data));
            })
            .catch(err => {
                dispatch(authActions.error(err));
            });
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem("token");
        if (!token) {
            dispatch(authActions.logout());
        } else {
            const expirationDate = new Date(localStorage.getItem("expiration_date"));
            if (expirationDate <= new Date()) {
                dispatch(authActions.logout());
            } else {
                dispatch(authActions.authSuccess({token}))
            }
        }
    }
}

export const authActions = authSlice.actions;
export default authSlice;


