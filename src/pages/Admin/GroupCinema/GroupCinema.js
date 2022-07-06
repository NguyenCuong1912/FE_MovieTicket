import React, { useEffect, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { layDanhSachCumRapAction, xoaCumRapAction } from '../../../redux/Actions/QuanLyCumRapAction';
import { PlusOutlined, EditOutlined, DeleteOutlined, CalendarOutlined } from '@ant-design/icons'
import { NavLink } from 'react-router-dom';
import { Table } from 'antd';
import { history } from '../../../App';
import { DOMAIN_STATIC_FILE } from '../../../utils/Settings/config';
export default function GroupCinema(props) {
    const dispatch = useDispatch();
    const { lstGroupCinemas } = useSelector(state => state.QuanLyCumRapReducer);
    useEffect(() => {
        dispatch(layDanhSachCumRapAction());
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
            title: 'Tên Cụm Rạp',
            dataIndex: 'groupName',
            width: '25%'
        },
        {
            title: 'Logo',
            dataIndex: 'logo',
            render: (text, cumRap) => {
                return <div style={{ width: 100, height: 100, backgroundSize: 'cover', backgroundPosition: 'center', backgroundImage: `url(${DOMAIN_STATIC_FILE}${cumRap.logo})` }}>
                    <img style={{ width: 100, height: 100, opacity: 1 }} src={`${DOMAIN_STATIC_FILE}${cumRap.logo}`} alt={cumRap.logo}
                        onError={({ currentTarget }) => {
                            currentTarget.onerror = null; // prevents looping
                            currentTarget.src = `https://picsum.photos/id/200/300`;
                        }}
                    />
                </div>
            },
            width: '15%'
        },
        {
            title: '',
            dataIndex: 'id',
            width: '20%',
            render: (text, cumRap) => {
                return <div className='flex justify-around items-center text-lg'>
                    <NavLink className='hover:text-2xl hover:text-blue-400 text-black'
                        to={`/Admin/GroupCinemas/Edit/${cumRap.id}`}>
                        <EditOutlined key={1} className='cursor-pointer' />
                    </NavLink>
                    <div onClick={() => {
                        if (window.confirm('Bạn có muốn xóa cụm rạp  ? ')) {
                            dispatch(xoaCumRapAction(cumRap.id))
                        }
                    }} className='hover:text-2xl hover:text-red-400 text-black'>
                        <DeleteOutlined key={2} className=' cursor-pointer' />
                    </div>

                </div>
            }
        },
    ];
    return (
        <Fragment>
            <h2 className='text-center my-4 text-2xl'>QUẢN LÝ CỤM RẠP CHIẾU</h2>
            <div className='mx-10 mb-5'>
                <button onClick={() => {
                    history.push('/Admin/GroupCinemas/Create');
                }} className='text-white bg-sky-500 flex items-center justify-center px-3 py-2'><PlusOutlined />Thêm Cụm Rạp</button>
            </div>
            <div className='mx-10'>
                <Table columns={columns} dataSource={lstGroupCinemas} rowKey='id' />
            </div>
        </Fragment>
    )
}