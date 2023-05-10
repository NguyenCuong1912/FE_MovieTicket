import {
    CalendarOutlined,
    ClusterOutlined,
    DesktopOutlined,
    DownOutlined,
    HomeOutlined,
    ShopOutlined,
    UserOutlined,
    VideoCameraOutlined,
    WomanOutlined
} from '@ant-design/icons';
import { Dropdown, Layout, Menu, } from 'antd';
import Cookies from 'js-cookie';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { Route } from "react-router";
import { NavLink, Redirect } from 'react-router-dom';
import { SIGN_OUT } from '../../../redux/Types/QuanLyNguoiDungType';
const { Sider, Header } = Layout;
export default function Template(props) {
    const [collapsed, setCollapsed] = useState(false);
    const userLogin = JSON.parse(sessionStorage.getItem("USER_LOGIN"));
    const dispatch = useDispatch();
    if (!Cookies.get('cookieUser')) {
        sessionStorage.removeItem('USER_LOGIN');
        alert("Bạn đã hết phiên cần đăng nhập lại");
        history.push(`/signIn`)
    }
    useEffect(() => {
        window.scrollTo(0, 0);
    })
    const onCollapse = collapsed => {
        setCollapsed(collapsed);
    };
    if (!userLogin || JSON.stringify(userLogin) === '{}') {
        alert("Bạn cần đăng nhập để thực hiện chức năng");
        return <Redirect to='/signIn' />
    }
    if (userLogin.typeUser.type === "CLIENT") {
        alert("Bạn Không có quyền để truy cập trang Web này ");
        return <Redirect to='/' />
    }
    const menu = (
        <Menu>
            <Menu.Item key="0">
                <NavLink to={`/Profile`}>Cập nhật thông tin</NavLink>
            </Menu.Item>
            <Menu.Item key="1">
                <NavLink onClick={() => {
                    Cookies.remove('cookieUser')
                    dispatch({
                        type: SIGN_OUT
                    })
                }} to='/signIn'>Đăng xuất</NavLink>
            </Menu.Item>
        </Menu>
    );
    const { Component, ...resRoute } = props;

    return <Route {...resRoute} render={(propsRoute) => {
        return <Fragment>
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                    <div className="logo" />
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1" icon={<HomeOutlined />}>
                            <NavLink to='/Admin/Home'>Dashboard</NavLink>
                        </Menu.Item>
                        <Menu.Item key="2" icon={<UserOutlined />}>
                            <NavLink to='/Admin/Users'>Tài Khoản</NavLink>
                        </Menu.Item>
                        <Menu.Item key="3" icon={<ClusterOutlined />}>
                            <NavLink to='/Admin/GroupCinemas'>Cụm Rạp</NavLink>
                        </Menu.Item>
                        <Menu.Item key="4" icon={<ShopOutlined />}>
                            <NavLink to='/Admin/Cinemas'>Rạp Chiếu</NavLink>
                        </Menu.Item>
                        <Menu.Item key="5" icon={<DesktopOutlined />}>
                            <NavLink to='/Admin/Rooms'>Phòng</NavLink>
                        </Menu.Item>
                        <Menu.Item key="6" icon={<VideoCameraOutlined />}>
                            <NavLink to='/Admin/Films'>Phim</NavLink>
                        </Menu.Item>
                        <Menu.Item key="7" icon={<CalendarOutlined />}>
                            <NavLink to='/Admin/ShowTimes'>Lịch Chiếu</NavLink>
                        </Menu.Item>
                        <Menu.Item key="8" icon={<WomanOutlined />}>
                            <NavLink to='/Admin/TypeUsers'>Loại Người Dùng</NavLink>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background " style={{ padding: 0, height: '45px' }} >
                        <div className="flex justify-end items-center h-full px-10 cursor-pointer">
                            <Dropdown overlay={menu} trigger={['click']} >
                                <span className="ant-dropdown-link text-white" onClick={e => e.preventDefault()}>
                                    {userLogin.userName}  <DownOutlined />
                                </span>
                            </Dropdown>
                            <div className='ml-3'>
                                <NavLink to='/' style={isActive => ({
                                    color: isActive ? "white" : "white"
                                })}>Về trang Home</NavLink>
                            </div>
                        </div>
                    </Header>
                    <Component {...propsRoute} />
                </Layout>
            </Layout>
        </Fragment>
    }} />
}
