import React, { useEffect } from 'react'
import { CheckCircleOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { datVe } from './../../redux/Actions/QuanLyTicketAction';


export default function Checkout_Success(props) {
    const dispatch = useDispatch();
    useEffect(() => {
        const data = JSON.parse(sessionStorage.getItem("STORE"))
        dispatch(datVe(data))
    }, [])
    return (
        <div className='text-center'>
            <div className='my-9 flex justify-center'>
                <CheckCircleOutlined style={{ fontSize: '100px', color: 'green' }} />

            </div>
            <p className='text-2xl'>Thanh Toán Thành Công</p>
            <NavLink to='/' className='text-xl text-yellow-300 '>Quay lại trang trang chủ
            </NavLink>
        </div>
    )
}
