// LoginForm.js
import React from "react";
import { Form, Input, Button, Select, Typography } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { useLoginHandler } from "./useLoginHandler";
import './style.css'
import { GET_TENANTS } from "../graphql/TenantQuery";
const { Option } = Select;
const { Text } = Typography;

const Login = () => {
  const { data } = useQuery(GET_TENANTS);
  const {
    handleLogin,
    loginLoading,
    loginError,
    emailError,
    passwordError,
    tenantError,
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
          label="Tenant"
          rules={[{ required: true, message: "Please select your Tenant!" }]}
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
          label="Email Address"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Invalid email format!" },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="Enter your email" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            { required: true, message: "Please input your password!" },
            { min: 8, message: "Password must be at least 8 characters long!" },
          ]}
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
            Don't have an account? <Link to="/register">Register</Link>
          </Text>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
