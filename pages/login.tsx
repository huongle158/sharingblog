import Link from "next/link";
import React from "react";
import { Guest, Button } from "@/components/index";
import { Checkbox, Form, Input } from "antd";
import { useRouter } from "next/router";

const Login: React.FC = () => {
	const router = useRouter();
	const onFinish = (values: any) => {
		console.log("Success:", values);
		router.push("/");
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log("Failed:", errorInfo);
	};
	return (
		<Guest label="Đăng nhập">
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
					label="Tên đăng nhập"
					name="username"
					rules={[{ required: true, message: "Vui lòng nhập tài khoản!" }]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label="Mật khẩu"
					name="password"
					rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
				>
					<Input.Password />
				</Form.Item>

				<Form.Item
					name="remember"
					valuePropName="checked"
					className="grid justify-items-stretch"
				>
					<Checkbox className="justify-self-start">Ghi nhớ mật khẩu</Checkbox>
				</Form.Item>

				<Button type="submit" label="Đăng nhập" />

				<div className="flex flex-row text-sm mt-5 justify-center">
					{/* <Link legacyBehavior href="/register">
						<a className="text-blue-600 hover:text-blue-500 basis-3/6 mr-5">
							Quên mật khẩu?
						</a>
					</Link> */}
					<Link legacyBehavior href="/register">
						<a className="text-blue-600 hover:text-blue-500">
							Bạn chưa có tài khoản? Đăng ký?
						</a>
					</Link>
				</div>
			</Form>
		</Guest>
	);
};

export default Login;
