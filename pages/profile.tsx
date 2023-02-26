import React from "react"
import { Sidebar, Button as ButtonCustom, BlogItem, ListUsers} from "@/components/index"
import { Avatar, Card, Typography } from 'antd'
import { blogs, users } from "@/fake-data"

export default function Profile() {
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
                            <h1 className="text-4xl font-bold mb-4 mt-4">Lu Nguyen</h1>
                            <ButtonCustom label="Add friend" type="button"/>
                        </div>
                    </div>
                    <div className="lg:flex w-full">
                        <div className="lg:flex-[40%] lg:mr-10 h-auto my-8">
                            <Typography.Title level={5}>Biography</Typography.Title>
                            <Card className="lg:p-8 mt-6">
                                <h2 className="text-center">
                                    Hello! Welcome to my blog! <br/>This is my world!
                                </h2>
                            </Card>
                        </div>
                        <div className="lg:flex-[60%] my-8">
                            <ListUsers title="Friends (255)" users={users} />
                        </div>
                    </div>
                    <div className="mt-8">
                        <h3 className="text-lg font-bold">Posts</h3>
                        <div className="mt-4">
                            {blogs.map((item, index) => (
                                <BlogItem key={index} {...item} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Sidebar>
    )
}
