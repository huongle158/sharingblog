import React, { useEffect, useState } from "react";
import { ErrorBoundary } from 'react-error-boundary';
import {
    Sidebar,
    ProfilePosts,
    ProfileGroupBox,
    ProfileHeader,
    ProfileFrame,
} from "@/components/index";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Typography, Card, Button, message } from "antd";
import { useRouter } from "next/router";
import followService from "@/services/followService";
import { ListUsers } from '@/components';
import { getListFollower } from "@/store/redux/actions/userAction";
import  blogService  from '@/services/blogService';
import { getAllBlogsUser } from "@/store/redux/actions/sharingblogAction";

export default function ProfileOtherUser() {
    const router = useRouter();
    const token = Cookies.get("token") || "";
    const dispatch = useDispatch();
    const {userDetail, user } = useSelector((reduxData: any) => {
		return reduxData.userReducer;
	});
    const { blogs, pending } = useSelector((reduxData: any) => {
		return reduxData.sharingBlogReducers;
	});
     // trạng thái follow
     const [following,setFollowing] = useState(false)
     const [followStatus,setFollowStatus] = useState({})
     useEffect(() => {
		const fetchFollower =  async () => {
			const follower = await followService.getProfileByUsername(token,userDetail.username)
			if (follower) {
				setFollowing(follower.profile.following)
			}
		}
		fetchFollower();
   }, [following,followStatus]);
      // danh sách follow, post
      // danh sách người đang follow user
	const [followerList, setFollowerList] = useState([]);
	// danh sách người user đó đang follow
	const [followingList, setFollowingList] = useState([]);
    useEffect(() => {
		const fetchFollower =  async () => {
			const follower = await followService.getProfileByUsername(token,userDetail.username)
			if (follower) {
				//console.log(follower)
				setFollowerList(follower.profile.listFollower)
				setFollowingList(follower.profile.listFollowing)
                setFollowStatus(follower.profile.following)
			}
            if( user.username === userDetail.username) {
                router.push("/profile")
            }
		}
        const fetchPostByUserDetail = async () => {
            await dispatch(getAllBlogsUser(token,undefined, userDetail.username));
        }
		fetchFollower();
        fetchPostByUserDetail();
   }, [userDetail.username,followStatus, following]);
     const handleFollowUser = async () => {
         await followService.followUser(token,userDetail.username)
             .then((result) => {
                if(result) {
                    setFollowing(result.profile.following)
                }
             })
             .catch((err) => {
                 message.error(err);
             })
     }

     const handleUnFollowUser = async () => {
         await followService.unfollowUser(token,userDetail.username)
             .then((result) => {
                if(result) {
                    setFollowing(result.profile.following)
                }
             })
             .catch((err) => {
                 message.error(err);
             })
             
     }
     // xem danh sách người theo dõi của user đó
     const handleViewFollowers = () => {
		dispatch(getListFollower(followerList))
		router.push({
			pathname: "/users",
			query: {
				title: "Danh sách người theo dõi",
				items: JSON.stringify(followerList),
			},
		});
	};
    // xem danh sách đang theo dõi của user đó
	const handleViewFollowing = () => {
		dispatch(getListFollower(followingList))
		router.push({
			pathname: "/users",
			query: {
				title: "Danh sách đang theo dõi",
				items: JSON.stringify(followingList),
			},
		});
	};
    const titleFollower = `Người theo dõi (${followerList.length})`
	const titleFollowing = `Đang theo dõi (${followingList.length})`
    return (
            <Sidebar>
                <ProfileFrame>
                    <div className="flex justify-center items-center mb-8">
                        <Avatar
                            size={128}
                            src={userDetail.avatar}
                            alt="Avatar"
                            className="w-32 h-32 object-cover mr-4"
                        />
                        <div>
                            <h1 className="text-3xl font-bold mb-1 mt-1">{userDetail.fullname}</h1>
                            <p className="mb-2">@{userDetail.username}</p>
                            { following  ?
                                <Button
                                onClick = {handleUnFollowUser}>Đang theo dõi</Button>
                                :
                                <Button type="primary" 
                                onClick = {handleFollowUser}>Theo dõi</Button>
                            }
                            
                        </div>
                    </div>
                    {/* Body */}
                    <div className="lg:flex w-full">
                        <div className="lg:flex-[30%] lg:mr-10 h-auto my-8 lg:max-w-[300px]">
                            <Typography.Title level={5}>Tiểu sử</Typography.Title>
                            <Card className="lg:p-2 mt-2 flex flex-col">
                                <p className="text-center flex-1 mt-2 break-words">{userDetail.bio}</p>
                            </Card>
                        </div>
                         {/* Followers */}
                        <div className="lg:flex-[33%] my-8 mr-8">          
                            <ListUsers
                                title={titleFollower}
                                users={followerList}
                                onClickButton={handleViewFollowers}
                            />
                        </div>
                        {/* Following */}
                        <div className="lg:flex-[33%] my-8">
                            <ListUsers
                            title={titleFollowing}
                            users={followingList}
                            onClickButton={handleViewFollowing}
                            />
                        </div>
                    </div>

                    {/* Blogs */}
                    {
                        followStatus ?
                        <ProfilePosts pending={pending} blogs={blogs} />
                        :
                        <div className="bg-gray-100 p-4 text-black mt-5">
                            Hãy theo dõi để có thể xem các bài viết của User này
                        </div>
                    }
                </ProfileFrame>               
            </Sidebar>
    );
}
