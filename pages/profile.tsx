import React from "react"
import { Sidebar, BlogItem, ListUsers} from "@/components/index"
import { Avatar, Button, Card, Typography } from 'antd'
import { blogs, tags, users } from "@/fake-data"

export default function Profile() {
    const author = [{ name: "Lu Nguyen", avatar: "https://img.freepik.com/free-vector/cute-chick-bite-knife-cartoon-vector-icon-illustration-animal-nature-icon-concept-isolated-premium-vector-flat-cartoon-style_138676-4216.jpg?w=1380&t=st=1677256095~exp=1677256695~hmac=0149fa8211014395c1fac56ad159b39254a380729278eeb9e877fab0d12d6136" }]
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
                                src="https://img.freepik.com/free-vector/cute-chick-bite-knife-cartoon-vector-icon-illustration-animal-nature-icon-concept-isolated-premium-vector-flat-cartoon-style_138676-4216.jpg?w=1380&t=st=1677256095~exp=1677256695~hmac=0149fa8211014395c1fac56ad159b39254a380729278eeb9e877fab0d12d6136"
                                alt="Avatar"
                            />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold mb-1 mt-1">Lu Nguyen</h1>
                            <p className="mb-2">@girl_lanhlung</p>
                            <Button type="primary" className="bg-blue-500 hover:bg-blue-400">Theo dõi</Button>
                            <Button hidden>Đang theo dõi</Button>
                        </div>
                    </div>
                    <div className="lg:flex w-full">
                        <div className="lg:flex-[40%] lg:mr-10 h-auto my-8">
                            <Typography.Title level={5}>Giới thiệu</Typography.Title>
                            <Card className="lg:p-8 mt-6">
                                <h2 className="text-center">
                                    Xin chào! <br/>Chào mừng bạn đến với thế giới của tôi!
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
                                <BlogItem key={index} blog={item}/>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Sidebar>
    )
}
