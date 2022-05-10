import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import './index.css';
import { Button, Layout, Menu, Image } from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
    LogoutOutlined,
} from '@ant-design/icons';
import { Routes, Route, Link } from 'react-router-dom';
import Dashboard from '../Dashboard';
import Class from '../Class/Class.jsx';
import FaultPage from '../faultPage';
import Chat from '../Chat';
import Tasks from '../Tasks';
import Project from '../Project';

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}

const instructorItems = [
    getItem(<Link to='/'>Dashboard</Link>, '1', <PieChartOutlined />),
    getItem(<Link to='/Class'>Class</Link>, '2', <DesktopOutlined />),
    getItem(<Link to='/Groups'>Groups</Link>, '3', <UserOutlined />),
    getItem(<Link to='/Projects'>Projects</Link>, '4', <TeamOutlined />),
    getItem(<Link to='/Tasks'>Tasks</Link>, '5', <FileOutlined />),
    getItem(<Link to='/Chat'>Chat</Link>, '6', <FileOutlined />),
];

const studentItems = [
    getItem(<Link to='/'>Dashboard</Link>, '1', <PieChartOutlined />),
    getItem(<Link to='/Project'>Project</Link>, '4', <TeamOutlined />),
    getItem(<Link to='/Tasks'>Tasks</Link>, '5', <FileOutlined />),
    getItem(<Link to='/Chat'>Chat</Link>, '6', <FileOutlined />),
];

export default function Navbar() {
    const [collapsed, setCollapsed] = useState(false);
    const { logout, currentUser } = useAuth();
    console.log(currentUser);
    const items = currentUser.instructor ? instructorItems : studentItems;
    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={() => setCollapsed(!collapsed)}
            >
                <Image
                    className='logo'
                    src={process.env.PUBLIC_URL + '/logo_transparent.png'}
                    preview={false}
                />
                <Menu
                    theme='dark'
                    defaultSelectedKeys={['1']}
                    mode='inline'
                    items={items}
                >
                    <Menu.Item>
                        <Button type='primary' onClick={logout}>
                            Sign Out
                        </Button>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className='site-layout'>
                <Content
                    style={{
                        margin: '0 16px',
                    }}
                >
                    <div
                        className='site-layout-background'
                        style={{
                            padding: 24,
                            minHeight: 360,
                        }}
                    >
                        <Routes>
                            <Route path='/' element={<Dashboard />} />
                            <Route path='/Class' element={<Class />} />
                            <Route path='/Chat' element={<Chat />} />
                            <Route path='/Tasks' element={<Tasks />} />
                            <Route path='/Project' element={<Project />} />
                            <Route path='*' element={<FaultPage />} />
                        </Routes>
                    </div>
                </Content>
                {/* <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                    Project Tracker ©2022 Created by{' '}
                    <a href='https://github.com/Ultra8Bits'>Ultra8Bits </a>
                </Footer> */}
            </Layout>
        </Layout>
    );
}