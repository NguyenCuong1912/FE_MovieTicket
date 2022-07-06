import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import style from '../Checkout/Checkout.module.css'
import '../Checkout/Checkout.css'
import { Tabs } from 'antd';
import { CloseOutlined, UserOutlined, ArrowRightOutlined } from '@ant-design/icons';
import _ from 'lodash'
import moment from 'moment';
import { history } from '../../../App';
import { layDanhSachGheTheoLichChieu } from '../../../redux/Actions/QuanLySeatsAction';
import { DOMAIN_STATIC_FILE } from '../../../utils/Settings/config';
import { CHON_GHE, CLEAR_VE_DANG_CHON } from '../../../redux/Types/QuanLySeatsType';
import { danhSachVeTheoUserAction, datVe } from '../../../redux/Actions/QuanLyTicketAction';
import { SET_CHANGE_TABS } from '../../../redux/Types/QuanLyTicketType';
import Countdown from 'react-countdown';
import { Redirect } from 'react-router-dom';
import { RequirementCheckoutAction } from '../../../redux/Actions/QuanLyCheckoutAction';
function Checkout(props) {
    const dispatch = useDispatch();
    const { phongVe, listGheDangDat } = useSelector(state => state.QuanLySeatsReducer);
    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);
    const { lstGhe, film } = phongVe;
    const [state, setState] = useState('00:00:00');
    useEffect(() => {
        dispatch(layDanhSachGheTheoLichChieu(props.match.params.id));
        dispatch({
            type: CLEAR_VE_DANG_CHON
        })
        setState(Date.now() + 5 * 60 * 1000)
    }, [])

    const renderListGhe = () => {
        return lstGhe?.map((ghe, index) => {
            let classGheDaDat = ghe.bookded ? 'gheDaDat' : '';
            let classGheDangDat = '';
            let classGheBanDat = '';

            ghe.idUser === userLogin?.id ? classGheBanDat = 'gheBanDat' : classGheBanDat = '';
            let indexGhe = listGheDangDat.findIndex(gheDD => gheDD.seatName === ghe.seatName);
            indexGhe !== -1 ? classGheDangDat = 'gheDangDat' : classGheDangDat = '';
            return <Fragment key={index}>
                <button onClick={() => {
                    dispatch({
                        type: CHON_GHE,
                        gheDuocChon: ghe
                    })
                }} disabled={ghe.bookded} className={`ghe ${classGheDaDat} 
                ${classGheDangDat} ${classGheBanDat}   text-center`} >
                    {ghe.bookded ? (ghe.idUser === userLogin?.id ?
                        <UserOutlined style={{ marginBottom: 10, color: '#03a9f4' }} /> : <CloseOutlined style={{ marginBottom: 10 }} />) : ghe.seatName}
                </button>
                {(index + 1) % 16 === 0 ? <br /> : ""}
            </Fragment>
        })
    }
    return (
        <div className='grid grid-cols-12 h-screen'>
            <div className='container pt-5 col-span-9'>
                <div className='flex justify-between'>
                    <div className='flex'>
                        <img style={{ width: 50, height: 50, borderRadius: 50 }} src={`${DOMAIN_STATIC_FILE}${film?.imgFilm}`} alt={film?.imgFilm} />
                        <div className='ml-3'>
                            <h3 className='mb-0'>{film.groupName} - Rạp: {film.rapChieu}</h3>
                            <p className='mb-0 text-gray-500 font-bold opacity-50'>-{moment(film.showDate).format('DD/MM/YYYY hh:mm A')} </p>
                        </div>
                    </div>
                    <div>
                        <p className='mb-0 text-gray-500'>Thời gian giữ ghế</p>
                        <h2 className='mb-0 text-2xl text-center text-red-600'>{<Countdown onComplete={() => {
                            alert("Quá Thời gian đặt Vé")
                            dispatch({
                                type: CLEAR_VE_DANG_CHON
                            })
                            history.push('/')
                        }} daysInHours date={state} />}</h2>
                    </div>
                </div>
                <div>
                    <div className='h-2 w-full bg-black mt-3 opacity-80'></div>
                    <div id={style.trapezoid} >
                        <h4 className='pt-1 text-center text-black'>Màn hình</h4>
                    </div>
                    <div className='text-center' >
                        {renderListGhe()}
                    </div>

                </div>
                {/* table Màu */}
                <div className='mt-5'>
                    <table className="table-auto min-w-full text-center">
                        <thead>
                            <tr>
                                <th className='w-10 ' >Ghế Trống</th>
                                <th className='w-10'>Ghế Đã đặt</th>
                                <th className='w-10'>Ghế Bạn Đặt</th>
                                <th className='w-10'>Ghế bạn đang chọn</th>

                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className='ghe'></td>
                                <td className='gheDaDat'></td>
                                <td className='gheBanDat'></td>
                                <td className='gheDangDat'></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className={`col-span-3 px-9 pt-5 flex flex-col  ${style.shadow_right}`}>
                <div>
                    <div className='text-center text-2xl text-green-600 my-3'>
                        <span >{listGheDangDat.reduce((tong, ghe, index) => {
                            return tong += Number(ghe.price)
                        }, 0).toLocaleString()}đ</span>
                    </div>
                    <hr />

                    <div className='my-3'>
                        <h3>{film.nameFilm}</h3>
                        <p className='mb-1'>{film.groupName} - {film.rapChieu}</p>
                        <p className='mb-0'>{moment(film.showDate).format("DD/MM/YYYY hh:mm A")}</p>
                    </div>
                    <hr />
                    <div className='text-lg text-left grid grid-cols-5 my-3 '>
                        <div><span className='text-red-600  mb-0'>Ghế</span></div>
                        <div className='col-span-4'>
                            <span> {_.sortBy(listGheDangDat, ['seatName']).map((ghe, index) => {
                                return <span key={index}> {ghe.seatName}</span>
                            })}</span>
                        </div>

                    </div>
                    <hr />
                    <div className='my-3'>
                        <p className='mb-1 text-gray-500'>E-mail</p>
                        <p className='mb-0'>{userLogin.email}</p>
                    </div>
                    <hr />
                    <div className='my-3'>
                        <p className='mb-1 text-gray-500'>Phone</p>
                        <p className='mb-0'>{userLogin.phoneNumber}</p>
                    </div>
                    <hr />
                </div>
                <div onClick={() => {
                    if (JSON.stringify(listGheDangDat) !== '[]') {
                        const thongTinVeDat = {
                            userId: userLogin.id,
                            listTicket: listGheDangDat,
                            idShowTime: props.match.params.id
                        }
                        window.sessionStorage.setItem("STORE", JSON.stringify(thongTinVeDat));

                        let data = [];
                        let obj = {};
                        for (let index = 0; index < listGheDangDat.length; index++) {
                            obj.name = listGheDangDat[index].seatName
                            obj.sku = 'ticket'
                            obj.price = listGheDangDat[index].price * 1
                            obj.currency = 'USD'
                            obj.quantity = 1;
                            data.push(obj);
                        }
                        dispatch(RequirementCheckoutAction(data))

                    } else {
                        alert("Bạn cần chọn ghế ngồi ")
                    }

                }} className='mb-1 cursor-pointer'>
                    <div className='py-3 rounded bg-red-500 text-white text-lg text-center'>
                        ĐẶT VÉ
                    </div>

                </div>
            </div>

        </div>
    )
}

