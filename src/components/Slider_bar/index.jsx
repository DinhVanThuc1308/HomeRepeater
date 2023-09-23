import React from 'react';
import './Slider_bar.css';
import { matchPath } from 'react-router-dom';

// Create Owner

import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { useState } from 'react';

// import img của slider bar
import sb_img from '../Slider_bar/asset/img/sb_img.png';

import { Link } from 'react-router-dom';

import { useLocation } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

const Slide_bar = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState('1');
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const location = useLocation();

  React.useEffect(() => {
    const OwnerSTR = 'GarageOwner';
    // const ManageSTR = 'GarageManage';
    // const ServiceSTR = 'GarageService';

    if (location.pathname.includes(OwnerSTR)) {
      setSelectedMenu('1');
    }

  }, [location.pathname]);
  return (
    <Layout>
      <Sider
        theme="light"
        className="Slide_bar"
        trigger={null}
        collapsible
        collapsed={collapsed}>

        <Link to="/"><p className="Slider_text">Menu</p></Link>


        <Menu
          className="sb_item"
          theme="light"
          mode="inline"
          defaultSelectedKeys={[]}
          selectedKeys={[selectedMenu]}
          onSelect={({ key }) => setSelectedMenu(key)}
          items={[
            {
              key: '1',
              icon: <img src={sb_img}></img>,
              label: <Link to="/">Devices</Link>,
            },

          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed),
            }
          )}

        </Header>

        <Content
          style={{
            margin: '24px 16px',
            // padding: 24,
            minHeight: 280,
            background:
              selectedMenu === '2' ||
                selectedMenu === '3' ||
                selectedMenu === '4'
                ? '#e6e6e6'
                : colorBgContainer,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};
export default Slide_bar;
