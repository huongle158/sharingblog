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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "@/store/redux/actions/userAction";
import ModalLogout from "../modals/ModalLogoutUser";

interface Props {
	children: ReactNode;
}

export const Sidebar = ({ children }: Props) => {
	const router = useRouter();
	const dispath = useDispatch();
	const { user } = useSelector((reduxData: any) => {
		return reduxData.userReducer;
	});
	// console.log("This's ~ user sidebar", user.avatar);

	// modal create Blog
	const [showModal, setShowModal] = useState(false);
	// modal logout
	const [modalLogout, setModalLogout] = useState(false);

	const openToModal = () => {
		setShowModal(true);
	};
	const onClicklogoutUser = async () => {
		dispath(logoutUser());
		await Cookies.remove("token");
		router.push("/login");
	};

	// const { showToast, message } = router.query;
	// if (showToast) {
	// 	toast.success(message)
	// }

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
				<Popover
					placement="right"
					title={"Thông báo"}
					content={notifications.map((item, index) => (
						<li key={index} className="px-4 py-2 hover:bg-gray-100 w-[450px]">
							<SingleLineList
								user={item.user}
								title={item.blog.title}
								image={item.blog.image}
							/>
						</li>
					))}
					trigger="click"
				>
					<Badge count={99}>
						<Avatar shape="circle" src={user.avatar} size={46} />
					</Badge>
				</Popover>

				<span className="border-b-[1px] border-gray-400 w-full p-2"></span>
				{/* Create blog */}
				<a onClick={openToModal}>
					<div
						className="bg-blue-600 rounded-full text-white text-xl hover:bg-blue-400 cursor-pointer 
						mt-4 mb-4 p-3 inline-block"
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
				<NavItem title="Trang cá nhân" route="/profile">
					<CgProfile />
				</NavItem>
				{/* Logout */}
				<NavItem title="Đăng xuất" className="pb-3 pt-1 pl-3 pr-3">
					<a onClick={() => setModalLogout(true)}>
						<LogoutOutlined className="align-middle" />
					</a>
				</NavItem>
			</div>
			{/* Body */}
			<main className="grow w-full">{children}</main>

			{/* Modal create title blog */}
			<ModalDisplayCreateTitleBLog
				modal={showModal}
				setShowModal={() => setShowModal(!showModal)}
			/>
			{/* Modal logout User */}
			<ModalLogout
				modal={modalLogout}
				setModal={setModalLogout}
				handleLogout={onClicklogoutUser}
			/>
		</div>
	);
};
