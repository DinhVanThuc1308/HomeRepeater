import { Space, Table, Modal } from 'antd';
import eye from '../Table/assets/Icon/eye.png';
import edit from '../Table/assets/Icon/Edit.png';
import deleteIcon from '../Table/assets/Icon/Vector.png';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axiosInstance from '../../shared/services/http-client.js';

import { Button, Input, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import './style.css';

const fakeData = [
  {
    id: 1,
    name: 'John Doe',
    email: 'johndoe@example.com',
    phoneNumber: '123-456-7890',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'janesmith@example.com',
    phoneNumber: '987-654-3210',
    status: 'Inactive',
  },
  // Thêm các hàng dữ liệu giả khác ở đây
];

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

function App() {
  const [data, setData] = useState(fakeData);

  // const [data, setData] = useState([]);
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

  const handleOpenModal = (info) => {
    setDetailedInfo(info);
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

    const users = response.map(user => ({
      id: user.id,
      name: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
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
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Action',
      key: 'action',
      dataIndex: 'action',
      render: (text, user) => (
        <Space key={user.id} size="middle">
          <button onClick={() => handleOpenModal(
            user.id,
            user.name,
            user.email,
            user.phoneNumber,
            user.status,
          )

          }>
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
          All Garage Owner
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
          <Link to="/GarageOwner/create">Add Owner</Link>
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
        title="Detailed Information"
        visible={isModalVisible}
        onCancel={handleCloseModal}
        footer={null}
      >
        {/* Modal content */}
        {detailedInfo && (
          <div>
            <p>Name: {detailedInfo.name}</p>
            <p>Email: {detailedInfo.email}</p>
            <p>Phone number: {detailedInfo.phoneNumber}</p>
            <p>Status: {detailedInfo.status}</p>

            {/* Add other fields here */}
          </div>
        )}
      </Modal>
    </div>
  );
}

export default App;
