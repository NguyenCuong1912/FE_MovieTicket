import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import { history } from '../../../../App'
import { useDispatch } from 'react-redux';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import _ from 'lodash';
import { SIGN_OUT } from '../../../../redux/Types/QuanLyNguoiDungType';
import styles from './Header.module.css'
export default function Header(props) {
    const userLogin = JSON.parse(sessionStorage.getItem("USER_LOGIN"));
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
                        <span className='mr-3'>{userLogin.userName}</span>    <DownOutlined />
                    </a>
                </Dropdown>

            </div>
            }
        </div>
    }
    return (
        <nav className=" border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800 text-coolGray-800 fixed z-10 w-full bg-black bg-opacity-40">
            <div className="lg:container flex flex-wrap justify-between items-center mx-auto">
                <NavLink to='/home' className="flex items-center">
                    <img src="tix.png" className={`mr-3 h-6 sm:h-9 ${styles.logo}`} alt="Logo" />
                </NavLink>
                <div>
                    <button onClick={() => {
                        const targetEl = document.getElementById('mobile_menu');
                        const targetBtn = document.getElementById('rs_btn');
                        // targetEl.style.display === 'block' ? targetEl.style.display = "none" : targetEl.style.display = 'block';
                        if (targetEl.style.display === 'block') {
                            targetEl.style.display = "none"
                            targetBtn.style.display = 'none'
                        } else {
                            targetEl.style.display = 'block'
                            targetBtn.style.display = 'none'

                        }
                    }} data-collapse-toggle="mobile_menu" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-white rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2  dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile_menu"
                        targetEl='#mobile_menu' aria-expanded="false">
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



    )
}
