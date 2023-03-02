import { Sidebar } from "../../components/layouts/Sidebar";
import React, { useState } from "react";
import { Avatar, Button, Card, Input, Typography } from "antd";
import { BlogItem, CommentItem, ModalInput } from "@/components";
import { blogs } from "@/fake-data";

const { TextArea } = Input;

export default function BlogDetail() {
    const handleComment = () => {
        console.log('Comment')
    }
    const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
    const showEditModal = () => {
        setIsCommentModalOpen(true);
    };
    const handleOk = async () => {
        setIsCommentModalOpen(false);
    };
    const handleCancel = () => {
        setIsCommentModalOpen(false);
    };
    return (
        <Sidebar>
            <div className="container mx-auto py-8 h-screen overflow-scroll">
                <div className="w-[82%] mx-auto">
                    <BlogItem blog={blogs[0]} className="mb-0"/>
                    <Card>
                        <Input.Group compact>
                            <TextArea
                                className="w-full h-20 resize-none"
                                placeholder="Nhập bình luận....."
                                showCount
                                maxLength={100}
                            />
                            <div className="flex flex-col items-end mt-6">
                                <Button type="primary" onClick={handleComment}>Bình luận</Button>
                            </div>  
                        </Input.Group>
                        <CommentItem
                            onClickReply={() => { }}
                            onClickEdit={showEditModal}
                            onClickDelete={() => { }}
                            user={{
                                name: 'Thinh Pham',
                                avatar: 'https://i.pinimg.com/originals/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg'
                            }}
                            content="Hahahahaha hahahaha"
                        />
                    </Card>

                    {/* Modal edit comment */}
                    <ModalInput
                        title="Chỉnh sửa bình luận"
                        isModalOpen={isCommentModalOpen}
                        handleOk={handleOk}
                        handleCancel={handleCancel}
                        // defaultValue={''}
                        onChange={() => {}}
                    />
                </div>
            </div>
        </Sidebar>
    );
}
