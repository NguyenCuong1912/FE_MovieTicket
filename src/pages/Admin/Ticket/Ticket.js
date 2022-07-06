import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Table } from 'antd';
import { quanLyTicketServices } from '../../../services/QuanLyTicketServices';
import moment from 'moment';
import { layChiTietNguoiDungAction } from '../../../redux/Actions/QuanLyNguoiDungAction';
export default function Ticket(props) {
    const [state, setState] = useState({ lstTicket: [] });
    const dispatch = useDispatch();
    const { userEdit } = useSelector(state => state.QuanLyNguoiDungReducer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
        const { id } = props.match.params;
        try {
            const result = await quanLyTicketServices.danhSachVeTheoUser(id);
            if (result.status === 200) {
                await setState({
                    ...state, lstTicket: result.data
                })
            }
        } catch (error) {
            console.log(error)
        }
        dispatch(layChiTietNguoiDungAction(id))
    }, [])
    const columns = [
        {
            title: 'Mã Lịch Chiếu',
            dataIndex: 'idShowTime',
        },
        {
            title: 'Tên Phim',
            dataIndex: 'nameFilm',
        },
        {
            title: 'Cụm Rạp',
            dataIndex: 'groupName',
        },
        {
            title: 'Rạp',
            dataIndex: 'cinemaName',
        },
        {
            title: 'Phòng',
            dataIndex: 'roomName',
        },
        {
            title: 'Lịch Chiếu',
            dataIndex: 'showDate',
            render: (record, text) => {
                return <p>{moment(text).format("DD/MM/YYYY hh:mm A")}</p>
            }
        },
        {
            title: 'Ghế',
            dataIndex: 'lstTicket',
            render: (record, text) => {
                return record.map((ghe, index) => {
                    return <span key={index}>{ghe.seatName}  </span>
                })
            }
        }
    ];
    return (
        <div>
            <h3 className='text-center my-4 text-2xl'>Thông Tin Đặt Vé Của {userEdit.userName}  </h3>
            <Table dataSource={state.lstTicket} columns={columns} rowKey='idShowTime' />;
        </div>
    )
}
