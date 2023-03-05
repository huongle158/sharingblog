import React, { useEffect, useState } from "react";
import { Sidebar } from "@/components/layouts/Sidebar";
import { useDispatch } from "react-redux";
import blogService from "@/services/blogService";
import { Input, message, Modal } from "antd";
import { useRouter } from "next/router";
import { getBlogBySlug, getContentNewBlog } from "@/store/redux/actions/sharingblogAction";
import CreateContent from "@/components/blog/CreateContent";
import Cookies from "js-cookie";
import Preview from "@/components/blog/Preview";
import { toast } from "react-toastify";

const UpdateBlog = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const token = Cookies.get("token") || ""
    
    const { slug } = router.query
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [banner, setBanner] = useState("");
    const [tagList, setTagList] = useState([]);

    const handleContentChange = (value: string) => {
        setContent(value);
    };
    
    useEffect(() => {
        const fetchBlogDetail = async () => {
            const blogDetail = await blogService.getPostBySlug(token, slug)
            if (blogDetail && blogDetail.article) {
                setContent(blogDetail.article.content)
                setTitle(blogDetail.article.title)
                setBanner(blogDetail.article.banner)
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

    const saveBlog = async () => {
        const token = Cookies.get('token') || "";
        if (banner === "") {
            message.error('Avatar Blog không được để trống');
            return false
        }
        const newBlog = {
            title: title,
            content: content,
            banner: banner,
            tagList: tagList,
        };
        try {
            const post = await blogService.updatePost(token, slug, newBlog);
            console.log(post)
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
                <Input onChange={(e) => setTitle(e.target.value)} value={title} />
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
                        fileImage={banner}
                        setFileImage={setBanner}
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


