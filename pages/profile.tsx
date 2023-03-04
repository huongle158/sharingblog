import React, { useEffect, useState } from "react";
import {
	Sidebar,
	BlogItem,
	ListUsers,
	ModalInput,
	ModalMultipleInput,
} from "@/components/index";
import { blogs, tags, users } from "@/fake-data";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { EditOutlined } from "@ant-design/icons";
import { getUserInfo } from "./../store/redux/actions/userAction";
import userService from "./../services/userService";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import {
	Avatar,
	Button,
	Card,
	Input,
	Modal,
	Typography,
	Upload,
	message,
} from "antd";
import type { UploadChangeParam } from "antd/es/upload";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { Console } from "console";

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
	const reader = new FileReader();
	reader.addEventListener("load", () => callback(reader.result as string));
	reader.readAsDataURL(img);
};

const beforeUpload = (file: File) => {
	const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
	if (!isJpgOrPng) {
		message.error("You can only upload JPG/PNG file!");
	}
	return isJpgOrPng;
};

export default function Profile() {
	const router = useRouter();
	const token = Cookies.get("token") || "";
	const dispath = useDispatch();
	// const { user } = useSelector((reduxData: any) => {
	//     return reduxData.userReducer
	// })
	const [avatar, setAvatar] = useState("");
	const [fullname, setFullname] = useState("");
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [bio, setBio] = useState("");
	const [initialBio, setInitialBio] = useState("");
	useEffect(() => {
		const fetchUserInfo = async () => {
			const userInfo = await userService.getInfo(token);
			if (userInfo && userInfo.user) {
				console.log("This's ~ userInfo avatar", userInfo.user.avatar);
				setAvatar(userInfo.user.avatar);
				setFullname(userInfo.user.fullname);
				setEmail(userInfo.user.email);
				setUsername(userInfo.user.username);
				setBio(userInfo.user.bio);
				setInitialBio(userInfo.user.bio);
				dispath(getUserInfo(userInfo.user));
			}
		};
		fetchUserInfo();
		// if (token) {
		//     router.push("/");
		// }
		if (!token) {
			setAvatar("");
			setFullname("");
			setEmail("");
			setUsername("");
			setBio("");
		}
	}, [token, avatar, router, fullname, username]);
	// tăng giá trị key mới để component được khởi tạo lại
	const [bioKey, setBioKey] = useState(0);
	const [isBioModalOpen, setIsBioModalOpen] = useState(false);
	const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

	const showBioModal = () => {
		setIsBioModalOpen(true);
		setBioKey(bioKey + 1);
	};
	const showInfoModal = () => {
		setIsInfoModalOpen(true);
	};
	const handleOk = async () => {
		const input = {
			user: {
				// avatar: avatar,
				fullname: fullname,
				// email: email,
				// username: username,
				bio: bio,
			},
		};
		await userService.updateInfo(token, input);
		setIsBioModalOpen(false);
		setIsInfoModalOpen(false);
		console.log(input.user.fullname);
	};

	const handleCancel = () => {
		setIsBioModalOpen(false);
		setIsInfoModalOpen(false);
		setBio(initialBio);
	};

	// update avt
	const [loading, setLoading] = useState(false);
	const handleChange: UploadProps["onChange"] = async (
		info: UploadChangeParam<UploadFile>
	) => {
		if (info.file.status === "uploading") {
			setLoading(true);
			return;
		}

		if (info.file.status === "done") {
			getBase64(info.file.originFileObj as RcFile, (url) => {
				console.log("This's ~ url avatar", url);
				setLoading(false);
				setAvatar(url);
			});

			try {
				const formData = new FormData();
				formData.append("avatar", info.file.originFileObj as RcFile);
				const res = await userService.updateAvatar(token, formData); // gọi hàm updateAvatar
				toast.success("Cập nhật avatar thành công");
			} catch (error) {
				toast.error("Cập nhật avatar không thành công");
				console.log(error);
			}
		}
	};

	const uploadButton = (
		<div>
			{loading ? <LoadingOutlined /> : <PlusOutlined />}
			<div style={{ marginTop: 8 }}>Upload</div>
		</div>
	);

	const itemsInfoModal = [
		{
			title: "Full name",
			value: fullname,
			onChange: (e: any) => setFullname(e.target.value),
		},
		{
			title: "Username",
			value: username,
			onChange: (e: any) => setUsername(e.target.value),
		},
	];

	const handleViewFollowers = () => {
		router.push({
			pathname: "/users",
			query: {
				title: "Danh sách người theo dõi",
				items: JSON.stringify(users), //the 'users page' is using fake data too, please edit when u do it
			},
		});
	};

	const handleViewFollowing = () => {
		router.push({
			pathname: "/users",
			query: {
				title: "Danh sách đang theo dõi",
				items: JSON.stringify(users), //fake data too
			},
		});
	};

	return (
		<Sidebar>
			<div className="overflow-y-scroll h-screen relative">
				{/* Header profile */}
				<div className="h-60 bg-gradient-to-r from-gray-100 to-gray-200"></div>
				<div className="max-w-screen-lg mx-auto -mt-20 px-2">
					<div className="flex justify-center items-center mb-8">
						{/* Avatar */}
						<div className="mr-4">
							<Upload
								name="avatar"
								listType="picture-circle"
								className="avatar-uploader"
								showUploadList={false}
								beforeUpload={beforeUpload}
								onChange={handleChange}
							>
								{avatar && avatar ? (
									<Avatar
										size={128}
										src={avatar}
										alt="Avatar"
										className="w-full h-full object-cover"
									/>
								) : (
									<>
										<Avatar
											size={128}
											icon={<PlusOutlined />}
											alt="Avatar"
											className="w-full h-full object-cover"
										/>
									</>
								)}
							</Upload>
						</div>
						{/* Info */}
						<div>
							<h1 className="text-3xl font-bold mb-1 mt-1">{fullname}</h1>
							<p className="mb-2">@{username}</p>
							<Button type="primary" onClick={() => {}}>
								Theo dõi
							</Button>
							<Button hidden>Đang theo dõi</Button>
						</div>
						<EditOutlined size={4} onClick={showInfoModal} />
					</div>

					{/* Body */}
					<div className="lg:flex w-full">
						{/* Bio */}
						<div className="lg:flex-[30%] lg:mr-10 h-auto my-8 lg:max-w-[300px]">
							<Typography.Title level={5}>Giới thiệu</Typography.Title>
							<Card className="lg:p-2 mt-2 flex flex-col">
								<div className="flex-1 flex flex-col items-end">
									<EditOutlined size={4} onClick={showBioModal} />
								</div>
								<p className="text-center flex-1 mt-2 break-words">{bio}</p>
							</Card>
						</div>
						{/* Followers */}
						<div className="lg:flex-[33%] my-8 mr-8">
							<ListUsers
								title="Người theo dõi (255)"
								users={users}
								onClickButton={handleViewFollowers}
							/>
						</div>
						{/* Following */}
						<div className="lg:flex-[33%] my-8">
							<ListUsers
								title="Đang theo dõi (333)"
								users={users}
								onClickButton={handleViewFollowing}
							/>
						</div>
					</div>

					{/* Blogs */}
					<div className="mt-8">
						<h3 className="text-2xl font-bold">Bài viết</h3>
						<div className="mt-10">
							{blogs.map((item, index) => (
								<BlogItem key={index} blog={item} />
							))}
						</div>
					</div>

					{/* Modal edit bio */}
					<ModalInput
						key={bioKey}
						title="Tiểu sử"
						isModalOpen={isBioModalOpen}
						handleOk={handleOk}
						handleCancel={handleCancel}
						defaultValue={bio}
						onChange={(e) => setBio(e.target.value)}
						isTextArea
						maxLength={200}
					/>
					{/* Modal edit fullname, username */}
					<ModalMultipleInput
						title="Chỉnh sửa thông tin"
						isModalOpen={isInfoModalOpen}
						handleOk={handleOk}
						handleCancel={handleCancel}
						items={itemsInfoModal}
					/>
				</div>
			</div>
		</Sidebar>
	);
}
