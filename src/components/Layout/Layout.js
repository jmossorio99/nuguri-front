import React, {Fragment} from 'react';
import Header from "./Header";

// Wrapper component for the application
const Layout = (props) => {
    return (
        <Fragment>
            <Header />
            <main>{props.children}</main>
        </Fragment>
    );
};

export default Layout;
