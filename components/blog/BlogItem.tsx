import blogService from '@/services/blogService';
import { getBlogBySlug } from '@/store/redux/actions/sharingblogAction';
import { Avatar, Divider, Spin, Tag } from 'antd';
import Link from 'next/link';
import { useSelector } from 'react-redux';
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
    favoritesCount: number,
    // favoriteStatus: boolean,
}

export const BlogItem = ({ blog, className }: Props) => {
    // giới hạn content 150 chữ
    const previewContent: string = blog.content.substring(0, 200) + '...'
    const { user } = useSelector((reduxData: any) => {
        return reduxData.userReducer;
    });

    return (
            <div className={`mb-8 w-full border rounded-xl border-gray-300 -z-10 py-2 ` + className}>
                <Link href={user.username !== blog.author.username ? `profiles/${blog.author.username}` : `/profile`} className="flex justify-left items-left hover:text-black mx-4">
                    <div className="mr-4 mt-1">
                        <Avatar
                            size={36}
                            src={blog.author.avatar}
                            alt="Avatar"
                        />
                    </div>
                    <div>
                        <h5 className="text-xl font-bold mb-1">{blog.author.fullname}</h5>
                        <p className="text-gray-500 mb-2 text-sm">@{blog.author.username}</p>
                        <p className="text-gray-500 mb-2 font-normal italic text-sm">{getTimeDiffInWords(blog.createdAt)}</p>
                    </div>
                </Link>
                <Divider className="border-gray-300"/>
                {/* Body card */}
                <div className="px-6">
                    <Link href={`/blog/${blog.slug}`} className="h-fit hover:text-black content">
                        <h1 className="text-xl font-bold mb-2">{blog.title}</h1>
                        <div className="lg:flex">
                            <div className="lg:flex-1 mb-4 lg:mr-2 "
                                    dangerouslySetInnerHTML={{__html: previewContent}}
                                />
                            <div className="lg:flex-2">
                                <img src={blog.banner} alt="Post" className="w-60 h-40 rounded-lg object-cover" />
                            </div>
                        </div>
                    </Link>
                </div>
                <Divider className="border-gray-300"/>
                {/* Footer card */}
                <div className="flex my-3 mx-4">
                    <div className="flex-1">
                        {/* favorite */}
                        <span className="mr-4">Lượt thích: {blog.favoritesCount}</span>
                        
                        <span className="mr-4">-</span>
                        {/* comments */}
                        <span>Lượt bình luận: 25</span>
                    </div>

                    <div className='flex-1'>
                        <span>Chủ đề: </span>
                        {blog.tagList && blog.tagList.map((tag, index) => (
                            <a key={index} onClick={() => { }}><Tag>{tag}</Tag></a>
                        ))}
                    </div>
                </div> 
            </div>
    );
};