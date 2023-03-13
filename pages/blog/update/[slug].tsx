import React, { useEffect, useState } from "react";
import { Sidebar } from "@/components/layouts/Sidebar";
import { useDispatch } from "react-redux";
import blogService from "@/services/blogService";
import { Input, message, Modal, Typography } from "antd";
import { useRouter } from "next/router";
import { getBlogBySlug } from "@/store/redux/actions/sharingblogAction";
import CreateContent from "@/components/blog/CreateContent";
import Cookies from "js-cookie";
import Preview from "@/components/blog/Preview";
import { toast } from "react-toastify";
import { RcFile } from "antd/es/upload";

const UpdateBlog = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const token = Cookies.get("token") || ""
    
    const { slug } = router.query
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [oldBanner, setOldBanner] = useState("");
    const [newBanner, setNewBanner] = useState<RcFile | null > (null);
    const [tagList, setTagList] = useState([]);

    const handleContentChange = (value: string) => {
        setContent(value);
    };
    
    useEffect(() => {
        const fetchBlogDetail = async () => {
            const blogDetail = await blogService.getPostBySlug(token, slug)
            if (blogDetail && blogDetail.article) {
                setTitle(blogDetail.article.title)
                setContent(blogDetail.article.content)
                setOldBanner(blogDetail.article.banner)
                setTagList(blogDetail.article.tagList)

                dispatch(getBlogBySlug(blogDetail))
            }
        }
        fetchBlogDetail()
    }, [token, slug])

    const [showPreview, setShowPreview] = useState(false)
    const pushPreview = () => {
        if (content === "") {
            message.error('Nội dung bài Blog không được để trống');
            return false
        }
        setShowPreview(true)
    }

    interface Blog {
        title: string,
        content: string,
        tagList: string[],
        banner?: RcFile | null,
    }
    
    const saveBlog = async () => {
        const blogUpdate: Blog = {
            title: title,
            content: content,
            tagList: tagList,
        };
        if (newBanner) {
            blogUpdate.banner = newBanner
        }
        
        try {
            // console.log(typeof newBanner)
            const post = await blogService.updatePost(token, slug, blogUpdate);
            // console.log(post)
            router.push({
                pathname: `/blog/${slug}`,
                query: {
                    showToast: true,
                    message: "Cập nhật blog thành công"
                },
            }, `/blog/${slug}`);
        } catch (error) {
            toast.error('Cập nhật blog thất bại');
        }
    }

    return (
        <Sidebar>
            <div className="container overflow-y-scroll h-screen">
                <Typography.Title level={4} className="ml-2">Tiêu đề:</Typography.Title>
                <Input onChange={(e) => setTitle(e.target.value)} value={title} maxLength={300} showCount/>
                <Typography.Title level={4} className="ml-2 mt-4">Nội dung:</Typography.Title>
                <CreateContent content={content} handleContentChange={handleContentChange} pushPreview={pushPreview} />
            </div>
            {/* Modal */}
            <Modal
                open={showPreview}
                onCancel={() => setShowPreview(false)}
                footer={null}
                centered
                width="100%"
                style={{ top: 0 }}
                bodyStyle={{ height: "calc(100vh - 50px)", overflowY: "auto" }}
            >
                <div className="bg-white p-4">
                    <Preview
                        title={title}
                        content={content}
                        oldBanner={oldBanner}
                        newBanner={newBanner}
                        setNewBanner={setNewBanner}
                        tagList={tagList}
                        setTagList={setTagList}
                        saveBlog={saveBlog}
                    />
                </div>
            </Modal>
        </Sidebar>
    );
};
export default UpdateBlog;


