import { Avatar, Divider, Spin, Tag } from 'antd';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { getTimeDiffInWords } from '../../shared/format/formatTime';
import  followService  from '@/services/followService';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { getDetailUser } from "@/store/redux/actions/userAction";
import { useRouter } from 'next/router';
import { Blog } from '@/types';

interface Props {
    blog: Blog,
    className?: string,
}

export const BlogItem = ({ blog, className }: Props) => {
    // giới hạn content 150 chữ
    const router = useRouter();
    const previewContent: string = blog.content.substring(0, 200) + '...'
    const { user } = useSelector((reduxData: any) => {
        return reduxData.userReducer;
    });
    const dispatch = useDispatch();
    const token = Cookies.get("token") || "";
    const [userDetail, setUserDetail] = useState({})
    const [dataReady, setDataReady] = useState(false);
	useEffect(() => {
		const fetchGetProfileByUsername =  async () => {
			const fetchNotFollow = await followService.getProfileByUsername(token, blog.author.username)
			if (fetchNotFollow) {
				setUserDetail(fetchNotFollow.profile)
                setDataReady(true)
			}
		}
		fetchGetProfileByUsername()
   }, []);
    
      // ham call get page profile/username
    const handleViewProfileUser = async () => {
        if(dataReady) {
            dispatch(getDetailUser(userDetail))
            router.push(`/profile/${userDetail.username}`);
            //console.log(userDetail)
        }
    }
    return (
            <div className={`mb-8 w-full border rounded-xl border-gray-300 -z-10 py-2 ` + className}>
                <a 
                    // href={user.username !== blog.author.username ? `profile/${blog.author.username}` : `/profile`} 
                    onClick={handleViewProfileUser}
                    className="flex justify-left items-left hover:text-black mx-4">
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
                </a>
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
                        <span>Lượt bình luân: {blog.commentCount}</span>
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