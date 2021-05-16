import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import headphonesIcon from "../../assets/headphones-icon.svg";
import addUser from "../../assets/addUser.png";
import {sendAuthRequest} from "../../store/auth";
import classes from "./AuthForm.module.css";

const AuthForm = () => {

    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState("");
    const [usernameError, setUsernameError] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    const error = useSelector(state => state.auth.error);
    const formIsValid = !passwordError && !usernameError;
    const dispatch = useDispatch();

    const usernameChangeHandler = (event) => {
        const newValue = event.target.value;
        setUsername(newValue);
        setUsernameError(newValue.trim().length < 3);
    }

    const passwordChangeHandler = (event) => {
        const newValue = event.target.value;
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
        setIsLogin(prevState => !prevState);
    }

    return (
        <section className={classes.auth}>
            {isLogin ? <img src={headphonesIcon} /> : <img src={addUser} />}
            <h1>{isLogin ? "Login" : "Sign Up"}</h1>
            {error && <p>Please check your credentials</p>}
            <form>
                <div className={classes.control}>
                    <label htmlFor="username">Username</label>
                    <input type={"text"} id={"username"} requried value={username} onChange={usernameChangeHandler}
                    placeholder={"Username"}/>
                    {usernameError && <p>Username must be at least 3 characters long</p>}
                </div>
                <div className={classes.control}>
                    <label htmlFor={"password"}>Password</label>
                    <input type={"password"} id={"password"} required value={password}
                           onChange={passwordChangeHandler} placeholder={"Password"}/>
                    {passwordError && <p>Password must be at least 8 characters long</p>}
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
            </form>
        </section>
    );
};

export default AuthForm;
