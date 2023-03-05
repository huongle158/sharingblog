import { CommentOutlined, HeartFilled, HeartOutlined } from '@ant-design/icons';
import { Avatar, Card, Spin, Tag } from 'antd';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { getTimeDiffInWords } from './../formatTime';
interface Props {
    blog: Blog,
    className?: string,
}

interface Blog {
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
    }
}

export const BlogItem = ({ blog, className }: Props) => {
    const router = useRouter()
    // giới hạn content 150 chữ
    const previewContent: string = blog.content.substring(0, 600) + '...'
    const handleBlogDetails = () => {
        router.push(`/blog/${blog.slug}`)
    }

    return (
        <a onClick={handleBlogDetails}>
            <Card
                className={`mb-8 w-full border-gray-200 -z-10 ` + className}
                title={
                    // Header card
                    <a className="flex justify-left items-left hover:text-black mt-2">
                        <div className="mr-4 mt-1">
                            <Avatar
                                size={36}
                                // src={blog.author.avatar}
                                src=" https://anhhd.com/wp-content/uploads/2021/10/Chiem-nguong-89-avatar-dep-nhat-co-luong-dowload-nhieu-nhat.jpg"
                                alt="Avatar"
                            />
                        </div>
                        <div>
                            <h5 className="text-xl font-bold mb-1">{blog.author.fullname}</h5>
                            <p className="text-gray-500 mb-2 font-normal italic text-sm">{getTimeDiffInWords(blog.createdAt)}</p>
                        </div>
                    </a>
                }>

                {/* Body card */}
                <h1 className="text-xl font-bold mb-2">{blog.title}</h1>
                <a className="lg:flex h-fit hover:text-black content">
                    <div className="lg:flex-1 mb-4 lg:mr-2 "
                            dangerouslySetInnerHTML={{__html: previewContent}}
                        />
                    <div className="lg:flex-2">
                        <img src={blog.banner} alt="Post" className="w-40 rounded-lg object-cover" />
                    </div>
                </a>
                {/* <h1 className="text-xl font-bold mb-2">{blog.title}</h1>
                <a href="#" className="lg:flex h-fit hover:text-black content">
                    <div className="lg:flex-1 mb-4 lg:mr-2 "
                            dangerouslySetInnerHTML={{__html: previewContten}}
                        />
                    <div className="lg:flex-2">
                        <img src={blog.banner} alt="Post" className="w-40 rounded-lg object-cover" />
                    </div>
                </a> */}
            </Card>
        </a>
    );
};