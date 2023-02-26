import Link from "next/link";
import React, { ReactNode, useState } from "react";
import { AiOutlineHome, AiOutlinePlus } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { Tooltip } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Badge, Avatar } from "antd";
import { useRouter } from "next/router";
import ModalDisplayCreateTitleBLog from "../modals/ModalDisplayCreateTitleBLog";

interface Props {
	children: ReactNode;
}

export const Sidebar = ({ children }: Props) => {
	const router = useRouter();
	const [isOpen, setIsOpen] = useState(false);

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};
	// modal show create Title BLog
	const [showModal, setShowModal] = useState(false);
	const openToModal = () => {
		setIsOpen(!isOpen);
		setShowModal(true);
	};

	return (
		<div className="flex">
			<div className="flex-none lg:w-[10%] w-[14%] h-screen p-3 border-r-[1px] flex items-center flex-col bg-gradient-to-b from-blue-100 to-blue-200">
				<Link href="/login">
					<Badge dot>
						<Avatar shape="circle" icon={<UserOutlined />} size="large" />
					</Badge>
				</Link>
				<span className="border-b-[1px] border-gray-400 w-full p-2"></span>
				<a onClick={openToModal}>
					<div
						className="bg-blue-600 rounded-full text-white text-xl hover:bg-blue-400 cursor-pointer 
						mt-4 mb-5 p-3 inline-block"
					>
						<Tooltip placement="right" title={"Create Blog"}>
							<AiOutlinePlus />
						</Tooltip>
					</div>
				</a>
				<Link href="/">
					<div
						className={`hover:bg-blue-200 rounded-full text-2xl cursor-pointer my-3 p-3 
							inline-block ${router.pathname === "/" ? "bg-blue-200" : ""}`}
					>
						<Tooltip placement="right" title={"Home page"}>
							<AiOutlineHome />
						</Tooltip>
					</div>
				</Link>
				<Link href="/profile">
					<div
						className={`hover:bg-blue-200 rounded-full text-2xl cursor-pointer my-3 p-3  
						inline-block ${router.pathname === "/profile" ? "bg-blue-200" : ""}`}
					>
						<Tooltip placement="right" title={"Profile page"}>
							<CgProfile />
						</Tooltip>
					</div>
				</Link>
			</div>
			<main className="grow">{children}</main>
			<ModalDisplayCreateTitleBLog
				modal={showModal}
				setShowModal={() => setShowModal(!showModal)}
			/>
		</div>
	);
};
