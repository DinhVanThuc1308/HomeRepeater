import { Space, Table, Modal } from 'antd';
import eye from '../Table/assets/Icon/eye.png';
import edit from '../Table/assets/Icon/Edit.png';
import deleteIcon from '../Table/assets/Icon/Vector.png';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axiosInstance from '../../shared/services/http-client.js';

import { Button, Input, Select, Checkbox } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import './style.css';

const options = [
  {
    value: 'Name',
    label: 'Name',
  },
  {
    value: 'Email',
    label: 'Email',
  },
];

const options2 = [
  {
    value: 'All',
    label: 'All',
  },
  {
    value: false,
    label: 'Active',
  },
  {
    value: true,
    label: 'Inactive',
  },
];
const fakeData = [
  {
    id: 1,
    name: 'Product A',
    deviceInfo: '12v 30A',
    customer: 'Customer X',
    status: 'Active',
    createdTime: '2023-09-23 10:00:00',
    public: true, // Giá trị checkbox cho cột "public"
    isGateway: false, // Giá trị checkbox cho cột "is gateway"
  },
  {
    id: 2,
    name: 'Product B',
    deviceInfo: '24v 40A',
    customer: 'Customer Y',
    status: 'Inactive',
    createdTime: '2023-09-22 14:30:00',
    public: false,
    isGateway: true,
  },
  {
    id: 3,
    name: 'Product C',
    deviceInfo: '18v 35A',
    customer: 'Customer Z',
    status: 'Active',
    createdTime: '2023-09-21 16:45:00',
    public: true,
    isGateway: true,
  },
  // Thêm các hàng dữ liệu thực tế của bạn ở đây
];



