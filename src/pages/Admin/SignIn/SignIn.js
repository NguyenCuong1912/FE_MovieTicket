import React from 'react'
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { signIn } from '../../../redux/Actions/QuanLyNguoiDungAction';
import { HomeOutlined } from '@ant-design/icons';

export default function SignIn(props) {
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: values => {
            dispatch(signIn(values))
        },
    });
    return (
        <form onSubmit={formik.handleSubmit} className="w-full md:w-1/2 py-10 px-5 md:px-10">
            <div className="text-center mb-10">
                <h1 className="font-bold text-3xl text-gray-900">Đăng Nhập</h1>
            </div>
            <div>
                <div className="flex -mx-3">
                    <div className="w-full px-3 mb-5">
                        <label className="text-xs font-semibold px-1">Tài Khoản</label>
                        <div className="flex">
                            <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-email-outline text-gray-400 text-lg" /></div>
                            <input name='email' onChange={formik.handleChange} className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="Mời nhập email" />
                        </div>
                    </div>
                </div>
                <div className="flex -mx-3">
                    <div className="w-full px-3 mb-12">
                        <label className="text-xs font-semibold px-1">Mật khẩu</label>
                        <div className="flex">
                            <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-lock-outline text-gray-400 text-lg" /></div>
                            <input name='password' onChange={formik.handleChange} type="password" className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="************" />
                        </div>
                    </div>
                </div>
                <div className="flex -mx-3">
                    <div className="w-full px-3 mb-5">
                        <button type="submit" className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold">Đăng Nhập</button>
                    </div>

                </div>

                <div className=' text-center text- '>
                    <NavLink to='/signUp'>Bạn chưa có tài khoản ?</NavLink>
                    <p className='mb-3'>
                        <div>
                            <NavLink to='/'>Trang chủ</NavLink>
                        </div>
                    </p>

                </div>
            </div>
        </form>
    )
}
