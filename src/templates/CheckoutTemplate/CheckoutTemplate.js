import { Fragment, useEffect } from 'react';
import { Route } from 'react-router'
import { Redirect } from 'react-router-dom'

const CheckoutTemplate = (props) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    })
    const { Component, ...resRoute } = props;
    if (!sessionStorage.getItem("USER_LOGIN")) {
        return <Redirect to='/signIn' />
    }
    return <Route {...resRoute} render={(propsRoute) => {
        return <Fragment>
            <Component {...propsRoute} />
        </Fragment>
    }} />
}
export default CheckoutTemplate;