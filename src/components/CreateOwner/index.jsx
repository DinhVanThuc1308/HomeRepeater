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
      email: '',
      username: '',
      password: '',
      phoneNumber: '',
      gender: '',
      dob: '',
      role: '',
      blocked: undefined,
      garages: [],
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

  // delete garage
  const handleDelete = item => {
    setCheckedBoxes(checkedBoxes.filter(checked => checked !== item));
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

  // search garage

  const handleSearch = e => {
    setSearchTerm(e.target.value);
  };

  // chosse garage
  const [checkedBoxes, setCheckedBoxes] = useState([]);

  const onChangeBox = e => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    if (isChecked) {
      setCheckedBoxes([...checkedBoxes, value]);
    } else {
      setCheckedBoxes(checkedBoxes.filter(item => item !== value));
    }
  };

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
            All Garages Owner &gt;
          </span>{' '}
          Add a new owner{' '}
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
                Name <span style={{ color: 'red' }}>*</span>{' '}
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
                    placeholder="Enter owner name"
                  />
                )}
              />
              {errors.fullname && (
                <p style={{ color: 'red' }}>Please enter your name</p>
              )}
            </div>
            <div className={styles['row-item']}>
              <label htmlFor="" className={styles['title-label']}>
                Email <span style={{ color: 'red' }}>*</span>{' '}
              </label>
              <Controller
                name="email"
                control={control}
                rules={{ required: true, pattern: /^\S+@\S+$/i }}
                render={({ field }) => (
                  <Input
                    size="large"
                    {...field}
                    placeholder="Enter owner email"
                  />
                )}
              />
              {errors.email && (
                <p style={{ color: 'red' }}>
                  Please enter a valid email address
                </p>
              )}
            </div>
            <div className={styles['row-item']}>
              <label htmlFor="" className={styles['title-label']}>
                Username <span style={{ color: 'red' }}>*</span>{' '}
              </label>
              <Controller
                name="username"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Input
                    size="large"
                    {...field}
                    placeholder="Enter owner username"
                  />
                )}
              />
              {errors.username && (
                <p style={{ color: 'red' }}>Please enter username</p>
              )}
            </div>
          </div>
          <div className={styles['form-row']}>
            <div className={styles['row-item']}>
              <label htmlFor="" className={styles['title-label']}>
                Password <span style={{ color: 'red' }}>*</span>{' '}
              </label>
              <Controller
                name="password"
                control={control}
                rules={{ required: true, minLength: 6 }}
                render={({ field }) => (
                  <Input.Password
                    {...field}
                    style={{ width: '100%' }}
                    size="large"
                    placeholder="Enter owner password"
                  />
                )}
              />
              {errors.password && (
                <p style={{ color: 'red' }}>Please enter a valid password</p>
              )}
            </div>
            <div className={styles['row-item']}>
              <label htmlFor="" className={styles['title-label']}>
                Phone number <span style={{ color: 'red' }}>*</span>{' '}
              </label>
              <Controller
                name="phoneNumber"
                control={control}
                rules={{ required: true, minLength: 10, maxLength: 10 }}
                render={({ field }) => (
                  <Input
                    size="large"
                    {...field}
                    placeholder="Enter owner phone number"
                  />
                )}
              />
              {errors.phone && (
                <p style={{ color: 'red' }}>Please enter a valid phonenumber</p>
              )}
            </div>
            <div className={styles['row-item']}>
              <label htmlFor="" className={styles['title-label']}>
                Gender <span style={{ color: 'red' }}>*</span>{' '}
              </label>
              <Controller
                name="gender"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    size="large"
                    placeholder="Select owner gender"
                    allowClear
                  >
                    <Option value="male">Male</Option>
                    <Option value="female">Female</Option>
                    <Option value="Other">Other</Option>
                  </Select>
                )}
              />
              {errors.gender && (
                <p style={{ color: 'red' }}>Please select gender</p>
              )}
            </div>
          </div>
          <div className={styles['form-row']}>
            <div className={styles['row-item']}>
              <label htmlFor="" className={styles['title-label']}>
                DOB <span style={{ color: 'red' }}>*</span>{' '}
              </label>
              <Controller
                name="dob"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <DatePicker {...field} size="large"></DatePicker>
                )}
              />
              {errors.dob && (
                <p style={{ color: 'red' }}>Please select date of birth</p>
              )}
            </div>
            <div className={styles['row-item']}>
              <label htmlFor="" className={styles['title-label']}>
                Role <span style={{ color: 'red' }}>*</span>{' '}
              </label>
              <Controller
                name="role"
                control={control}
                // rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    size="large"
                    placeholder="Select a role"
                    allowClear
                  >
                    <Option value={1}>Admin</Option>
                    <Option value={2}>User</Option>
                  </Select>
                )}
              />
              {errors.role && (
                <p style={{ color: 'red' }}>Please select role</p>
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

          <div className={styles['choose-container']}>
            <div className={styles['checkbox-garage']}>
              <Input
                size="large"
                placeholder="Search for garages .."
                value={searchTerm}
                onChange={handleSearch}
              />
              <div className={styles['checkbox-list']}>
                {filteredGarages.map(garageName => (
                  <Checkbox
                    key={garageName}
                    style={{ marginLeft: '8px' }}
                    onChange={onChangeBox}
                    value={garageName.id}
                    checked={checkedBoxes.includes(garageName.id)}
                  >
                    {garageName.attributes.name}
                    {console.log('hihi', garageName.id)}
                  </Checkbox>
                ))}
              </div>
            </div>
            <div className={styles['list-garage']}>
              <label htmlFor="">Select garages ({checkedBoxes.length})</label>
              {checkedBoxes.map(item => {
                const IDObject = filteredGarages.find(obj => obj.id === item);
                console.log(IDObject);
                return (
                  <div className={styles['pickitem']} key={item}>
                    <div className="pickitem-name">
                      {IDObject.attributes.name}
                    </div>
                    <img
                      src={binicon}
                      alt=""
                      onClick={() => handleDelete(item)}
                      style={{ cursor: 'pointer', marginLeft: '5px' }}
                    />
                  </div>
                );
              })}
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
