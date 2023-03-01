import React, { useEffect, useState } from "react"
import { Sidebar, BlogItem, ListUsers } from "@/components/index"
import { Avatar, Button, Card, Input, Modal, Typography } from 'antd'
import { blogs, tags, users } from "@/fake-data"
import { GetStaticProps } from "next"
import userService from '../../services/userService';
import Cookies from 'js-cookie'
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo } from '../../store/redux/actions/userAction';
import { EditOutlined } from "@ant-design/icons"

export default function Profile() {
    const token = Cookies.get('token') || '';
    const dispath = useDispatch();
    const { user } = useSelector((reduxData: any) => {
        return reduxData.userReducer
    })
    const [userData, setUserData] = useState({
        avatar: '',
        fullname: '',
        bio: ''
    })
    const [bio, setBio] = useState("")
    useEffect(() => {
        const fetchUserInfo = async () => {
            const userInfo = await userService.getInfo(token);
            if (userInfo.user) {
                setUserData(userInfo.user)
                dispath(getUserInfo(userInfo.user));
            }
        };
        fetchUserInfo();
    }, [token]
    );
    
    const [isBioModalOpen, setIsBioModalOpen] = useState(false);

    const showModal = () => {
        setIsBioModalOpen(true);
    };
    
    const handleOk = async () => {
        const input = {
            user: {
                userfull: user.username,
                email: user.email,
                bio: user
            }
        }
        await userService.updateInfo(token, input)
        setIsBioModalOpen(false);
    };

    const handleCancel = () => {
        setIsBioModalOpen(false);
    };

    return (
        <Sidebar>
            <div className="overflow-y-scroll h-screen">
                <div className="h-60 bg-gradient-to-r from-gray-100 to-gray-200">
                </div>
                <div className="max-w-screen-lg mx-auto -mt-20 px-2">
                    <div className="flex justify-center items-center mb-8">
                        <div className="mr-4">
                            <Avatar
                                size={128}
                                src={userData?.avatar}
                                alt="Avatar"
                            />
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
                        <Input name="bio" onChange={(e) => setBio(e.target.value)} />
                    </Modal>
                </div>
            </div>
        </Sidebar>
    )
}
