// src/components/Login.js

import React, { useContext, useState } from 'react';
import axios from 'axios';

import { Button, Form, Input, message } from 'antd';
import { AuthContext } from '../../../context/auth';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import './login.css'

export default function Login() {
    const auth = useContext(AuthContext);
    const nav = useNavigate();
    const API = 'http://localhost:1337/api/auth/local'; // Replace with your server's API endpoint
    const [loading, setLoading] = useState(false);

    // Callback function when Google login is successful
    const googleLoginSuccess = async (response) => {
        try {
            setLoading(true);

            // Send the Google access token to your server for authentication
            const responseFromServer = await axios.post(
                'http://localhost:3000', // Replace with your server's endpoint for Google login
                { token: response.tokenId }
            );

            auth.setKey(responseFromServer.data.jwt);
            nav('/');
        } catch (error) {
            message.error(error.response.data.error.message);
        } finally {
            setLoading(false);
        }
    };

    // Callback function when Google login fails
    const googleLoginFailure = (error) => {
        console.error('Google login failed:', error);
    };

    // Handle form submission
    const handleSubmit = async (values) => {
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
                <br />

                {/* Google OAuth login button */}

                <GoogleLogin
                    clientId="519183002002-k9etnseibnre2eiac8s4dkg7684h75bf.apps.googleusercontent.com"
                    buttonText="Login with Google"
                    onSuccess={googleLoginSuccess}
                    onFailure={googleLoginFailure}
                    cookiePolicy={'single_host_origin'}
                />
            </div>
        </div>
    );
}
