import { Sidebar } from "../../components/layouts/Sidebar";
import React, { useEffect, useState } from "react";
import { Button, Card, Input, message, Modal, Spin } from "antd";
import { BlogDetails, CommentItem, ModalInput } from "@/components";
import { useRouter } from "next/router";
import blogService from "@/services/blogService";
import Cookies from "js-cookie";
import { getBlogBySlug, getLenghtAllCommentBlogDetail } from "@/store/redux/actions/sharingblogAction";
import { useDispatch, useSelector } from "react-redux";
import NotFound from "@/components/NotFound";
import { ArrowLeftOutlined } from "@ant-design/icons";
import commentService from "@/services/commentService";

const { TextArea } = Input;

export default function BlogDetail() {
    const router = useRouter()
    const dispatch = useDispatch()
    const { slug } = router.query
    const token = Cookies.get('token') || '';
    // comment
    const [commentBlog,setCommentBlog] = useState('')
       // length comment
       const [lengthComment,setLengthComment] = useState(0)
       // hàm comment
    const handleComment = async () => {
        if(commentBlog.trim() === "") {
            message.error("Bình luận không được để trống");
            return false;
        }
  
        try {
            const response = await commentService.createComment(token, slug, commentBlog);
            if(response) {
                setLengthComment(lengthComment + 1)
                setCommentBlog('')
            }
          } catch (error) {
            console.error(error);
          }
          
    }
    // hàm show modal update comment
    const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
        // tăng giá trị key mới để component được khởi tạo lại
	const [commentKey, setCommentKey] = useState(0);
        // comment detail
    const [currentComment, setCurrentComment] = useState("");
        // Id comment detail
    const [currenId,setCurrenId] = useState(0)
    const showEditModal = (content : string, id: number) => {
        setIsCommentModalOpen(true);
        setCurrentComment(content)
        setCurrenId(id)
        setCommentKey(commentKey + 1)
    };
    // hàm update comment
    const handleOk = async () => {
        setIsCommentModalOpen(false);
        if(currentComment.trim() === "") {
            message.error("Bình luận không được để trống");
            return false;
        }
        try {
            const response = await commentService.updateComment(token, slug, currenId ,currentComment);
            if(response) {
                setLengthComment(lengthComment + 1)
            }
          } catch (error) {
            message.error("Chỉnh sửa bình luận không thành công");
          }

    };
    // hàm đóng modal update Comment
    const handleCancel = () => {
        setIsCommentModalOpen(false);
    };
    // hàm show modal deleted comment
    const [isDeletedModalOpen,setIsDeletedModalOpen] = useState(false)
    const showDeletedModal = (id: number) => {
        setIsDeletedModalOpen(true);
        setCurrenId(id)
        setCommentKey(commentKey + 1)
    };
       // hàm delted comment
       const handleOkModalDel = async () => {
        setIsDeletedModalOpen(false);
        try {
            const response = await commentService.deleteComment(token, slug, currenId);
            if(response) {
                setLengthComment(lengthComment + 1)
                message.success("Xóa bình luận thành công")
            }
          } catch (error) {
            message.error("Xóa bình luận không thành công");
          }
    };
    // hàm đóng modal deleted
    const handleCancelModalDel = () => {
        setIsDeletedModalOpen(false);
    };
    const [isFavorite, setIsFavorite] = useState(false)
    const { blog, pending, notFound } = useSelector((reduxData: any) => {
        return reduxData.sharingBlogReducers;
    });
    // list comment
    const [allComment, setAllComment] = useState([])
    useEffect(() => {
        dispatch(getBlogBySlug(token, slug));
        const fetchGetAllCommentBlog = async () => {
            const allComment = await commentService.getComments(slug);
            if(allComment) {
                setAllComment(allComment.commentList.reverse())
            }         
        }
        fetchGetAllCommentBlog()
    }, [token, slug, isFavorite, lengthComment])
    return (
        <Sidebar>
            {pending ? (
                <div className="flex items-center justify-center h-screen">
                    <Spin className="w-12 h-12" />
                </div>
            ) : (
                blog && (
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
                                    value={commentBlog}
                                    onChange={(e) => setCommentBlog(e.target.value)}
                                />
                                <div className="flex flex-col items-end mt-6">
                                    <Button type="primary" onClick={handleComment}>Bình luận</Button>
                                </div>
                            </Input.Group>
                            { allComment &&
                            allComment.map((item: any, index : any) => (
                                <CommentItem
                                key={index}
                                onClickReply={() => { }}
                                onClickEdit={() => showEditModal(item.content, item.id)}
                                onClickDelete={() => showDeletedModal(item.id)}
                                userDetail={item.authorComment}
                                content={item.content}
                                createdAt= {item.createdAt}
                                updatedAt= {item.updatedAt}
                                />
                            ))
                            }
                            
                        </Card>

                        {/* Modal edit comment */}
                        <ModalInput
                            key={commentKey}
                            title="Chỉnh sửa bình luận"
                            isModalOpen={isCommentModalOpen}
                            handleOk={handleOk}
                            handleCancel={handleCancel}
                            defaultValue={currentComment}
                            onChange={(e) => setCurrentComment(e.target.value)}
                        />
                        {/* Modal xóa bình luận */}
                        <Modal
                        key={commentKey}
                        title= "Bạn chắc chắn muốn xóa bình luận này"
                        open={isDeletedModalOpen}
                        onOk={handleOkModalDel}
                        onCancel={handleCancelModalDel}
                        footer={[
                            <Button key="back" onClick={handleCancelModalDel}>
                                Huỷ
                            </Button>,
                            <Button key="submit" type="primary" onClick={handleOkModalDel}>
                                Xác nhận
                            </Button>,
                        ]}
                        />
                    </div>
                    </div>) || (notFound && <NotFound/>)
            )}
        </Sidebar>
    );
}
