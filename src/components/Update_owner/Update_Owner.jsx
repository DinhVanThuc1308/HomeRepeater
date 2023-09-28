import './Update_Owner.css';
import { useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { message } from 'antd';
import binicon from './Vector.svg';
import { Input, Select, Checkbox, DatePicker } from 'antd';
import styles from './styles.module.css';
import { Option } from 'antd/es/mentions';
import moment from 'moment/moment';
import updateOwnerAPI from '../../shared/api/updateOwnerAPI';

function Update_owner() {
  const nav = useNavigate();
  let { id } = useParams();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
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

  // chosse garage
  const [checkedBoxes, setCheckedBoxes] = useState([]);

  const onChangeBox = e => {
    // const value = e.target.value;
    // if (e.target.checked) {
    //   setGarageList([...garageList, value]);
    // } else {
    //   setGarageList(garageList.filter(item => item !== value));
    // }
    const value = e.target.value;
    const isChecked = e.target.checked;

    if (isChecked) {
      setCheckedBoxes([...checkedBoxes, value]);
    } else {
      setCheckedBoxes(checkedBoxes.filter(item => item !== value));
    }
  };

  // delete garage
  const handleDelete = item => {
    setCheckedBoxes(checkedBoxes.filter(checked => checked !== item));
  };

  const onSubmit = data => {
    data.dob = data.dob.format('YYYY-MM-DD');
    data.garage = checkedBoxes;
    console.log(data);
    updateOwner(data, id);
  };

  //  call api garage list from api
  const [searchTerm, setSearchTerm] = useState('');




  const handleSearch = e => {
    setSearchTerm(e.target.value);
  };

  // Post data to API
  const updateOwner = async (data, idNumber) => {
    try {
      const res = await updateOwnerAPI.updateOwnerData(data, idNumber);
      openMessageAuke();
      console.log('update', res);
    } catch (error) {
      console.log('Failed to update owner', error);
      openMessageErr();
    }
  };

  // call api of update_owner
  const [userList, setUserList] = useState([]);
  useEffect(
    () => {
      async function fetchData() {
        console.log('id', id);
        let existID = id;
        let params = {
          populate: ['garages', 'role'],
        };
        const response = await updateOwnerAPI.getExistingOwnerData(
          existID,
          params
        );
        setUserList(response);
        console.log('pull', response);
        const arr = response.garages;
        const newArr = arr.map(item => item.id);
        setCheckedBoxes(newArr);
        setValue('fullname', response.fullname);
        setValue('DeviceInfo', response.DeviceInfo);
        setValue('customer', response.customer);
        setValue('public', response.public);
        setValue('phoneNumber', response.phoneNumber);
        setValue('gender', response.gender);
        setValue('dob', moment(response.dob, 'YYYY-MM-DD'));
        setValue('role', parseInt(response.role.id));
        setValue('blocked', Boolean(response.blocked));
        console.log('id', id);
        console.log(111, response.fullname);
        console.log('role', parseInt(response.role.id));
        console.log('blocked', Boolean(response.blocked));
        console.log('dob', response.dob);
      }
      fetchData();
    },
    [id],
    setValue
  );

  console.log('user list', userList);

  console.log(checkedBoxes);

  return (
    <>
      <div
        style={{ width: '100%', backgroundColor: '#f8f5f5', padding: '10px' }}
      >
        <h3 style={{ fontFamily: 'Poppins', fontSize: 20 }}>
          <span
            style={{ fontFamily: 'Poppins', fontSize: '23', color: '#cacaca' }}
          >
            All Garages Owner &gt;
          </span>{' '}
          {userList.fullname}{' '}
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
                Têb sản phẩm <span style={{ color: 'red' }}>*</span>{' '}
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

                    placeholder={userList.garages?.fullname}
                  />
                )}
              />
              {errors.fullname && (
                <p style={{ color: 'red' }}>Nhập vào tên</p>
              )}
            </div>
            <div className={styles['row-item']}>
              <label htmlFor="" className={styles['title-label']}>
                Thông tin thiết bị <span style={{ color: 'red' }}>*</span>{' '}
              </label>
              <Controller
                name="DeviceInfo"
                control={control}
                rules={{ required: true, }}
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
                  Nhập vào thông tin thiết bị
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
                    placeholder="Nhập vào thông tin khách hàng"
                  />
                )}
              />
              {errors.customer && (
                <p style={{ color: 'red' }}>
                  Nhập vào thông tin khách hàng
                </p>
              )}
            </div>
          </div>




          <div className={styles['form-row']}>
            <div className={styles['row-item']}>
              <label htmlFor="" className={styles['title-label']}>
                Public <span style={{ color: 'red' }}>*</span>{' '}
              </label>
              <Controller
                name="Public"
                control={control}
                rules={{ required: true }}
                allowClear
                render={({ field }) => (
                  <Select
                    {...field}
                    size="large"
                    placeholder="Chọn trạng thái"
                    allowClear
                  >
                    <Option value={true}>Có</Option>
                    <Option value={false}>Không</Option>
                  </Select>
                )}
              />

              {errors.Public && (
                <p style={{ color: 'red' }}>Please select date of birth</p>
              )}
            </div>
            <div className={styles['row-item']}>
              <label htmlFor="" className={styles['title-label']}>
                isGetway <span style={{ color: 'red' }}>*</span>{' '}
              </label>
              <Controller
                name="isGetway"
                control={control}
                // rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    size="large"
                    placeholder="Select a isGetway"
                    allowClear
                  >
                    <Option value={1}>Có</Option>
                    <Option value={2}>không</Option>
                  </Select>
                )}
              />
              {errors.role && (
                <p style={{ color: 'red' }}>không được để trống</p>
              )}
            </div>
            <div className={styles['row-item']}>
              <label htmlFor="" className={styles['title-label']}>
                Status <span style={{ color: 'red' }}>*</span>{' '}
              </label>
              <Controller
                name="blocked"
                control={control}
                // rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    size="large"
                    placeholder="Select a Status"
                    allowClear
                  >
                    <Option value={false}>Active</Option>
                    <Option value={true}>Inactive</Option>
                  </Select>
                )}
              />
              {errors.status && (
                <p style={{ color: 'red' }}>Please select status</p>
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
export default Update_owner;
