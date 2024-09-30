// LoginForm.js
import React from "react";
import { Form, Input, Button, Select, Typography } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { useLoginHandler } from "../hooks/useLoginHandler";
import './style.css'
import { GET_TENANTS } from "../graphql/TenantQuery";
import { APP_URL } from "../../../constants/APP_URL";
const { Option } = Select;
const { Text } = Typography;

const Login = () => {
  const { data } = useQuery(GET_TENANTS);
  const {
    handleLogin,
    loginLoading,
    loginError,
  } = useLoginHandler(); 

  return (
    <div className="login">
      <h2 className="login__title">Login</h2>
      <Form
        name="login_form"
        onFinish={handleLogin}
        layout="vertical"
        className="login__form"
      >
        <Form.Item
          name="tenant"
          label={<span>Tenant</span>}
          rules={[{ required: true, message: "Please select your Tenant!" }]}
          required={false}
        >
          <Select placeholder="Select a Tenant">
            {data?.tenants?.map((tenant) => (
              <Option key={tenant.id} value={tenant.id}>
                {tenant.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="email"
          label={<span>Email Address</span>}
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Invalid email format!" },
          ]}
          required={false}
        >
          <Input prefix={<MailOutlined />} placeholder="Enter your email" />
        </Form.Item>

        <Form.Item
          name="password"
          label={<span>Password</span>}
          rules={[
            { required: true, message: "Please input your password!" },
            { min: 6, message: "Password must be at least 6 characters long!" },
          ]}
          required={false}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Enter your password"
          />
        </Form.Item>

        <Button type="primary" htmlType="submit" block loading={loginLoading}>
          Login
        </Button>

        {loginError && <p>Error: {loginError.message}</p>}

        <Form.Item className="login__form-item login__register-link">
          <Text>
            Don't have an account? <Link to={APP_URL.REGISTER}>Register</Link>
          </Text>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