function App() {
  const [data, setData] = useState(fakeData);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');
  const [TypeSearch, setTypeSearch] = useState('Name');
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [deletingItemId, setDeletingItemId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [totalItems, setTotalItems] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [detailedInfo, setDetailedInfo] = useState(null);



  const handleOpenModal = (user) => {
    setDetailedInfo(user);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleDelete = async (id) => {
    setDeletingItemId(id);
    setConfirmModalVisible(true);
  };

  const handleConfirmDelete = async () => {
    await axiosInstance.delete(`users/${deletingItemId}`);
    setDeletingItemId(null);
    setConfirmModalVisible(false);
    callApi();
  };

  const handleCancelDelete = () => {
    setDeletingItemId(null);
    setConfirmModalVisible(false);
  };

  const callApi = async () => {
    let params = {
      'pagination[page]': currentPage,
      'pagination[pageSize]': pageSize,
    };

    if (search === 'All') {
      params = '';
    } else if (status === true) {
      params['filters[blocked][$eq]'] = status;
    } else if (status === false) {
      params['filters[blocked][$eq]'] = status;
    }

    if (TypeSearch === 'Name') {
      params['filters[fullname][$contains]'] = search;
    } else if (TypeSearch === 'Email') {
      params['filters[email][$contains]'] = search;
    }

    const response = await axiosInstance.get('users', {
      params: params,
    });

    console.log(response);

    const users = response.data.map(user => ({
      id: user.id,
      name: user.fullname,
      deviceInfo: user.deviceInfo,
      customer: user.customer,
      status: user.blocked === true ? 'Inactive' : 'Active',
    }));

    setData([...users]);
    setTotalItems(response.meta.pagination.total);
  };

  useEffect(() => {
    callApi();
  }, []);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      console.log(`Searching for "${search}"...`);
      // Call your search function here
      callApi();
    }, 2000);

    // Clear timeout if the component is unmounted
    return () => clearTimeout(debounceTimer);
  }, [search, status, pageSize, currentPage]);

  const columns = [
    {
      title: '#',
      dataIndex: 'id',
    },
    {
      title: 'Thời gian tạo',
      dataIndex: 'createdTime',
      key: 'createdTime',
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Thông tin thiết bị',
      dataIndex: 'deviceInfo',
      key: 'deviceInfo',
    },
    {
      title: 'Khách hàng',
      dataIndex: 'customer',
      key: 'customer',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Public',
      dataIndex: 'public',
      key: 'public',
      render: (text, user) => (
        <Checkbox checked={text} disabled />
      ),
    },
    {
      title: 'Is Gateway',
      dataIndex: 'isGateway',
      key: 'isGateway',
      render: (text, user) => (
        <Checkbox checked={text} disabled />
      ),
    },
    {
      title: 'Action',
      key: 'action',
      dataIndex: 'action',
      render: (text, user) => (
        <Space key={user.id} size="middle">
          <button
            style={{ border: 'none', backgroundColor: '#fff' }}
            onClick={() => handleOpenModal(user)}
          >
            <img src={eye} alt="" style={{ width: '14.05px', height: '16.03px' }} />
          </button>
          <Link to={`/GarageOwner/update/${user.id}`}>
            <img src={edit} alt="" />
          </Link>
          <button
            style={{ border: 'none', backgroundColor: '#fff' }}
            className="btn_xoa"
            onClick={() => handleDelete(user.id)}
          >
            <img src={deleteIcon} alt="" />
          </button>
        </Space>
      ),
    },
  ];


  return (
    <div style={{ marginTop: 0 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1 style={{ fontFamily: 'Poppins', fontSize: 20 }}>
          Devices
        </h1>
        <Button
          style={{
            backgroundColor: '#8767E1',
            width: '120px',
            color: '#fff',
            height: '42px',
            margin: '0 20px',
          }}
          className="custom-button"
        >
          <Link to="/devices/add_device">Add Devices</Link>
        </Button>
      </div>
      <div className="div">
        <Space
          direction="vertical"
          size="middle"
          className="UI_search"
          style={{ paddingBottom: '70px', height: '48px' }}
        >
          <span>
            <Space.Compact style={{ width: '500px' }} size="large">
              <Select
                defaultValue="Name"
                onChange={value => setTypeSearch(value)}
                options={options}
                onClick={() => {
                  callApi();
                }}
                style={{ width: '30%' }}
                size="large"
              />
              <Input
                placeholder="Search"
                suffix={<SearchOutlined />}
                style={{ width: '70%' }}
                value={search}
                onChange={e => setSearch(e.target.value)}
                size="large"
              />
            </Space.Compact>
            <Select
              defaultValue="All"
              onChange={value => setStatus(value)}
              options={options2}
              style={{ marginLeft: '10px', width: '150px' }}
              size="large"
            />
          </span>
        </Space>
        <Table columns={columns} dataSource={data} pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: totalItems,
          onChange: (page, pageSize) => {
            setCurrentPage(page);
          },
        }} />
      </div>
      <Modal
        visible={confirmModalVisible}
        onOk={handleConfirmDelete}
        onCancel={handleCancelDelete}
        okText="Confirm"
        cancelText="Cancel"
        centered
      >
        <p>Are you sure you want to delete this item?</p>
      </Modal>
      <Modal
        title="Thông tin chi tết"
        visible={isModalVisible}
        onCancel={handleCloseModal}
        footer={null}
        // set w h chiếm 70% màn hình
        width="70%"
        height="70%"
        centered


      >
        {/* Modal content */}
        {detailedInfo && (
          <div>
            <p>Tên sản phẩm: {detailedInfo.name}</p>
            <p>Thông tin thiết bị: {detailedInfo.deviceInfo}</p>
            <p>Khách hàng: {detailedInfo.customer}</p>
            <p>Status: {detailedInfo.status}</p>
            <p>Thời gian tạo: {detailedInfo.createdTime}</p>
            <p>Public: {detailedInfo.public ? 'Có' : 'Không'}</p>
            <p>Is Gateway: {detailedInfo.isGateway ? 'Có' : 'Không'}</p>
            {/* Add other fields here */}
          </div>
        )}
      </Modal>

    </div>
  );
}

export default App;
