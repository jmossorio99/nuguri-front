import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import Profile from "./pages/Profile";
import RankPage from "./pages/RankPage";

const App = () => {
    return (
        <Layout>
            <Switch>
                <Route path={"/"} exact>
                    <HomePage />
                </Route>
                <Route path={"/auth"}>
                    <AuthPage />
                </Route>
                <Route path={"/profile"}>
                    <Profile />
                </Route>
                <Route path={"/rank"}>
                    <RankPage />
                </Route>
                <Route path={"*"}>
                    <Redirect to={"/"} />
                </Route>
            </Switch>
        </Layout>
    );
};

export default App;
