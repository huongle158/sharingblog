import React, { useEffect, useState } from "react"
import { Sidebar, BlogItem, ListUsers } from "@/components/index"
import { blogs, tags, users } from "@/fake-data"
import Cookies from 'js-cookie'
import { useDispatch, useSelector } from 'react-redux';
import { EditOutlined } from "@ant-design/icons"
import { getUserInfo } from './../store/redux/actions/userAction';
import userService from './../services/userService';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Input, Modal, Typography, Upload, message } from 'antd'
import type { UploadChangeParam } from 'antd/es/upload';

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

const beforeUpload = (file: File) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    return isJpgOrPng;
  };

export default function Profile() {
    const token = Cookies.get('token') || '';
    const dispath = useDispatch();
    const { user } = useSelector((reduxData: any) => {
        return reduxData.userReducer
    })
    const [userData, setUserData] = useState({
        avatar: '',
        fullname: '',
        email: '',
        username: '',
        bio: ''
    })

    const [bio, setBio] = useState(userData.bio)
    useEffect(() => {
        const fetchUserInfo = async () => {
            const userInfo = await userService.getInfo(token);
            if (userInfo && userInfo.user) {
                setUserData(userInfo.user)
                dispath(getUserInfo(userInfo.user));
            }
        };
        fetchUserInfo();
        if (!token) {
            setUserData({
                avatar: '',
                fullname: '',
                email: '',
                username: '',
                bio: ''
            });
        }
    }, [token,userData]);   
    const [isBioModalOpen, setIsBioModalOpen] = useState(false);
    const showModal = () => {
        setIsBioModalOpen(true);
    }; 
    const handleOk = async () => {
        const input = {
            user: {
                ...userData,
                fullname: userData.fullname,
                bio: bio
            }
        }
        await userService.updateInfo(token, input)
        setIsBioModalOpen(false);
    };
    const handleCancel = () => {
        setIsBioModalOpen(false);
    };
    // update avt
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>(userData.avatar);

    const handleChange: UploadProps['onChange'] = async (info: UploadChangeParam<UploadFile>) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
          }
    
        if (info.file.status === 'done') {
            getBase64(info.file.originFileObj as RcFile, (url) => {
                setLoading(false);
                setImageUrl(url);
            });
    
          try {
            const formData = new FormData();
            formData.append('avatar', info.file.originFileObj as RcFile);
            const res = await userService.updateAvatar(token, formData); // gọi hàm updateAvatar
            console.log(res); // in ra kết quả
          } catch (error) {
            message.error('Cập nhật avatar không thành công');
            console.log(error)
          }
        }
        
      };
      const uploadButton = (
        <div>
          {loading ? <LoadingOutlined /> : <PlusOutlined />}
          <div style={{ marginTop: 8 }}>Upload</div>
        </div>
      );

    return (
        <Sidebar>
            <div className="overflow-y-scroll h-screen">
                <div className="h-60 bg-gradient-to-r from-gray-100 to-gray-200">
                </div>
                <div className="max-w-screen-lg mx-auto -mt-20 px-2">
                    <div className="flex justify-center items-center mb-8">
                        <div className="mr-4">
                        <Upload
                            name="avatar"
                            listType="picture-circle"
                            className="avatar-uploader"
                            showUploadList={false}
                            beforeUpload={beforeUpload}
                            onChange= {handleChange}>
                            {userData?.avatar ? (
                                <Avatar size={128} 
                                src={userData?.avatar} 
                                alt="Avatar"
                                className="w-full h-full object-cover" />
                            ) : (
                                <> 
                                <Avatar 
                                size={128} 
                                icon={<PlusOutlined />} 
                                alt="Avatar"
                                className="w-full h-full object-cover" />
                                </>
                            )}  
                        </Upload>
                          
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold mb-1 mt-1">{userData?.fullname}</h1>
                            {/* <p className="mb-2">@{user.username}</p> */}
                            <Button type="primary" className="bg-blue-500 hover:bg-blue-400">Theo dõi</Button>
                            <Button hidden>Đang theo dõi</Button>
                        </div>
                    </div>
                    <div className="lg:flex w-full">
                        <div className="lg:flex-[40%] lg:mr-10 h-auto my-8">
                            <Typography.Title level={5}>Giới thiệu</Typography.Title>
                            <Card className="lg:p-8 mt-6">
                                <EditOutlined size={4} onClick={showModal} />
                                <h2 className="text-center">
                                    {userData.bio}
                                </h2>
                            </Card>
                        </div>
                        <div className="lg:flex-[60%] my-8">
                            <ListUsers title="Bạn bè (255)" users={users} />
                        </div>
                    </div>
                    <div className="mt-8">
                        <h3 className="text-2xl font-bold">Bài viết</h3>
                        <div className="mt-10">
                            {blogs.map((item, index) => (
                                <BlogItem key={index} blog={item} />
                            ))}
                        </div>
                    </div>
                    {/* Modal edit bio */}
                    <Modal title="Chỉnh sửa tiểu sử" open={isBioModalOpen} onOk={handleOk} onCancel={handleCancel}>
                        <Input defaultValue={userData.bio} name="bio" onChange={(e) => setBio(e.target.value)} />
                    </Modal>
                </div>
            </div>
        </Sidebar>
    )
}
