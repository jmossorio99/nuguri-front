import React, {Fragment, useEffect} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import Layout from "./components/Layout/Layout";
import HomePage from "./pages/HomePage/HomePage";
import AuthPage from "./pages/AuthPage";
import Profile from "./pages/Profile";
import RatePage from "./pages/RatePage/RatePage";
import {useDispatch, useSelector} from "react-redux";
import {authCheckState} from "./store/auth";

const App = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(authCheckState());
    }, [dispatch])

    const isLoggedIn = useSelector(state => state.auth.token !== null);

    const loggedInRoutes = (
        <Fragment>
            <Route path={"/"} exact>
                <HomePage/>
            </Route>
            <Route path={"/profile"}>
                <Profile/>
            </Route>
            <Route path={"/rank"}>
                <RatePage/>
            </Route>
            <Route path={"*"}>
                <Redirect to={"/"}/>
            </Route>
        </Fragment>
    );

    const loggedOutRoutes = (
        <Fragment>
            <Route path={"/auth"}>
                <AuthPage/>
            </Route>
            <Route path={"*"}>
                <Redirect to={"/auth"}/>
            </Route>
        </Fragment>
    );

    return (
            <Layout>
                <Switch>
                    {isLoggedIn ? loggedInRoutes : loggedOutRoutes}
                </Switch>
            </Layout>
    );
};

export default App;
