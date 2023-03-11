import { Spin } from "antd"
import React, { FC } from "react"
import { BlogItem } from "../blog/BlogItem"

interface Props {
    pending: boolean,
    blogs: {}[]
}
export const ProfilePosts = ({pending, blogs}: Props) => {
    return (
        <div>
            {pending ? (
                <div className="flex justify-center h-screen">
                    <Spin className="w-12 h-12" />
                </div>
            ) : (
                <div className="mt-8">
                    { blogs.length !== 0 ? 
                    <h3 className="text-2xl font-bold">Bài viết ({blogs.length})</h3>
                    :
                    <h3 className="text-2xl font-bold">Chưa có bài viết nào</h3>                      
                    }
                    
                    <div className="mt-10">
                        {blogs.map((item: any, index: number) => (
                            <BlogItem key={index} blog={item} />
                        ))}
                    </div>
                </div>
            
            )}
        </div>
    )
}
