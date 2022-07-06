import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { layDanhSachPhongAction, xoaPhongAction } from '../../../redux/Actions/QuanLyPhongAction';
import { Table, Button, Input } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { history } from './../../../App';
import { NavLink } from 'react-router-dom';
export default function Room(props) {
    const dispatch = useDispatch();
    const { lstPhong } = useSelector(state => state.QuanLyPhongReducer);
    useEffect(() => {
        dispatch(layDanhSachPhongAction());
    }, [])
    const columns = [
        {
            title: 'Mã Phòng',
            dataIndex: 'id',
            sorter: (a, b) => a.id - b.id,
            defaultSortOrder: 'descend',
            width: "20%",
            key: 'id'
        },
        {
            title: 'Tên Phòng',
            dataIndex: 'roomName',
            width: '20%'
        },
        {
            title: 'Thuộc Rạp',
            dataIndex: 'cinema_room',
            render: (text, room) => {
                return <p>{text.name}</p>
            },
            width: '20%'
        },
        {
            title: 'Số lượng ghế',
            dataIndex: 'maxSeat',
            width: '20%'
        },
        {
            title: '',
            dataIndex: 'id',
            render: (text, room) => {
                return <div className='flex justify-around items-center text-lg'>
                    <NavLink className='hover:text-2xl hover:text-blue-400 text-black' to={`/Admin/Rooms/Edit/${room.id}`}>
                        <EditOutlined key={1} className='cursor-pointer' />
                    </NavLink>
                    <div onClick={() => {
                        if (window.confirm('Bạn có muốn xóa Phòng ? ')) {
                            dispatch(xoaPhongAction(room.id))
                        }
                    }} className='hover:text-2xl hover:text-red-400 text-black' >
                        <DeleteOutlined key={2} className=' cursor-pointer' />
                    </div>

                </div>
            },
            width: '20%',
            key: 'action'
        },
    ];
    const { Search } = Input;
    const onSearch = value => {
        dispatch(layDanhSachPhongAction(value));
    };
    return (
        <div className='mt-5'>
            <h2 className='text-center my-4 text-2xl'>QUẢN LÝ PHÒNG</h2>
            <div className='my-3 mx-10 flex justify-between' >
                <Button onClick={() => { history.push('/Admin/Rooms/Create') }}>
                    <div className='text-base flex justify-center items-center' >
                        <PlusOutlined className='mr-2' />
                        Thêm Phòng
                    </div>
                </Button>
                <Search placeholder="Nhập tên phòng" enterButton="Search" onSearch={onSearch} style={{ width: 400 }} />

            </div>
            <Table columns={columns} dataSource={lstPhong} rowKey='id' />
        </div>
    )
}
