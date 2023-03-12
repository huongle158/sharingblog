import Link from "next/link";
import React, { ReactNode, useEffect, useState } from "react";
import { AiOutlineHome, AiOutlinePlus } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { FloatButton, Popover, Tooltip } from "antd";
import { ArrowLeftOutlined, LogoutOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import ModalDisplayCreateTitleBLog from "../modals/ModalDisplayCreateTitleBLog";
import { NavItem } from "./NavItem";
import { SingleLineList } from "../ui/SingleLineList";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "@/store/redux/actions/userAction";
import ModalLogout from "../modals/ModalLogoutUser";
import userService  from '@/services/userService';
import notificationService from "@/services/notificationService";

interface Props {
	children: ReactNode;
}

export const Sidebar = ({ children }: Props) => {
	const router = useRouter();
	const dispatch = useDispatch();
	const { user } = useSelector((reduxData: any) => {
		return reduxData.userReducer;
	});
	// console.log("This's ~ user sidebar", user.avatar);
	const token = Cookies.get("token") || "";
	// modal create Blog
	const [showModal, setShowModal] = useState(false);
	// const [showTitleModal, setShowTitleModal] = useState(false);
	// modal logout
	const [modalLogout, setModalLogout] = useState(false);

	const openToModal = () => {
		setShowModal(true);
		// setShowTitleModal(true);
	};
	const onClicklogoutUser = async () => {
		dispatch(logoutUser());
		await Cookies.remove("token");
		router.push("/login");
	};
	const [avatar, setAvatar] = useState("");
	const [notifications, setNotifications] = useState([]);

	useEffect(() => {
		const fetchUserInfo = async () => {
			const userInfo = await userService.getInfo(token);
			if (userInfo && userInfo.user) {
				setAvatar(userInfo.user.avatar);
			}
		}
		
		const fetchNotifications = async () => {
			const notif = await notificationService.getNotifications(token, user.id)
			if (notif && notif.notifications) {
				setNotifications(notif.notifications)
			}
		}
			
		fetchUserInfo();
		fetchNotifications();
	}, [avatar, notifications, token]);

	return (
		<div className="flex">
			{/* Sidebar */}
			<div className="lg:w-[10%] w-[14%] p-3 border-r-[1px] flex items-center flex-col bg-gradient-to-b from-blue-100 to-blue-200 left-0 sticky pt-4">
				{/* Avatar - click to show notifications */}
				<Popover
					placement="right"
					title={"Thông báo"}
					content={notifications.map((item, index) => (
						<li key={index} className="px-4 py-2 hover:bg-gray-100 w-[450px]">
							<SingleLineList
								userDetail={item.user}
								notification={item}
							/>
						</li>
					))}
					trigger="click"
				>
					<Avatar shape="circle" src={avatar} size={46}/>
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
			<main className="grow w-full">
				{/* <Button onClick={() => { router.back() }} className="ml-4 mt-4"><ArrowLeftOutlined /></Button> */}
				<FloatButton
					shape="circle"
					style={{ left: '10%', top:16 }}
					icon={<ArrowLeftOutlined />}
					onClick={() => { router.back() }}
				/>
				{children}
			</main>

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
			{/* <ModalInput
				title={title == "" ? "Tiêu đề" : title}
				isModalOpen={showTitleModal}
				handleOk={handleOkTitle}
				handleCancel={handleCancel}
				defaultValue={title === "Tiêu đề" ? "" : title}
				onChange={(e) => setTitle(e.target.value)}
				isTextArea
				maxLength={200}
				placeHolder="Nhập tiêu đề..."
			/> */}
		</div>
	);
};
