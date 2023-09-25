import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Input, Select, DatePicker, Checkbox } from 'antd';
import binicon from './Vector.svg';
import styles from './styles.module.css';
import { Option } from 'antd/es/mentions';
import { useState } from 'react';
import { message } from 'antd';
import { useEffect } from 'react';
import createOwnerAPI from '../../shared/api/createOwnerAPI';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function CreateOwner() {
  const nav = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullname: '',
      DeviceInfo: '',
      customer: '',
      public: '',
      isGetway: '',
      status: '',

    },
  });

  // notification
  const [messageApi, contextHolder] = message.useMessage();
  const key = 'updatable';
  const openMessageErr = () => {
    messageApi.open({
      key,
      type: 'loading',
      content: 'Loading...',
    });
    setTimeout(() => {
      messageApi.open({
        key,
        type: 'error',
        content: 'Fail! Please try again! ',
        duration: 2,
      });
    }, 1000);
  };
  const openMessageAuke = () => {
    messageApi.open({
      key,
      type: 'loading',
      content: 'Loading...',
    });
    setTimeout(() => {
      messageApi.open({
        key,
        type: 'success',
        content: 'Success! You have created a new owner! ',
        duration: 2,
      });
    }, 1000);

    setTimeout(() => {
      nav('/');
    }, 2000);
  };



  const onSubmit = data => {
    data.dob = data.dob.format('YYYY-MM-DD');
    data.garages = checkedBoxes;
    console.log(data);
    createOwner(data);
  };

  //  call api garage list from api and push it to garageList
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredGarages, setFilteredGarages] = useState([]);
  useEffect(() => {
    // axiosInstance.get(`garages`).then(res => {
    //   setGarageList(res.data);
    // });
    const fetchGarageList = async () => {
      try {
        let params = {};
        params['filters[$or][1][name][$contains]'] = searchTerm;
        const res = await createOwnerAPI.getGarageList(params);
        setFilteredGarages(res.data);
      } catch (error) {
        console.log('Failed to fetch garage list: ', error);
      }
    };
    // Set up a timeout variable
    const debounceTimer = setTimeout(() => {
      console.log(`Searching for "${searchTerm}"...`);
      // Call your search function here
      fetchGarageList();
    }, 2000);

    // Clear timeout if the component is unmounted
    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);
  console.log('list', filteredGarages);



  // chosse garage
  const [checkedBoxes, setCheckedBoxes] = useState([]);



  // Post data to API
  const createOwner = async data => {
    try {
      const res = await createOwnerAPI.postUserData(data);
      openMessageAuke();
      console.log(res);
      console.log(res.data);
    } catch (error) {
      openMessageErr();
    }
  };

  return (
    <>
      <div
        style={{ width: '100%', backgroundColor: '#f8f5f5', padding: '10px' }}
      >
        <h3 style={{ fontFamily: 'Poppins', fontSize: 20 }}>
          <span
            style={{ fontFamily: 'Poppins', fontSize: '23', color: '#cacaca' }}
          >
            All Devices &gt;
          </span>{' '}
          Add a devices{' '}
        </h3>
      </div>
      <div className={styles['create-form']}>
        {contextHolder}
        <form
          action=""
          onSubmit={handleSubmit(onSubmit)}
          className={styles['form-container']}
        >
          <div className={styles['form-row']}>
            <div className={styles['row-item']}>
              <label htmlFor="" className={styles['title-label']}>
                Tên sản phẩm <span style={{ color: 'red' }}>*</span>{' '}
              </label>
              <Controller
                name="fullname"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Input
                    {...field}
                    style={{ width: '100%' }}
                    size="large"
                    placeholder="Nhập vào tên thiết bị"
                  />
                )}
              />
              {errors.fullname && (
                <p style={{ color: 'red' }}>Chưa nhập tên thiết bị</p>
              )}
            </div>
            <div className={styles['row-item']}>
              <label htmlFor="" className={styles['title-label']}>
                Thông tin thiết bị <span style={{ color: 'red' }}>*</span>{' '}
              </label>
              <Controller
                name="DeviceInfo"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Input
                    size="large"
                    {...field}
                    placeholder="Nhập vào thông tin thiết bị"
                  />
                )}
              />
              {errors.DeviceInfo && (
                <p style={{ color: 'red' }}>
                  Chưa nhập thông tin thiết bị
                </p>
              )}
            </div>
            <div className={styles['row-item']}>
              <label htmlFor="" className={styles['title-label']}>
                Khách hàng <span style={{ color: 'red' }}>*</span>{' '}
              </label>
              <Controller
                name="customer"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Input
                    size="large"
                    {...field}
                    placeholder="Nhập vào tên khách hàng"
                  />
                )}
              />
              {errors.customer && (
                <p style={{ color: 'red' }}>
                  Chưa nhập tên khách hàng
                </p>
              )}
            </div>
          </div>




          <div className={styles['form-row']}>
            <div className={styles['row-item']}>
              <label htmlFor="" className={styles['title-label']}>
                Public<span style={{ color: 'red' }}>*</span>{' '}
              </label>
              <Controller
                name="public"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    size="large"
                    placeholder="Chọn trạng thái"
                    allowClear
                  >
                    <Option value={1}>Có</Option>
                    <Option value={2}>không</Option>
                  </Select>
                )}
              />
              {errors.public && (
                <p style={{ color: 'red' }}>
                  Chưa lựa chọn trạng thái
                </p>
              )}
            </div>
            <div className={styles['row-item']}>
              <label htmlFor="" className={styles['title-label']}>
                Is Getway <span style={{ color: 'red' }}>*</span>{' '}
              </label>
              <Controller
                name="isGetway"
                control={control}
                // rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    size="large"
                    placeholder="Chọn trạng thái"
                    allowClear
                  >
                    <Option value={1}>Có</Option>
                    <Option value={2}>không</Option>
                  </Select>
                )}
              />
              {errors.isGetway && (
                <p style={{ color: 'red' }}>
                  Chưa lựa chọn trạng thái
                </p>
              )}
            </div>
            <div className={styles['row-item']}>
              <label htmlFor="" className={styles['title-label']}>
                Status <span style={{ color: 'red' }}>*</span>{' '}
              </label>
              <Controller
                name="status"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    size="large"
                    placeholder="Chọn trạng thái"
                    allowClear
                  >
                    <Option value={false}>Active</Option>
                    <Option value={true}>Inactive</Option>
                  </Select>
                )}
              />
              {errors.status && (
                <p style={{ color: 'red' }}>
                  Chưa lựa chọn trạng thái
                </p>
              )}
            </div>
          </div>


          <hr style={{ width: '100%' }} />
          <div className={styles['btn-container']}>
            <button type="submit" className={styles['btn-save']}>
              Save
            </button>
            <Link to="/">
              <button type="cancel" className={styles['btn-cancel']}>
                Cancel
              </button>
            </Link>
          </div>
          {/* <button type="submit">Submit</button> */}
        </form>
      </div>
    </>
  );
}

export default CreateOwner;