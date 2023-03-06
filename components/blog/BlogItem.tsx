import { CommentOutlined, HeartFilled, HeartOutlined } from '@ant-design/icons';
import { Avatar, Divider, Spin, Tag } from 'antd';
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
    // giới hạn content 150 chữ
    const previewContent: string = blog.content.substring(0, 200) + '...'

    return (
            <div className={`mb-8 w-full border rounded-xl border-gray-300 -z-10 py-2 ` + className}>
                    <a href="#" className="flex justify-left items-left hover:text-black mx-4">
                        <div className="mr-4 mt-1">
                            <Avatar
                                size={36}
                                src={blog.author.avatar}
                                alt="Avatar"
                            />
                        </div>
                        <div>
                            <h5 className="text-xl font-bold mb-1">{blog.author.fullname}</h5>
                            <p className="text-gray-500 mb-2 font-bold text-sm">{blog.author.username}</p>
                            <p className="text-gray-500 mb-2 font-normal italic text-sm">{getTimeDiffInWords(blog.createdAt)}</p>
                        </div>
                    </a>
                <Divider className="border-gray-300"/>
                {/* Body card */}
                <div className="px-6">
                    <a href={`/blog/${blog.slug}`} className="h-fit hover:text-black content">
                        <h1 className="text-xl font-bold mb-2">{blog.title}</h1>
                        <div className="lg:flex">
                            <div className="lg:flex-1 mb-4 lg:mr-2 "
                                    dangerouslySetInnerHTML={{__html: previewContent}}
                                />
                            <div className="lg:flex-2">
                                <img src={blog.banner} alt="Post" className="w-40 rounded-lg object-cover" />
                            </div>
                        </div>
                    </a>
                </div>
                <Divider className="border-gray-300"/>
                {/* Footer card */}
                <div className="flex my-3 mx-4">
                    <div className="flex-1">
                        {/* unlike */}
                        <a href="#" className="hover:text-gray-400"><HeartOutlined className="border-black text-[22px]" size={20} /></a> 22
                        {/* liked */}
                        {/* <a href="#"><HeartFilled className="text-red-600 text-[22px]" /></a> 23 */}

                        {/* comments */}
                        <a href="#" className="hover:text-gray-400 ml-4"><CommentOutlined className="text-[22px]" /></a> 25
                    </div>

                    <div className='flex-1'>
                        <span>Chủ đề: </span>
                        {blog.tagList && blog.tagList.map((tag, index) => (
                            <a key={index} href="#"><Tag>{tag}</Tag></a>
                        ))}
                    </div>
                </div> 
            </div>
    );
};