function KetQuaDatVe(props) {
    const dispatch = useDispatch();
    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);
    const { lstTicketWithUser } = useSelector(state => state.QuanLyTicketReducer);
    console.log("lst", lstTicketWithUser)
    useEffect(() => {
        dispatch(danhSachVeTheoUserAction(userLogin.id))
    }, [])
    const renderTicket = () => {
        return lstTicketWithUser?.map((ticket, index) => {
            return <div key={index} className="p-2 lg:w-1/3 md:w-1/2 w-full">
                <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                    <img className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src={`${DOMAIN_STATIC_FILE}${ticket.imgFilm}`} alt={ticket.imgFilm} />
                    <div className="flex-grow">
                        <h2 className="text-gray-900 title-font font-medium">{ticket.nameFilm}</h2>
                        <p className="text-gray-500">{ticket.groupName} - {ticket.cinemaName}</p>
                        <p className="text-gray-500">Ngày Chiếu: {moment(ticket.showDate).format("DD/MM/YYYY hh:mm A")}</p>
                        <p className="text-gray-500">Ngày đặt: {moment(ticket.lstTicket[0].createdAt).format(" DD/MM/YYYY ")}</p>
                        <p className="text-gray-500 text-base">Ghế : {ticket.lstTicket.map((soGhe, index) => {
                            return <span className='text-red-700' key={index}>{soGhe.seatName} </span>
                        })}</p>

                    </div>
                </div>
            </div>
        })
    }
    return (
        <div>
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-5 mx-auto">
                    <div className="flex flex-col text-center w-full mb-20">
                        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Kết Quả Đặt Vé</h1>
                    </div>
                    <div className="flex flex-wrap -m-2">
                        {renderTicket()}
                    </div>
                </div>
            </section>

        </div>
    )
}

export default function MenuTabs(props) {
    const { tabChange } = useSelector(state => state.QuanLyTicketReducer);
    const dispatch = useDispatch();
    const { TabPane } = Tabs;
    function callback(key) {
        dispatch({
            type: SET_CHANGE_TABS,
            number: key
        })
    }
    return (
        <div>
            <div className='ml-10  text-2xl'>
                <Tabs defaultActiveKey="1" activeKey={tabChange.toString()} centered onChange={callback} tabBarExtraContent={
                    <button onClick={() => {
                        dispatch({
                            type: SET_CHANGE_TABS,
                            number: 1
                        })
                        history.push('/home')
                    }} className='px-10 text-center text-base flex justify-center items-center hover:text-red-600 '>
                        <p className='m-0 mr-3'>Quay lại trang chủ</p>
                        <p className='m-0'><ArrowRightOutlined /></p>
                    </button>
                } >
                    <TabPane tab="Đặt Vé" key="1">
                        <Checkout {...props} />
                    </TabPane>
                    <TabPane tab="Kết Quả Đặt Vé" key="2">
                        <KetQuaDatVe {...props} />
                    </TabPane>

                </Tabs>
            </div>
        </div>
    )
}
