import {createSlice} from "@reduxjs/toolkit";
import axios from "../axios";
import jwt_decode from "jwt-decode";

const initialState = {
    token: null,
    username: null,
    role: null,
    error: false,
    userId: null,
    isLoading: false
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        authSuccess(state, action) {
            const decodedToken = jwt_decode(action.payload.token);
            state.username = decodedToken.username;
            state.role = decodedToken.role;
            state.userId = decodedToken._id;
            state.token = action.payload.token;
            state.error = false;
        },
        login(state, action) {
            const {token, expiresIn: expiration} = action.payload;
            const decodedToken = jwt_decode(token);
            state.username = decodedToken.username;
            state.role = decodedToken.role;
            state.userId = decodedToken._id;
            state.token = token;
            state.error = false;
            localStorage.setItem("token", token);
            const expirationDate = new Date(new Date().getTime() + expiration * 1000);
            localStorage.setItem("expiration_date", expirationDate);
        },
        logout(state) {
            state.token = null;
            state.username = null;
            state.role = null;
            state.userId = null;
            state.error = false;
            localStorage.removeItem("token");
            localStorage.removeItem("expiration_date");
        },
        error(state, action) {
            state.error = action.payload;
        },
        setIsLoading(state, action) {
            state.isLoading = action.payload;
        }
    }
});

export const sendAuthRequest = (payload) => {
    const isLogin = payload.isLogin;
    return (dispatch) => {
        dispatch(authActions.setIsLoading(true));
        const userData = {
            username: payload.username,
            password: payload.password
        }
        if (!isLogin) {
            userData["role"] = "user";
        }
        axios.post(`/auth/${isLogin ? "login" : "signup"}`, userData)
            .then(res => {
                dispatch(authActions.setIsLoading(false));
                console.log(res.data)
                setTimeout(() => {
                    dispatch(authActions.logout());
                }, res.data.expiresIn)
                dispatch(authActions.login(res.data));
            })
            .catch(err => {
                dispatch(authActions.setIsLoading(false));
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


