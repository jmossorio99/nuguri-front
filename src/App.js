import React, {Fragment, useEffect, Suspense} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import Layout from "./components/Layout/Layout";
import HomePage from "./pages/HomePage/HomePage";
import AuthPage from "./pages/AuthPage";
import {useDispatch, useSelector} from "react-redux";
import {authCheckState} from "./store/auth";
import Spinner from './components/UI/Spinner/Spinner';

const Profile = React.lazy(()=>import("./pages/Profile"));
const RatePage = React.lazy(()=>import("./pages/RatePage/RatePage"));

const App = () => {

    // call an action of redux
    const dispatch = useDispatch();

    // When state changed call authCheckState to check authentication state (token exist or not in localstorage)
    useEffect(() => {
        dispatch(authCheckState());
    }, [dispatch])

    // Save store.auth value of token in this local variable
    const isLoggedIn = useSelector(state => state.auth.token !== null);

    const loggedInRoutes = (
        <Fragment>
            <Suspense fallback={<Spinner />}>
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
            </Suspense>
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
