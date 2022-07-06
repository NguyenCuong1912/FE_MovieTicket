import React from 'react'
import { Spin } from 'antd';
import { useSelector } from 'react-redux';
import { Fragment } from 'react';
export default function Loading(props) {
    const { isLoading } = useSelector(state => state.LoadingReducer)
    return (
        <Fragment>
            {isLoading ? '' : <div style={{ width: '100%', height: '100%', position: 'absolute', backgroundColor: 'rgba(0,0,0,.8)', }}>
                <div style={{ position: 'absolute', top: '50%', left: '50%' }}>
                    <Spin size='large' />
                </div>
            </div>}

        </Fragment>
    )
}
