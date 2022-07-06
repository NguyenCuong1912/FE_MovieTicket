
import { Fragment, useEffect } from 'react';
import { Route } from 'react-router'
import Header from './Header/Header';
import Footer from './Footer/Footer';

export const UserTemplate = (props) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    })
    const { Component, ...resRoute } = props;
    return <Route {...resRoute} render={(propsRoute) => {
        return <Fragment>
            <Header {...propsRoute} />
            <Component {...propsRoute} />
            <Footer {...propsRoute} />
        </Fragment>
    }} />
}