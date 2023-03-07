import React, { useEffect, useState ,Suspense} from "react";
import { ErrorBoundary } from 'react-error-boundary';
import {
	Sidebar,
	BlogItem,
	ListUsers,
	ModalInput,
	ModalMultipleInput,
	ProfilePosts,
	ProfileGroupBox,
	ProfileHeader,
	ProfileFrame,
} from "@/components/index";
import { blogs, tags, users } from "@/fake-data";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { EditOutlined } from "@ant-design/icons";
import { getListFollower, getListFollowing, getUserInfo } from "./../store/redux/actions/userAction";
import userService from "./../services/userService";
import followService from "../services/followService"
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
	Spin,
} from "antd";
import type { UploadChangeParam } from "antd/es/upload";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import blogService from "@/services/blogService";
import { getAllBlogs } from './../store/redux/actions/sharingblogAction';

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
	const dispatch = useDispatch();
	const { blogs, pending } = useSelector((reduxData: any) => {
		return reduxData.sharingBlogReducers;
	});
	const [avatar, setAvatar] = useState("");
	const [fullname, setFullname] = useState("");
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [bio, setBio] = useState("");
	const [initialBio, setInitialBio] = useState("");
	const [initialuseName, setInitialuseName] = useState("");
	const [initialfullName, setInitialFullname] = useState("");
	// danh sách người đang follow user
	const [followerList, setFollowerList] = useState([]);
	// danh sách người user đó đang follow
	const [followingList, setFollowingList] = useState([]);
	useEffect(() => {
		const fetchUserInfo = async () => {
			const userInfo = await userService.getInfo(token);
			if (userInfo && userInfo.user) {
				// console.log("This's ~ userInfo avatar", userInfo.user.avatar);
				setAvatar(userInfo.user.avatar);
				setFullname(userInfo.user.fullname);
				setEmail(userInfo.user.email);
				setUsername(userInfo.user.username);
				setBio(userInfo.user.bio);

				setInitialBio(userInfo.user.bio);
				setInitialFullname(userInfo.user.fullname);
				setInitialuseName(userInfo.user.username);
				setNewUsername(userInfo.user.username)
				dispatch(getUserInfo(userInfo.user));
			}
		};
		// lấy danh sách các bài viết của user
		dispatch(getAllBlogs(token,undefined, username));
	
		
		fetchUserInfo();
		if (!token) {
			setAvatar("");
			setFullname("");
			setEmail("");
			setUsername("");
			setBio("");
		}
	}, [token, avatar, router, dispatch]);
	// lấy danh sách  follow của user
	useEffect(() => {
		const fetchFollower =  async () => {
			const follower = await followService.getProfileByUsername(username)
			if (follower) {
				//console.log(follower)
				setFollowerList(follower.profile.listFollower)
				setFollowingList(follower.profile.listFollowing)
			}
		}
		fetchFollower(followerList, followingList);
   }, [username]);
	// tăng giá trị key mới để component được khởi tạo lại
	const [bioKey, setBioKey] = useState(0);
	const [infoKey, setInfoKey] = useState(0);
	const [isBioModalOpen, setIsBioModalOpen] = useState(false);
	const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
	// update bio
	const showBioModal = () => {
		setIsBioModalOpen(true);
		setBioKey(bioKey + 1);
	};
	const showInfoModal = () => {
		setIsInfoModalOpen(true);
		setInfoKey(infoKey + 1);
	};
	// update info
	const handleOk = async () => {
		const input = {
			user: {
				// avatar: avatar,
				// fullname: fullname,
				// email: email,
				// username: username,
				bio: bio,
			},
		};
		await userService.updateInfo(token, input);
		setIsBioModalOpen(false);
		setIsInfoModalOpen(false);
		toast.success("Cập nhật tiểu sử thành công");
		// console.log(input.user.fullname);
	};
	const [newUsername, setNewUsername] = useState("");
	const handleOkUpdateInfo = async () => {
		  try {
			const input = {
				user: {
					fullname: fullname,
					// username: username
				},
			};
			//Kiểm tra xem nếu username được cập nhật thì mới thêm vào input
			if (newUsername !== username) {
				input.user.username = username;
			  }
			await userService.updateInfo(token, input);
			setIsInfoModalOpen(false);
			toast.success("Cập nhật thông tin thành công");
		} catch (err) {
			message.error("username của bạn trùng với người khác"); 
		}
	  };

	const handleCancel = () => {
		setIsBioModalOpen(false);
		setBio(initialBio);
	};
	const handleCancelUpdateInfo = () => {
		setIsInfoModalOpen(false);
		setUsername(initialuseName);
		setFullname(initialfullName);
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
				// console.log("This's ~ url avatar", url);
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
			value: newUsername,
			onChange: (e: any) => setUsername(e.target.value),
		},
	];

	const handleViewFollowers = () => {
		dispatch(getListFollower(followerList))
		router.push({
			pathname: "/users",
			query: {
				title: "Danh sách người theo dõi",
				items: JSON.stringify(followerList),
			},
		});
	};

	const handleViewFollowing = () => {
		dispatch(getListFollower(followingList))
		router.push({
			pathname: "/users",
			query: {
				title: "Danh sách đang theo dõi",
				items: JSON.stringify(followingList),
			},
		});
	};

	return (
		<ErrorBoundary fallback={<div>Loading...</div>}>
			<Sidebar>
				<ProfileFrame>
					<ProfileHeader fullname={fullname} username={username} showInfoModal={showInfoModal}>
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
					</ProfileHeader>

					{/* Body */}
						<ProfileGroupBox
							showBioModal={showBioModal}
							bio={bio}
							followerList={followerList}
							handleViewFollowers={handleViewFollowers}
							followingList={followingList}
							handleViewFollowing={handleViewFollowing}
							/>

					{/* Blogs */}
					<ProfilePosts pending={pending} blogs={blogs} />

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
						key={infoKey}
						title="Chỉnh sửa thông tin"
						isModalOpen={isInfoModalOpen}
						handleOk={handleOkUpdateInfo}
						handleCancel={handleCancelUpdateInfo}
						items={itemsInfoModal}
					/>
				</ProfileFrame>
			</Sidebar>
		</ErrorBoundary>
		
	);
}
