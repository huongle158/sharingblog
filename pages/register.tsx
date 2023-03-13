/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import { Guest, Button } from "@/components/shared";
import { Form, Input } from "antd";
import Link from "next/link";
import userService from "@/services/userService";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const register: React.FC = () => {
	const router = useRouter()
	const [form] = Form.useForm();
	const [disableButton, setDisableButton] = useState(true);

	const onFinish = async (values: any) => {
		const { name, username, email, password } = values
		const input = {
			user: {
				username: username,
				email: email,
				password: password,
				fullname: name
			}
		}
		const result = await userService.register(input)
		
		if (result) {
			router.push('/login')
			toast.success("Bạn đã đăng ký tài khoản thành công! Hãy đăng nhập!")
		} else {
			toast.error("Đăng ký tài khoản không thành công!")
		}
	};

	const onFieldsChange = (allFields: any) => {
		let disable = true;
		allFields.forEach((field: any) => {
			const errors = field.errors;
			if (errors && errors.length === 0) {
				disable = false
			}
		});
		setDisableButton(disable);
	};

	return (
		<Guest label="Đăng ký">
			<Form
				name="register"
				labelCol={{ span: 10 }}
				wrapperCol={{ span: 18 }}
				style={{ maxWidth: 600 }}
				initialValues={{ remember: true }}
				onFinish={onFinish}
				autoComplete="off"
				form={form}
				onFieldsChange={onFieldsChange}
			>
				<Form.Item
					label="Họ tên"
					name="name"
					rules={[{ required: true, message: "Vui lòng nhập tên của bạn!" }]}
					hasFeedback
				>
					<Input />
				</Form.Item>

				<Form.Item
					label="Username"
					name="username"
					rules={[{ required: true, message: "Vui lòng nhập username!" }]}
					hasFeedback
				>
					<Input />
				</Form.Item>
				
				<Form.Item
					label="Email"
					name="email"
					rules={[
						{ required: true, message: "Vui lòng nhập email!" },
						{ type: 'email', message: 'Vui lòng nhập địa chỉ email hợp lệ!' }
					]}
					hasFeedback
				>
					<Input type="email" />
				</Form.Item>

				<Form.Item
					label="Mật khẩu"
					name="password"
					rules={[
						{ required: true, message: "Vui lòng nhập mật khẩu!" },
						{ min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự!" }
					]}
					hasFeedback
				>
					<Input.Password />
				</Form.Item>

				<Form.Item
					name="confirm"
					label="Xác nhận mật khẩu"
					dependencies={['password']}
					hasFeedback
					rules={[
						{
							required: true,
							message: 'Vui lòng nhập lại mật khẩu!',
						},
						({ getFieldValue }) => ({
							validator(_, value) {
								if (!value || getFieldValue('password') === value) {
									return Promise.resolve();
								}
								return Promise.reject(new Error('Mật khẩu không khớp!'));
							},
						}),
					]}
				>
					<Input.Password />
				</Form.Item>
				
				<Button disabled={disableButton} type="submit" label="Đăng ký" className="w-full"/>

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
