import React, { useEffect } from 'react'
import { Tabs } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from "yup";
import _ from 'lodash'
import moment from 'moment';
import { capNhatNguoiDungAction, layChiTietNguoiDungAction } from '../../../redux/Actions/QuanLyNguoiDungAction';
import { danhSachVeTheoUserAction } from '../../../redux/Actions/QuanLyTicketAction';
import { DOMAIN_STATIC_FILE } from '../../../utils/Settings/config';
import { Redirect } from 'react-router-dom';
export default function Profile(props) {
    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);
    if (JSON.stringify(userLogin) === '{}') {
        alert("Bạn cần đăng nhập")
        return <Redirect to='/home' />
    }
    const { TabPane } = Tabs;
    return (
        <div className='py-20 container '>
            <Tabs defaultActiveKey="1" centered>
                <TabPane tab="Thông tin cá nhân" key="1">
                    <DetailsProfile  {...props} />
                </TabPane>
                <TabPane tab="Lịch sử đặt vé" key="2">
                    <BookingHistory {...props} />
                </TabPane>
            </Tabs>
        </div>
    )
}

export function DetailsProfile(props) {
    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(layChiTietNguoiDungAction(userLogin.id))
    }, [])
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            type: userLogin?.typeUser?.type,
            email: userLogin.email,
            userName: userLogin.userName,
            avatar: userLogin.avatar,
            password: '',
            phoneNumber: userLogin.phoneNumber,
        },
        onSubmit: values => {
            dispatch(capNhatNguoiDungAction(userLogin.id, values))
        },
        validationSchema: Yup.object({
            userName: Yup.string()
                .required('Tài khoản Không được trống'),
            email: Yup.string()
                .email('Email chưa đúng định dạng')
                .required('Email không được trống'),
            password: Yup.string()
                .required('Mật khẩu Không được trống')
                .min(6, 'Bạn cần nhập ít nhất 6 kí tự')
                .max(9, 'Bạn cần nhập ít hơn 10 kí tự'),
            phoneNumber: Yup.string()
                .required('Số ĐT Không được trống'),
        }),
    });

    return (
        <div className='flex items-center justify-center'>
            <form onSubmit={formik.handleSubmit} className="w-full max-w-xl">
                <div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full  px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                                Email
                            </label>
                            <input name='email' disabled value={formik.values.email} onChange={formik.handleChange} className="appearance-none block w-full bg-gray-200 text-gray-700  rounded py-3 px-4 mb-3 leading-tight border border-gray-200 focus:outline-none focus:bg-white focus:border-gray-500" type="email" placeholder=" ...@gmail.com" />
                            {formik.errors.email && formik.touched.email && (
                                <p className='text-red-700 mb-0'>{formik.errors.email}</p>
                            )}

                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full  px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                                Tài khoản
                            </label>
                            <input name='userName' value={formik.values.userName} onChange={formik.handleChange} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="Tài Khoản" />
                            {formik.errors.userName && formik.touched.userName && (
                                <p className='text-red-700 mb-0'>{formik.errors.userName}</p>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full  px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                                Mật khẩu
                            </label>
                            <input name='password' value={formik.values.password} onChange={formik.handleChange} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type='password' />
                            {formik.errors.password && formik.touched.password && (
                                <p className='text-red-700 mb-0'>{formik.errors.password}</p>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full  px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                                Số điện thoại
                            </label>
                            <input name='phoneNumber' value={formik.values.phoneNumber} onChange={formik.handleChange} className="appearance-none block w-full bg-gray-200 text-gray-700  rounded py-3 px-4 mb-3 leading-tight border border-gray-200 focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="0962...." />
                            {formik.errors.phoneNumber && formik.touched.phoneNumber && (
                                <p className='text-red-700 mb-0'>{formik.errors.phoneNumber}</p>
                            )}
                        </div>
                    </div>
                </div>
                <div className='flex justify-center'>
                    <button type='submit' className='px-4 py-3 text-white text-base border   bg-blue-400 rounded'>Cập nhật</button>
                </div>
            </form>
        </div>
    )
}

export function BookingHistory(props) {
    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);
    const { lstTicketWithUser } = useSelector(state => state.QuanLyTicketReducer);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(danhSachVeTheoUserAction(userLogin.id))
    }, [])

    const renderTicket = () => {
        return lstTicketWithUser.map((ticket, index) => {
            return <li key={index} className="flex flex-col py-4 sm:flex-row sm:justify-between">
                <div className="flex w-full space-x-2 sm:space-x-4">
                    <div style={{ backgroundImage: `url(${DOMAIN_STATIC_FILE}${ticket.imgFilm})`, backgroundSize: 'cover', backgroundPosition: 'center' }} >
                        <img className="flex-shrink-0 object-cover w-20 h-20 border-transparent rounded outline-none sm:w-32 sm:h-32 bg-coolGray-500 opacity-0" src={`${DOMAIN_STATIC_FILE}${ticket.imgFilm}`} alt={ticket.tenPhim} />
                    </div>

                    <div className="flex flex-col justify-between text-base ">
                        <span>{`Tên phim : ${ticket.nameFilm} `}</span>
                        <span>{`Tên Rạp : ${ticket.groupName} / ${ticket.cinemaName}`}</span>
                        <span>{`Ngày đặt : ${moment(_.head(ticket.lstTicket).createdAt).format('DD-MM-YYYY HH:mm A')}`} </span>
                        <span>{`Ngày Chiếu : ${moment(ticket.showDate).format('DD-MM-YYYY HH:mm A')}`} </span>
                        <span>Ghế số : {ticket.lstTicket.map((ghe, index) => {
                            return <span className='mr-2 text-red-600' key={index}>
                                {ghe.seatName}
                            </span>
                        })}</span>
                    </div>
                </div>
            </li>
        })
    }
    return (
        <div className='flex items-center justify-around'>
            <div className="flex  flex-col max-w-3xl p-6 space-y-4 sm:p-10 bg-coolGray-50 text-coolGray-800">
                <ul className="flex  flex-col divide-y divide-coolGray-300">
                    {renderTicket()}
                </ul>


            </div>

        </div>
    )
}