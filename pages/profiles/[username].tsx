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

export default function ProfileOtherUser() {
    const router = useRouter();
    const token = Cookies.get("token") || "";
    const dispatch = useDispatch();
    const {userDetail } = useSelector((reduxData: any) => {
		return reduxData.userReducer;
	});
     // trạng thái follow
     const [following,setFollowing] = useState(false)
     useEffect(() => {
		const fetchFollower =  async () => {
			const follower = await followService.getProfileByUsername(token,userDetail.username)
			if (follower) {
				setFollowing(follower.profile.following)
			}
		}
		fetchFollower();
   }, [userDetail,following]);

     const handleFollowUser = async () => {
         await followService.followUser(token,userDetail.username)
             .then((result) => {
                if(result) {
                    setFollowing(result.profile.following)
                    console.log("follow thành công")
                }
                console.log(result.profile.following)
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
                    console.log("unfollow thành công")
                }
                console.log(result.profile.following)
             })
             .catch((err) => {
                 message.error(err);
             })
             
     }
     console.log(following)
    return (
            <Sidebar>
                <ProfileFrame>
                    {/* <ProfileHeader
                        fullname={userDetail.fullname}
                        username={userDetail.username}
                        // isFollow={}
                    > */}
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
                    {/* </ProfileHeader> */}

                    {/* Body */}
                    {/* <ProfileGroupBox
                        bio={userDetail.bio}
                        // followerList={followerList}
                        // handleViewFollowers={handleViewFollowers}
                        // followingList={followingList}
                        // handleViewFollowing={handleViewFollowing}
                    /> */}
                    <div className="lg:flex-[30%] lg:mr-10 h-auto my-8 lg:max-w-[300px]">
                        <Typography.Title level={5}>Tiểu sử</Typography.Title>
                        <Card className="lg:p-2 mt-2 flex flex-col">
                            <p className="text-center flex-1 mt-2 break-words">{userDetail.bio}</p>
                        </Card>
                    </div>

                    {/* Blogs */}
                    {/* <ProfilePosts pending={pending} blogs={blogs} />*/}
                </ProfileFrame>               
            </Sidebar>
    );
}
