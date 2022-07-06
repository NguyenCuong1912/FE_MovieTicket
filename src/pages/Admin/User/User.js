/* eslint-disable react/jsx-pascal-case */
import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Input, Popconfirm, message, Button } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, LockOutlined, UnlockOutlined } from '@ant-design/icons'
import { layDanhSachnguoiDungAction, lockAndUnLockAction, xoaNguoiDungAction } from './../../../redux/Actions/QuanLyNguoiDungAction';
import { NavLink } from 'react-router-dom';
import { history } from '../../../App';
import Export_Excel from './../../../components/Excel/Export_Excel';
export default function User(props) {
    const { listUser } = useSelector(state => state.QuanLyNguoiDungReducer);
    const confirm = (id, status) => {
        if (status === 'Unlock') {
            dispatch(lockAndUnLockAction(id, { isBlock: 0 }))
        } else {
            dispatch(lockAndUnLockAction(id, { isBlock: 1 }));
        }

    }
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(layDanhSachnguoiDungAction());
    }, [])
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            sorter: (a, b) => a.id - b.id,
            defaultSortOrder: 'descend',
            width: '10%'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            width: '20%'

        },
        {
            title: 'Tên',
            dataIndex: 'userName',
            width: '20%'
        },
        {
            title: 'Số Điện Thoại',
            dataIndex: 'phoneNumber',
            width: '15%'
        },
        {
            title: 'Quyền',
            dataIndex: 'typeUser',
            render: (text, user) => {
                return <p>{user.type_user.type}</p>
            },
            width: '10%'
        },
        {
            title: 'Trạng Thái',
            dataIndex: 'isBlock',
            render: (text, user) => {
                if (user.isBlock) {
                    return <Popconfirm placement="top" title='Bạn có muốn mở khóa tài khoản này ?' onConfirm={() => { confirm(user.id, 'Unlock') }} okText="Yes" cancelText="No">
                        <div className='hover:text-green-500 cursor-pointer'><LockOutlined style={{ fontSize: 20 }} /></div>
                    </Popconfirm>
                } else {
                    return <Popconfirm placement="top" title='Bạn có muốn  khóa tài khoản này ?' onConfirm={() => { confirm(user.id, 'lock') }} okText="Yes" cancelText="No">
                        <div className='hover:text-yellow-400 cursor-pointer'><UnlockOutlined style={{ fontSize: 20 }} /></div>
                    </Popconfirm>

                }
            },
            width: '10%'
        },
        {
            title: '',
            dataIndex: 'id',
            width: '15%',
            render: (text, user) => {
                return <div className='flex justify-around items-center text-lg'>
                    <NavLink className='hover:text-2xl hover:text-blue-400 text-black'
                        to={`/Admin/Users/Edit/${user.id}`}>
                        <EditOutlined key={1} className='cursor-pointer' />
                    </NavLink>
                    <div onClick={() => {
                        if (window.confirm('Bạn có muốn xóa người dùng ? ')) {
                            dispatch(xoaNguoiDungAction(user.id));
                        }
                    }} className='hover:text-2xl hover:text-red-400 text-black' >
                        <DeleteOutlined key={2} className=' cursor-pointer' />
                    </div>
                </div>
            }
        },
    ];
    const onSearch = value => {
        dispatch(layDanhSachnguoiDungAction(value));
    };
    const { Search } = Input;
    const dataExport = listUser.map((user) => {
        if (user.isActive) {
            return {
                Tên: user.userName,
                Email: user.email,
                Phone: user.phoneNumber,
                Trạng_Thái: user.isBlock === true ? "Khóa" : "Hoạt Động",
                Loại_Tai_Khoản: user.type_user.nameType
            }
        }
    })
    return (
        <Fragment>
            <h2 className='text-center my-4 text-2xl'>QUẢN LÝ TÀI KHOẢN</h2>
            <div className='mx-10 mb-5 flex justify-between'>
                <button onClick={() => {
                    history.push('/Admin/Users/Create');
                }} className='text-white bg-sky-500 flex items-center justify-center px-3 py-2'><PlusOutlined />Thêm Tài Khoản</button>

                <Export_Excel csvData={dataExport} fileName={"user"} />

            </div>
            <div className='mx-36 my-3'>
                <Search placeholder="Nhập tên người dùng" onSearch={onSearch} enterButton />
            </div>
            <div className='mx-10'>
                <p className='text-red-500 mx-5'>* Nhấn 2 lần vào tên người dùng để xem lịch sử đặt vé</p>
                <Table onRow={(record, rowIndex) => {
                    return {
                        onDoubleClick: event => { history.push(`/Admin/Tickets/${record.id}`) }, // double click row
                    };
                }}
                    columns={columns} dataSource={listUser} rowKey='id' />
            </div>
        </Fragment>
    )
}
