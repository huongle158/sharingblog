import blogService from '@/services/blogService';
import { CommentOutlined, EllipsisOutlined, HeartFilled, HeartOutlined } from '@ant-design/icons';
import { Avatar, Card, Divider, Dropdown, MenuProps, Spin, Tag, Typography } from 'antd';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-toastify';
import ModalDeleteBlog from '../modals/ModalDeleteBlog';
import { getTimeDiffInWords } from './../formatTime';

interface Props {
    blog: Blog,
    className?: string,
}

interface Blog {
    article: {
        slug: string,
        title: string,
        content: string,
        banner: string,
        tagList: string[],
        createdAt: string,
        updatedAt?: string,
        author: {
            avatar: string,
            bio?: string,
            email?: string,
            fullname: string,
            id?: number,
            username?: string,
        },
        favoritesCount: number,
    }
    favoriteStatus: boolean,
}

export const BlogDetails = ({ blog, className }: Props) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const token = Cookies.get('token') || '';
    const router = useRouter()

    const items: MenuProps['items'] = [
        {
            label: <Link href={`/blog/update/${blog.article.slug}`} >Chỉnh sửa</Link>,
            key: 0

        },
        {
            label: <a onClick={() => setShowDeleteModal(true)} >Xoá</a>,
            key: 2

        }
    ]
    const handleDeleteBlog = async () => {
        try {
            const result = await blogService.deletePost(token, blog.article.slug)
            if (result.statusCode === 404) {
                router.push({
                    pathname: "/profile",
                    query: {
                        showToast: true,
                        error: "Xoá bài viết không thành công! Bài viết không tồn tại!"
                    }
                }, "/profile")
            }
            else {
                router.push({
                    pathname: "/profile",
                    query: {
                        showToast: true,
                        message: "Bạn đã xoá bài viết thành công!"
                    }
                }, "/profile")
            }
        }
        catch (e) {
            toast.error("Thao tác xoá thất bại! Vui lòng load lại trang!")
        }
    }

    const [isFavorite, setIsFavorite] = useState(blog.favoriteStatus)

    const handleFavorite = async () => {
        try {
            await blogService.favoritePost(token, blog.article.slug)
            setIsFavorite(!isFavorite)

        } catch (err) {
            toast.error("Lỗi: " + err)
        }
    }

    const handleUnFavorite = async () => {
        try {
            await blogService.unFavoritePost(token, blog.article.slug)
            setIsFavorite(!isFavorite)

        } catch (err) {
            toast.error("Lỗi: " + err)
        }
    }

    return (
        <div className={`mb-8 w-full border rounded-xl border-gray-300 -z-10 py-2 ` + className}>
            {/* Header card */}
            <div className="flex">
                <Link href="#" className="flex-1 flex justify-left items-left hover:text-black mx-4">
                    <div className="mr-4 mt-1">
                        <Avatar
                            size={36}
                            src={blog.article.author.avatar}
                            alt="Avatar"
                        />
                    </div>
                    <div>
                        <Typography.Title level={4} className="font-bold mb-1">{blog.article.author.fullname}</Typography.Title>
                        <h5 className="text-gray-500 mb-1">@{blog.article.author.username}</h5>
                        <p className="text-gray-500 font-normal italic text-sm">{getTimeDiffInWords(blog.article.createdAt)}</p>
                    </div>
                </Link>
                <Dropdown menu={{ items }} trigger={['click']} arrow={{ pointAtCenter: true }} placement="bottomRight">
                    <a className="flex-4 w-auto flex justify-end mr-8 pt-4"><EllipsisOutlined className="text-3xl text-gray-600" /></a>
                </Dropdown>
            </div> 
            <Divider className="border-gray-300" />

            {/* Body card */}
            <div className="h-fit px-6 py-2">
                <h1 className="text-xl font-bold mb-2 text-center">{blog.article.title}</h1>
                <div className="lg:flex-2 flex justify-center">
                    <img src={blog.article.banner} alt="Post" className="w-40 rounded-lg object-cover" />
                </div>
                <div className="mb-4 lg:mr-2 content"
                        dangerouslySetInnerHTML={{__html: blog.article.content}}
                    />
            </div>

            <Divider className="border-gray-300" />

            {/* Footer card */}
            <div className="flex px-6 pb-4">
                <div className="flex-1">
                    {/* is favorite */}
                    {
                        isFavorite ? (
                            <><a onClick={handleUnFavorite}><HeartFilled className="text-red-600 text-[22px]" /></a> {blog.article.favoritesCount}</>
                        ) : (
                            <><a onClick={handleFavorite} className="hover:text-gray-400"><HeartOutlined className="border-black text-[22px]" size={20} /></a> {blog.article.favoritesCount}</>
                        )
                    }

                    {/* comments */}
                    <a href="#" className="hover:text-gray-400 ml-4"><CommentOutlined className="text-[22px]" /></a> 25
                </div>

                <div className='flex-1'>
                    <span>Chủ đề: </span>
                    {blog.article.tagList && blog.article.tagList.map((tag, index) => (
                        <a key={index} href="#"><Tag>{tag}</Tag></a>
                    ))}
                </div>
            </div> 
            {/* Modal delete */}
            <ModalDeleteBlog
                showModal={showDeleteModal}
                setShowModal={setShowDeleteModal}
                handleDeleteBlog={handleDeleteBlog}
            />
        </div>
    );
};