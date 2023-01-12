import React from 'react'
import { useFormik } from 'formik';
import * as Yup from "yup";
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { signUp } from './../../../redux/Actions/QuanLyNguoiDungAction';

export default function SignUp() {
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            phoneNumber: '',
            userName: ''
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .required("Không được trống !")
                .email("Chưa đúng định dạng email"),
            phoneNumber: Yup.string()
                .matches(/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/, {
                    message: "Số điện thoại chưa đúng",
                    excludeEmptyString: false,
                })
                .required("Không được trống !"),
            password: Yup.string()
                .min(6, "Tối thiểu 6 kí tự")
                .required("Không được trống !"),
            userName: Yup.string()
                .required("Không được trống !"),
        }),
        onSubmit: values => {
            dispatch(signUp(values, 1))
        },
    });
    return (
        <form onSubmit={formik.handleSubmit} className="w-full md:w-1/2 py-10 px-5 md:px-10">
            <div className="text-center mb-10">
                <h1 className="font-bold text-3xl text-gray-900">Đăng Kí</h1>
            </div>
            <div>
                {/* userName */}
                <div className="flex -mx-3">
                    <div className="w-full px-3 mb-2">
                        <label className="text-xs font-semibold px-1">Tài Khoản</label>
                        <div className="flex">
                            <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-email-outline text-gray-400 text-lg" /></div>
                            <input name='userName' onChange={formik.handleChange} className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="Mời nhập tài khoản" />
                        </div>
                        {formik.errors.userName && formik.touched.userName && (
                            <p className='m-0 mt-1 text-red-600'>{formik.errors.userName}</p>
                        )}
                    </div>
                </div>
                {/* email */}
                <div className="flex -mx-3">
                    <div className="w-full px-3 mb-2">
                        <label className="text-xs font-semibold px-1">Email</label>
                        <div className="flex">
                            <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-email-outline text-gray-400 text-lg" /></div>
                            <input name='email' type='email' onChange={formik.handleChange} className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="Mời nhập email" />
                        </div>
                        {formik.errors.email && formik.touched.email && (
                            <p className='m-0 mt-1 text-red-600'>{formik.errors.email}</p>
                        )}
                    </div>
                </div>
                {/* password */}
                <div className="flex -mx-3">
                    <div className="w-full px-3 mb-2">
                        <label className="text-xs font-semibold px-1">Mật Khẩu</label>
                        <div className="flex">
                            <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-email-outline text-gray-400 text-lg" /></div>
                            <input name='password' onChange={formik.handleChange} type="password" className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="************" />
                        </div>
                        {formik.errors.password && formik.touched.password && (
                            <p className='m-0 mt-1 text-red-600'>{formik.errors.password}</p>
                        )}
                    </div>
                </div>
                {/* phoneNumber */}
                <div className="flex -mx-3">
                    <div className="w-full px-3 mb-2">
                        <label className="text-xs font-semibold px-1">Số điện thoại</label>
                        <div className="flex">
                            <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-email-outline text-gray-400 text-lg" /></div>
                            <input name='phoneNumber' onChange={formik.handleChange} className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="Mời nhập số điện thoại" />
                        </div>
                        {formik.errors.phoneNumber && formik.touched.phoneNumber && (
                            <p className='m-0 mt-1 text-red-600'>{formik.errors.phoneNumber}</p>
                        )}
                    </div>
                </div>
                <div className="flex -mx-3">
                    <div className="w-full px-3 mb-5">
                        <button type="submit" className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold">Đăng Kí</button>
                    </div>

                </div>
                <div className='text-center '>
                    <NavLink to='/signIn'>Bạn đã có tài khoản ?</NavLink>
                </div>
            </div>
        </form>
    )
}
