import { Sidebar } from "../../components/layouts/Sidebar";
import React, { useEffect, useState } from "react";
import { Button, Card, Input } from "antd";
import { BlogDetails, CommentItem, ModalInput } from "@/components";
import { useRouter } from "next/router";
import blogService from "@/services/blogService";
import Cookies from "js-cookie";
import { getBlogBySlug } from "@/store/redux/actions/sharingblogAction";
import { useDispatch } from "react-redux";
import NotFound from "@/components/NotFound";
import { ArrowLeftOutlined } from "@ant-design/icons";

const { TextArea } = Input;

export default function BlogDetail() {
    const router = useRouter()
    const dispatch = useDispatch()
    const token = Cookies.get('token') || '';

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
    const { slug } = router.query
    const [blog, setBlog] = useState()
    const [isFavorite, setIsFavorite] = useState(false)

    useEffect(() => {
        const fetchBlogDetail = async () => {
            const blogDetail = await blogService.getPostBySlug(token, slug)
            
            if (blogDetail) {
                setBlog(blogDetail.article)
                setIsFavorite(blogDetail.favoriteStatus)
            }
            dispatch(getBlogBySlug(blogDetail))
        }
        fetchBlogDetail()
    }, [token, slug, isFavorite])
    
    return (
        <Sidebar>
            {blog ? (
                <div className="container mx-auto py-8 h-screen overflow-scroll">
                    <div className="w-[82%] mx-auto">
                        <BlogDetails blog={blog} isFavorite={isFavorite} setIsFavorite={setIsFavorite} className="mb-0"/>
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
                            onChange={() => { }}
                        />
                    </div>
                </div>) : <NotFound/> }
        </Sidebar>
    );
}
