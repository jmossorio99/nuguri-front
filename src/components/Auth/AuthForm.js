import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import headphonesIcon from "../../assets/headphones-icon.svg";
import addUser from "../../assets/addUser.png";
import {sendAuthRequest} from "../../store/auth";
import classes from "./AuthForm.module.css";
import Spinner from "../UI/Spinner/Spinner";

const AuthForm = () => {

    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState("");
    const [usernameError, setUsernameError] = useState(true);
    const [usernameTouched, setUsernameTouched] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState(true);
    const [passwordTouched, setPasswordTouched] = useState(false);
    const error = useSelector(state => state.auth.error);
    const isLoading = useSelector(state => state.auth.isLoading);
    const formIsValid = !passwordError && !usernameError;
    const dispatch = useDispatch();

    const usernameChangeHandler = (event) => {
        const newValue = event.target.value;
        setUsernameTouched(true);
        setUsername(newValue);
        setUsernameError(newValue.trim().length < 3);
    }

    const passwordChangeHandler = (event) => {
        const newValue = event.target.value;
        setPasswordTouched(true);
        setPassword(newValue);
        setPasswordError(newValue.trim().length < 8);
    }

    const submitHandler = (event) => {
        event.preventDefault()
        const payload = {
            isLogin,
            username,
            password
        }
        dispatch(sendAuthRequest(payload));
    }

    const toggleAuthModeHandler = () => {
        setUsernameTouched(false);
        setPasswordTouched(false);
        setUsername("");
        setUsernameError(true);
        setPassword("");
        setPasswordError(true);
        setIsLogin(prevState => !prevState);
    }

    return (
        <section className={classes.auth}>
            <h1>Welcome to SongRanker</h1>
            {isLogin ? <img src={headphonesIcon} alt={"logo"} /> : <img src={addUser} alt={"logo"} />}
            <h1>{isLogin ? "Login" : "Sign Up"}</h1>
            {error && <p>Please check your credentials</p>}
            {isLoading ? <Spinner /> : <form>
                <div className={classes.control}>
                    <label htmlFor="username">Username</label>
                    <input type={"text"} id={"username"} required value={username} onChange={usernameChangeHandler}
                           placeholder={"Username"} autoComplete={"off"}/>
                    {usernameError && usernameTouched && <p>Username must be at least 3 characters long</p>}
                </div>
                <div className={classes.control}>
                    <label htmlFor={"password"}>Password</label>
                    <input type={"password"} id={"password"} required value={password}
                           onChange={passwordChangeHandler} placeholder={"Password"}/>
                    {passwordError && passwordTouched && <p>Password must be at least 8 characters long</p>}
                </div>
                <div className={classes.actions}>
                    <button onClick={submitHandler} disabled={!formIsValid}>
                        {isLogin ? "Login" : "Create Account"}</button>
                    <button
                        type={"button"}
                        className={classes.toggle}
                        onClick={toggleAuthModeHandler}>
                        {isLogin ? "Create new account" : "Login with existing account"}
                    </button>
                </div>
            </form>}
        </section>
    );
};

export default AuthForm;
