import Link from "next/link";
import React, { ReactNode, Suspense, useEffect, useState } from "react";
import { AiOutlineHome, AiOutlinePlus } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { Button, Popover, Tooltip } from "antd";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Badge, Avatar } from "antd";
import ModalDisplayCreateTitleBLog from "../modals/ModalDisplayCreateTitleBLog";
import { NavItem } from "./NavItem";
import { SingleLineList } from "../ui/SingleLineList";
import { notifications } from "@/fake-data/notifications";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router";
import Cookies from "js-cookie";

interface Props {
	children: ReactNode;
}

export const Sidebar = ({ children }: Props) => {
	// const router = useRouter();

	const [showModal, setShowModal] = useState(false);
	const openToModal = () => {
		setShowModal(true);
	};
	// useEffect(() => {
	// 	const { showToast, message } = router.query;
	// 	if (showToast) {
	// 		toast.success(message)
	// 	}
	// })

	return (
		<div className="flex">
			{/* Toast top right */}
			{/* <ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
			/> */}
			{/* Sidebar */}
			<div className="lg:w-[10%] w-[14%] p-3 border-r-[1px] flex items-center flex-col bg-gradient-to-b from-blue-100 to-blue-200 left-0 sticky pt-4">
				{/* Avatar - click to show notifications */}
				<Popover placement="right" title={"Thông báo"} content={notifications.map((item, index) => (
					<li key={index} className="px-4 py-2 hover:bg-gray-100 w-[450px]">
						<SingleLineList user={item.user} title={item.blog.title} image={item.blog.image} />
					</li>
				))} trigger="click">
					<Badge count={99}>
						<Avatar shape="circle" src="https://i.pinimg.com/originals/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg" size="large"/>
					</Badge>
				</Popover>

				<span className="border-b-[1px] border-gray-400 w-full p-2"></span>
				{/* Create blog */}
				<a onClick={openToModal}>
					<div
						className="bg-blue-600 rounded-full text-white text-xl hover:bg-blue-400 cursor-pointer 
						mt-4 mb-5 p-3 inline-block"
					>
						<Tooltip placement="right" title={"Viết bài"}>
							<AiOutlinePlus />
						</Tooltip>
					</div>
				</a>
				{/* Home */}
				<NavItem title="Trang chủ" route="/">
					<AiOutlineHome />
				</NavItem>
				{/* Profile */}
				<NavItem title="Trang cá nhân" route="/users">
					<CgProfile />
				</NavItem>
				{/* Logout */}
				<NavItem title="Đăng xuất" route="/users/logout" className="pb-3 pt-1 pl-3 pr-3">
					<LogoutOutlined className="align-middle" />
				</NavItem>
			</div>
			{/* Body */}
			<main className="grow w-full">{children}</main>

			{/* Modal create title blog */}
			<ModalDisplayCreateTitleBLog
				modal={showModal}
				setShowModal={() => setShowModal(!showModal)}
			/>
		</div>
	);
};
