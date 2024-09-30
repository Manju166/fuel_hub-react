import React, { useState } from "react";
import { Form, Input, Button, Select, Typography } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import './style.css';
import { useQuery } from "@apollo/client";
import { GET_TENANTS } from "../../register/graphql/TenantQuery";
import { useRegisterHandler } from "./useRegisterHandler";

const { Option } = Select;
const { Text } = Typography;

const Register = () => {
  const { data } = useQuery(GET_TENANTS);
  const [form] = Form.useForm(); // Create a form instance
  const {
    handleRegister,
    registerLoading,
    registerError,
  } = useRegisterHandler(form); // Pass form to the handler

  return (
    <div className="registration">
      <h2 className="registration__title">Register</h2>
      <Form
        form={form} // Attach the form instance
        name="registration_form"
        initialValues={{ remember: true }}
        onFinish={handleRegister} // Pass the form instance
        layout="vertical"
        className="registration__form"
      >
        <Form.Item
          name="tenant"
          label={<span>Tenant</span>}
          rules={[{ required: true, message: "Please select your tenant!" }]}
          required={false}
        >
          <Select placeholder="Select your tenant">
            {data?.tenants.map((tenant) => (
              <Option key={tenant.id} value={tenant.id}>
                {tenant.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="email"
          label={<span>Email Address</span>}
          rules={[{ required: true, message: "Please input your email!" },
                  { type: "email", message: "The input is not a valid email!" }]}
          required={false}
        >
          <Input
            prefix={<MailOutlined className="registration__icon" />}
            placeholder="Enter your email"
          />
        </Form.Item>

        <Form.Item
          name="password"
          label={<span>Password</span>}
          rules={[{ required: true, message: "Please input your password!" }]}
          hasFeedback
          required={false}
        >
          <Input.Password
            prefix={<LockOutlined className="registration__icon" />}
            placeholder="Enter your password"
          />
        </Form.Item>

        <Form.Item
          name="passwordconfirm"
          label={<span>Confirm Password</span>}
          dependencies={["password"]}
          hasFeedback
          rules={[
            { required: true, message: "Please confirm your password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Passwords do not match!"));
              },
            }),
          ]}
          required={false}
        >
          <Input.Password
            prefix={<LockOutlined className="registration__icon" />}
            placeholder="Confirm your password"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={registerLoading}>
            Register
          </Button>
          {registerError && <p>Error: {registerError.message}</p>}
        </Form.Item>
      </Form>
      <div className="registration__login">
        <Text>
          Already have an account? <a href="/">Login</a>
        </Text>
      </div>
    </div>
  );
};

export default Register;
