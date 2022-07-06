import React, { useEffect } from 'react'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';


export default function Checkout_Error(props) {
    useEffect(() => {
        sessionStorage.removeItem("STORE")
    }, [])
    return (
        <div className='text-center'>
            <div className='my-9 flex justify-center'>
                <ExclamationCircleOutlined style={{ fontSize: '100px', color: 'red' }} />

            </div>
            <p className='text-2xl'>Thanh Toán Thất Bại</p>
            <NavLink to='/' className='text-xl text-yellow-300 '>Quay lại trang trang chủ
            </NavLink>
        </div>
    )
}
