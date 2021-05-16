import React, { Fragment } from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import Layout from "./components/Layout/Layout";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import Profile from "./pages/Profile";
import RankPage from "./pages/RankPage";
import {useSelector} from "react-redux";

const App = () => {

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
                <RankPage/>
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
