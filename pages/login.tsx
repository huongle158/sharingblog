import Link from "next/link";
import React from "react";
import { BoxShadow, Button } from "components/index";
import { Checkbox, Form, Input } from "antd";
import { useRouter } from "next/router";

const onFinish = (values: any) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

const login: React.FC = () => {
  return (
    <BoxShadow label="Sign in">
      <Form
        name="login"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="grid"
      >
        <Form.Item
          label="Email address"
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
          name="remember"
          valuePropName="checked"
          className="grid justify-items-stretch"
        >
          <Checkbox className="justify-self-start">Remember me</Checkbox>
        </Form.Item>

        <Button type="submit" label="Sign in" />

        <div className="flex flex-row text-sm mt-5">
          <Link legacyBehavior href="/register">
            <a className="text-blue-600 hover:text-blue-500 basis-3/6 mr-5">
              Forgot password?
            </a>
          </Link>
          <Link legacyBehavior href="/register">
            <a className="text-blue-600 hover:text-blue-500 basis-3/6">
              Already have an account?
            </a>
          </Link>
        </div>
      </Form>
    </BoxShadow>
  );
};

export default login;
