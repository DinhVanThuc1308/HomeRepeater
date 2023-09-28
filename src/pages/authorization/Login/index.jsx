import React, { useContext, useState } from 'react';
import axios from 'axios';
import './login.css';
import { Button, Form, Input, message } from 'antd';
import { AuthContext } from '../../../context/auth';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const auth = useContext(AuthContext);
    const nav = useNavigate();
    const API = 'http://localhost:1337/api/auth/local';
    const [loading, setLoading] = useState(false);

    const handleSubmit = async values => {
        try {
            setLoading(true);
            const account = {
                identifier: values.username,
                password: values.password,
            };
            const response = await axios.post(API, account);
            auth.setKey(response.data.jwt);
            nav('/');
        } catch (error) {
            message.error(error.response.data.error.message);
        } finally {
            setLoading(false);
        }
    };

    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 12 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 24 },
        },
    };

    return (
        <div className="login" style={{ fontFamily: 'Poppins' }}>
            <div className="header-login">
                <h3 style={{ marginBottom: '20px', fontWeight: 900 }}>Welcome</h3>
                <p style={{ marginBottom: '30px', fontFamily: 'Poppins' }}>
                    Login to your account
                </p>
            </div>
            <div className="body-login">
                <Form
                    onFinish={handleSubmit}
                    {...formItemLayout}
                    layout="vertical"
                    className="login-form"
                >
                    <Form.Item
                        className="input-username"
                        name="username"
                        label="Username:"
                        style={{ marginBottom: '30px', height: '56px' }}
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input size="large" name="username" placeholder="Username" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Password:"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                            {
                                min: 6,
                                message: 'Password must be at least 6 characters long',
                            },
                        ]}
                    >
                        <Input.Password
                            className="input-password"
                            name="password"
                            placeholder="Password"
                            style={{ backgroundColor: '#fff' }}
                        />
                    </Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{
                            width: '400px',
                            height: '48px',
                            marginTop: '20px',
                            hover: 'none',
                        }}
                        loading={loading}
                        className="custom-button"
                    >
                        Login
                    </Button>
                </Form>
            </div>
        </div>
    );
}