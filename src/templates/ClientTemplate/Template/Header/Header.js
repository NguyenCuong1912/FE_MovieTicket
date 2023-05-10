import { DownOutlined, QqOutlined, SearchOutlined } from '@ant-design/icons';
import { Dropdown, Menu } from 'antd';
import { useFormik } from 'formik';
import _ from 'lodash';
import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { history } from '../../../../App';
import { timKiemPhimAction } from '../../../../redux/Actions/QuanLyPhimAction';
import { SIGN_OUT } from '../../../../redux/Types/QuanLyNguoiDungType';
import styles from './Header.module.css';

export default function Header(props) {
    const [open, setOpen] = useState(false)
    const userLogin = JSON.parse(sessionStorage.getItem("USER_LOGIN"));
    const { lstSearchPhim } = useSelector(state => state.QuanLyPhimReducer);
    const dispatch = useDispatch();
    const menu = (
        <Menu>
            <Menu.Item key="0">
                <NavLink to='/Profile'>Thông tin cá nhân</NavLink>
            </Menu.Item>
            <Menu.Item key='1'>
                <NavLink onClick={() => { dispatch({ type: SIGN_OUT }) }} to='/home'>Đăng xuất</NavLink>
            </Menu.Item>
        </Menu>
    );

    const handleLogin = () => {
        return <div className={`${styles.rs_btn}`} id='rs_btn'>
            {_.isEmpty(userLogin) ? <div className="items-center  flex-shrink-0  lg:flex">
                <button onClick={() => { history.push('/signIn') }} className={`${styles.rs_header} self-center px-6 py-3 rounded hover:bg-violet-600 text-white`}>Đăng Nhập</button>
                <button onClick={() => { history.push('/signUp') }} className={`${styles.rs_header} self-center px-6 py-3 font-semibold rounded hover:bg-violet-600 text-white`}>Đăng Kí</button>
            </div> : <div className="items-center  justify-center flex-shrink-0 hidden lg:flex text-white">
                <Dropdown overlay={menu} trigger={['click']}>
                    <a className="ant-dropdown-link text-white" onClick={e => e.preventDefault()}>
                        <span className='mr-3'>{userLogin.userName}</span><DownOutlined />
                    </a>
                </Dropdown>
                {
                    userLogin?.typeUser.type !== "CLIENT" ?
                        <div className='mb-0 ml-3 text-xl flex justify-center items-center'>
                            <p className='mb-0'><QqOutlined /></p>
                            <NavLink style={isActive => ({
                                color: isActive ? "white" : "white"
                            })} to='/Admin/Home' >Quản lý</NavLink>
                        </div> : <Fragment></Fragment>
                }
            </div>

            }
        </div>
    }


    const formik = useFormik({
        initialValues: {
            tenPhim: '',
        },
        onSubmit: values => {
            if (values.tenPhim === '') {
                setOpen(false)
            } else {
                setOpen(true);
                dispatch(timKiemPhimAction(values.tenPhim));
            }
        },
    });

    return (
        <div style={{
            position: 'fixed',
            zIndex: '10',
        }} className='relative'>


            <nav className=" border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800 text-coolGray-800 fixed z-10 w-full bg-black bg-opacity-40">
                <div className="lg:container flex flex-wrap justify-between items-center mx-auto">
                    <NavLink to='/home' className="flex items-center">
                        <img src="tix.png" className={`mr-3 h-6 sm:h-9 ${styles.logo}`} alt="Logo" />
                    </NavLink>

                    <div className='w-1/4 ml-2'>
                        <form onSubmit={formik.handleSubmit} className='w-full'>
                            <div className='flex'>
                                {/* <Search placeholder="Nhập tên phim" onSearch={onSearch} enterButton /> */}
                                <input name='tenPhim' onChange={formik.handleChange} className="w-4/5 -ml-10 pl-10 pr-3 py-2 rounded-l-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="Nhập tên phim" />
                                <button type="submit" className="block text-2xl flex items-center justify-center w-1/5 max-w-xs bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-r-lg font-semibold"><SearchOutlined /></button>
                            </div>
                        </form>
                    </div>
                    <div>
                        <button onClick={() => {
                            const targetel = document.getElementById('mobile_menu');
                            const targetBtn = document.getElementById('rs_btn');
                            // targetel.style.display === 'block' ? targetel.style.display = "none" : targetel.style.display = 'block';
                            if (targetel.style.display === 'block') {
                                targetel.style.display = "none"
                                targetBtn.style.display = 'none'
                            } else {
                                targetel.style.display = 'block'
                                targetBtn.style.display = 'none'

                            }
                        }} data-collapse-toggle="mobile_menu" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-white rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2  dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile_menu"
                            targetel='#mobile_menu' aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" /></svg>
                            <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                        </button>
                    </div>

                    <div className="hidden w-full md:block md:w-auto  lg:flex " id="mobile_menu">
                        <ul className="md:flex justify-center items-center h-full mb-0 mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
                            <li>
                                <NavLink to='/home' className={`${styles.rs_header} block py-2 pr-4 pl-3  bg-blue-700 rounded md:bg-transparent text-white md:p-0 dark:text-white" aria-current="page" activeClassName='text-yellow-700`} >Trang Chủ</NavLink>
                            </li>
                            <li>
                                <NavLink to='/GroupCinema' className={`${styles.rs_header} block py-2 pr-4 pl-3 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 text-white md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700" activeClassName='text-blue-700`}>Cụm Rạp</NavLink>
                            </li>
                        </ul>

                    </div>
                    {handleLogin()}
                </div>
            </nav>
            <div style={{
                position: 'absolute',
                top: 0,
                left: window.innerWidth * 0.22,
            }} className='grid grid-cols-5'>
                <div className='col-start-2 ml-6 '>
                    {open === true ? <div className='absolute top-20 z-50 bg-black rounded-md'>
                        {lstSearchPhim.length > 0 ?
                            lstSearchPhim.map((item, index) => {
                                return (
                                    <div className='w-56 my-4 ml-10 cursor-pointer text-white hover:text-yellow-400 hover:accent-pink-500' key={index}
                                        onClick={() => { history.push(`/DetailsFilm/${item.id}`) }}
                                    >
                                        {item.nameFilm}
                                    </div>
                                )
                            }
                            ) : <div className='w-56 my-4 ml-10 cursor-pointer text-yellow-400 font-bold'>Không tìm thấy phim</div>}
                    </div> : ''}
                </div>
            </div>

        </div>

    )
}
