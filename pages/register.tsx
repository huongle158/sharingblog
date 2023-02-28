import React from "react";
import { Guest, Button } from "@/components/index";
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
		<Guest label="Đăng ký">
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
					label="Họ tên"
					name="name"
					rules={[{ required: true, message: "Vui lòng nhập tên của bạn!" }]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label="Tên đăng nhập"
					name="email"
					rules={[{ required: true, message: "Vui lòng nhập tên đăng nhập!" }]}
				>
					<Input type="email" />
				</Form.Item>

				<Form.Item
					label="Mật khẩu"
					name="password"
					rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
				>
					<Input.Password />
				</Form.Item>

				<Form.Item
					label="Nhập lại mật khẩu"
					name="password_confirm"
					rules={[
						{ required: true, message: "Vui lòng nhập lại mật khẩu!" },
					]}
				>
					<Input.Password />
				</Form.Item>

				<Button type="submit" label="Đăng ký" className="w-full"/>

				<div className="grid text-sm mt-5">
					<Link legacyBehavior href="/login">
						<a className="justify-self-center text-blue-600 hover:text-blue-500">
							Bạn đã có tài khoản? Đăng nhập?
						</a>
					</Link>
				</div>
			</Form>
		</Guest>
	);
};

export default register;
