import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Input, Select, Checkbox, message } from 'antd';
import styles from './styles.module.css';
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
      deviceInfo: '',
      customer: '',
      public: undefined,
      isGetway: undefined,
      status: undefined,
    },
  });

  const [messageApi, contextHolder] = message.useMessage();
  const key = 'updatable';

  const openMessageErr = () => {
    messageApi.open({
      key,
      type: 'error',
      content: 'Fail! Please try again!',
      duration: 2,
    });
  };

  const openMessageSuccess = () => {
    messageApi.open({
      key,
      type: 'success',
      content: 'Success! You have created a new owner!',
      duration: 2,
    });

    setTimeout(() => {
      nav('/');
    }, 2000);
  };

  const onSubmit = async (data) => {
    try {
      data.garages = checkedBoxes;
      console.log(data);
      const res = await createOwnerAPI.postUserData(data);
      openMessageSuccess();
      console.log(res);
    } catch (error) {
      openMessageErr();
    }
  };





  const [checkedBoxes, setCheckedBoxes] = useState([]);

  const onChangeBox = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    if (isChecked) {
      setCheckedBoxes([...checkedBoxes, value]);
    } else {
      setCheckedBoxes(checkedBoxes.filter((item) => item !== value));
    }
  };

  return (
    <>
      <div
        style={{
          width: '100%',
          backgroundColor: '#f8f5f5',
          padding: '10px',
        }}
      >
        <h3 style={{ fontFamily: 'Poppins', fontSize: 20 }}>
          <span
            style={{
              fontFamily: 'Poppins',
              fontSize: '23',
              color: '#cacaca',
            }}
          >
            All Devices &gt;
          </span>{' '}
          Add a device{' '}
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
                Tên sản phẩm <span style={{ color: 'red' }}>*</span>
              </label>
              <Controller
                name="fullname"
                control={control}
                render={({ field }) => (
                  <div>
                    <Input
                      {...field}
                      style={{ width: '100%' }}
                      size="large"
                      placeholder="Nhập vào tên thiết bị"
                    />
                    {errors.fullname && (
                      <p style={{ color: 'red' }}>
                        Tên sản phẩm là trường bắt buộc
                      </p>
                    )}
                  </div>
                )}
              />
            </div>
            <div className={styles['row-item']}>
              <label htmlFor="" className={styles['title-label']}>
                Thông tin thiết bị <span style={{ color: 'red' }}>*</span>
              </label>
              <Controller
                name="deviceInfo"
                control={control}
                render={({ field }) => (
                  <div>
                    <Input
                      size="large"
                      {...field}
                      placeholder="Nhập vào thông tin thiết bị"
                    />
                    {errors.deviceInfo && (
                      <p style={{ color: 'red' }}>
                        Thông tin thiết bị là trường bắt buộc
                      </p>
                    )}
                  </div>
                )}
              />
            </div>
            <div className={styles['row-item']}>
              <label htmlFor="" className={styles['title-label']}>
                Khách hàng <span style={{ color: 'red' }}>*</span>
              </label>
              <Controller
                name="customer"
                control={control}
                render={({ field }) => (
                  <div>
                    <Input
                      size="large"
                      {...field}
                      placeholder="Nhập vào tên khách hàng"
                    />
                    {errors.customer && (
                      <p style={{ color: 'red' }}>
                        Khách hàng là trường bắt buộc
                      </p>
                    )}
                  </div>
                )}
              />
            </div>
          </div>

          <div className={styles['form-row']}>
            <div className={styles['row-item']}>
              <label htmlFor="" className={styles['title-label']}>
                Public<span style={{ color: 'red' }}>*</span>
              </label>
              <Controller
                name="public"
                control={control}
                style={{ width: '100%' }}

                render={({ field }) => (
                  <div>
                    <Select
                      {...field}
                      size="large"
                      placeholder="Chọn trạng thái"
                      allowClear
                      style={{ width: '100%' }}

                    >
                      <Select.Option value={1}>Có</Select.Option>
                      <Select.Option value={2}>Không</Select.Option>
                    </Select>
                    {errors.public && (
                      <p style={{ color: 'red' }}>
                        Vui lòng chọn trạng thái
                      </p>
                    )}
                  </div>
                )}
              />
            </div>
            <div className={styles['row-item']}>
              <label htmlFor="" className={styles['title-label']}>
                Is Gateway <span style={{ color: 'red' }}>*</span>
              </label>
              <Controller
                name="isGetway"
                control={control}
                render={({ field }) => (
                  <div>
                    <Select
                      {...field}
                      size="large"
                      style={{ width: '100%' }}

                      placeholder="Chọn trạng thái"
                      allowClear
                    >
                      <Select.Option value={1}>Có</Select.Option>
                      <Select.Option value={2}>Không</Select.Option>
                    </Select>
                    {errors.isGetway && (
                      <p style={{ color: 'red' }}>
                        Vui lòng chọn trạng thái
                      </p>
                    )}
                  </div>
                )}
              />
            </div>
            <div className={styles['row-item']}>
              <label htmlFor="" className={styles['title-label']}>
                Status <span style={{ color: 'red' }}>*</span>
              </label>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <div>
                    <Select
                      {...field}
                      size="large"
                      style={{ width: '100%' }}

                      placeholder="Chọn trạng thái"
                      allowClear
                    >
                      <Select.Option value={false}>Active</Select.Option>
                      <Select.Option value={true}>Inactive</Select.Option>
                    </Select>
                    {errors.status && (
                      <p style={{ color: 'red' }}>
                        Vui lòng chọn trạng thái
                      </p>
                    )}
                  </div>
                )}
              />
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
        </form>
      </div>
    </>
  );
}

export default CreateOwner;
