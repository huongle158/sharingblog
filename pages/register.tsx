import React from "react";
import { BoxShadow, Button } from "components/index";
import { Checkbox, Form, Input } from "antd";
import Link from "next/link";

const onFinish = (values: any) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

const register: React.FC = () => {
  return (
    <BoxShadow label="Sign up">
      <Form
        name="register"
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 18 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input type="email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Password confirm"
          name="password_confirm"
          rules={[
            { required: true, message: "Please re-input your password!" },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Button type="submit" label="Sign up" />

        <div className="grid text-sm mt-5">
          <Link legacyBehavior href="/login">
            <a className="justify-self-center text-blue-600 hover:text-blue-500">
              Already have an account sign?
            </a>
          </Link>
        </div>
      </Form>
    </BoxShadow>
  );
};

export default register;
