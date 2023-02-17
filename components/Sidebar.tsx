import Link from "next/link";
import React, { ReactNode } from "react";
import { AiOutlineHome, AiOutlinePlus } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { Button, Tooltip } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Space } from "antd";

interface Props {
	children: ReactNode;
}

export const Sidebar = ({ children }: Props) => {
	return (
		<div className="flex">
			<div className="fixed w-[10%] h-screen p-3 border-r-[1px] flex flex-col justify-between bg-indigo-200">
				<div className="flex flex-col items-center">
					<Link href="/login">
						{/* <div className="bg-purple-800 text-white p-3 rounded-lg inline-block">
                        Avatar
                    </div> */}
						<Avatar
							style={{ backgroundColor: "#87d068", fontSize: "30px" }}
							size={50}
							icon={<UserOutlined />}
						/>
					</Link>
					<span className="border-b-[1px] border-gray-400 w-full p-2"></span>
					<Link href="/createBlog">
						<div
							className=" bg-blue-600 rounded-full text-white text-xl hover:bg-blue-400 cursor-pointer 
                            mt-4 mb-5 p-3 inline-block"
						>
							<Tooltip placement="right" title={"Create Blog"}>
								<AiOutlinePlus />
							</Tooltip>
						</div>
					</Link>
					<Link href="/">
						<div className=" text-2xl hover:bg-slate-300 cursor-pointer my-3 p-3  inline-block">
							<Tooltip placement="right" title={"Home page"}>
								<AiOutlineHome />
							</Tooltip>
						</div>
					</Link>
					<Link href="/profile">
						<div className=" text-2xl hover:bg-slate-300 cursor-pointer my-3 p-3  inline-block">
							<Tooltip placement="right" title={"Profile page"}>
								<CgProfile />
							</Tooltip>
						</div>
					</Link>
				</div>
			</div>

			<main className="w-full ml-40">{children}</main>
		</div>
	);
};
