import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LayDanhSachLoaiNguoiDungAction, xoaLoaiNguoiDungAction } from './../../../redux/Actions/QuanLyLoaiNguoiDungAction';
import { Table, Button, Input } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { history } from './../../../App';
import { NavLink } from 'react-router-dom';
export default function TypeUser(props) {
    const { lstType } = useSelector(state => state.QuanLyLoaiNguoiDungReducer);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(LayDanhSachLoaiNguoiDungAction());
    }, [])
    const columns = [
        {
            title: 'Mã',
            dataIndex: 'id',
            sorter: (a, b) => a.id - b.id,
            defaultSortOrder: 'descend',
            width: "10%",
            key: 'id'
        },
        {
            title: 'Loại Tài Khoản',
            dataIndex: 'type',
            width: '20%'
        },
        {
            title: 'Tên Loại',
            dataIndex: 'nameType',
            width: '20%'
        },
        {
            title: '',
            dataIndex: 'id',
            render: (text, userType) => {
                return <div className='flex justify-around items-center text-lg'>
                    <NavLink className='hover:text-2xl hover:text-blue-400 text-black' to={`/Admin/TypeUsers/Edit/${userType.id}`}>
                        <EditOutlined key={1} className='cursor-pointer' />
                    </NavLink>
                    <div onClick={() => {
                        if (window.confirm('Bạn có muốn xóa Loại Người Dùng ? ')) {
                            dispatch(xoaLoaiNguoiDungAction(userType.id))
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
    return (
        <div className='mt-5'>
            <h2 className='text-center my-4 text-2xl'>QUẢN LÝ LOẠI NGƯỜI DÙNG</h2>
            <div className='my-3 mx-10 flex justify-between' >
                <Button onClick={() => { history.push('/Admin/TypeUsers/Create') }}>
                    <div className='text-base flex justify-center items-center' >
                        <PlusOutlined className='mr-2' />
                        Thêm
                    </div>
                </Button>

            </div>
            <Table columns={columns} dataSource={lstType} rowKey='id' />
        </div>
    )
}
