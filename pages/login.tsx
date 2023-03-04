import Link from "next/link";
import React from "react";
import { Guest, Button } from "@/components/index";
import { Checkbox, Form, Input } from "antd";
import { useRouter } from "next/router";
import userService from '../services/userService';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';


const Login: React.FC = () => {
	const router = useRouter();
	const onFinish = async (values: any) => {
		const { email, password } = values;
		const  input = {
			user : {
				email: email,
				password: password
			}	
		}
		const result  = await userService.login(input)
		if (result) {
			Cookies.set('token', result.user.token, { expires: 7 });
			router.push('/profile')
			// router.push({
			// 	pathname: '/',
			// 	query: { showToast: true, message: 'Đăng nhập thành công!'},
			// }, undefined, { shallow: true });
		}
		else {
			toast.error('Tài khoản hoặc mật khẩu không đúng! Vui lòng kiểm tra lại!');
		}
		
	};

	const onFinishFailed = (errorInfo: any) => {
		toast.error("Lỗi: " + { errorInfo })
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
					label="Email"
					name="email"
					rules={[{ required: true, message: "Vui lòng nhập tài khoản email!" }]}
				>
					<Input type="email"/>
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
