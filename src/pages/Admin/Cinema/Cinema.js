import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { layDanhSachRapChieuAction } from '../../../redux/Actions/QuanLyRapChieuAction';
import { Table, Button, Input } from 'antd';
import _ from 'lodash'
import { PlusOutlined, EditOutlined, DeleteOutlined, CalendarOutlined } from '@ant-design/icons'
import { history } from './../../../App';
import { NavLink } from 'react-router-dom';
import { DOMAIN_STATIC_FILE } from '../../../utils/Settings/config';
import { xoaRapChieuAction } from './../../../redux/Actions/QuanLyRapChieuAction';
export default function Cinema(props) {
    const { lstRapChieu } = useSelector(state => state.QuanLyRapChieuReducer);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(layDanhSachRapChieuAction());
    }, [])
    const columns = [
        {
            title: 'Mã Rạp',
            dataIndex: 'id',
            sorter: (a, b) => a.id - b.id,
            defaultSortOrder: 'descend',
            width: "10%",
            key: 'id'
        },
        {
            title: 'Logo',
            dataIndex: 'logo',
            render: (text, rap) => {
                return <div style={{ width: 100, height: 100, backgroundSize: 'cover', backgroundPosition: 'center', backgroundImage: `url(${DOMAIN_STATIC_FILE}${rap.logo})` }}>
                    <img style={{ width: 100, height: 100, opacity: 0 }} src={`${DOMAIN_STATIC_FILE}${rap.logo}`} alt={rap.logo}
                        onError={({ currentTarget }) => {
                            currentTarget.onerror = null; // prevents looping
                            currentTarget.src = `https://picsum.photos/id/200/300`;
                        }}
                    />
                </div>
            },
            width: "15%",
            key: 'logo'
        },
        {
            title: 'Tên Rạp',
            dataIndex: 'name',
            render: (text, rap) => {
                return <p>
                    {_.truncate(rap.name, { length: '30', separator: '.' })}
                </p>
            },
            width: '15%'
        },
        {
            title: 'Thuộc Cụm Rạp',
            dataIndex: 'group',
            render: (text, rap) => {
                return <p>
                    {_.truncate(rap.group.groupName, { length: '30', separator: '.' })}
                </p>
            },
            width: '15%'
        },
        {
            title: 'Địa điểm',
            dataIndex: 'address',
            render: (text, rap) => {
                return <p>
                    {_.truncate(rap.address, { length: '40', separator: '.' })}
                </p>
            },
            width: '25%',
            key: 'tenPhim'
        },
        {
            title: '',
            dataIndex: 'id',
            render: (text, rap) => {
                return <div className='flex justify-around items-center text-lg'>
                    <NavLink className='hover:text-2xl hover:text-blue-400 text-black' to={`/Admin/Cinemas/Edit/${rap.id}`}>
                        <EditOutlined key={1} className='cursor-pointer' />
                    </NavLink>
                    <div onClick={() => {
                        if (window.confirm('Bạn có muốn xóa Rạp Chiếu ? ')) {
                            dispatch(xoaRapChieuAction(rap.id))
                        }
                    }} className='hover:text-2xl hover:text-red-400 text-black' >
                        <DeleteOutlined key={2} className=' cursor-pointer' />
                    </div>

                </div>
            },
            width: '10%',
            key: 'action'
        },
    ];
    const { Search } = Input;
    const onSearch = value => {
        dispatch(layDanhSachRapChieuAction(value));
    };
    return (
        <div className='mt-5'>
            <h2 className='text-center my-4 text-2xl'>QUẢN LÝ RẠP CHIẾU</h2>
            <div className='my-3 mx-10 flex justify-between' >
                <Button onClick={() => { history.push('/Admin/Cinemas/Create') }}>
                    <div className='text-base flex justify-center items-center' >
                        <PlusOutlined className='mr-2' />
                        Thêm Rạp
                    </div>
                </Button>
                <Search placeholder="Nhập tên rạp chiếu" enterButton="Search" onSearch={onSearch} style={{ width: 400 }} />

            </div>
            <Table columns={columns} dataSource={lstRapChieu} rowKey='id' />
        </div>
    )
}
