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
import { getListFollower, getListFollowing, getUserInfo } from "./../store/redux/actions/userAction";
import followService from "../services/followService"
import { Avatar } from "antd";
import { useRouter } from "next/router";

export default function ProfileOtherUser() {
    const router = useRouter();
    const token = Cookies.get("token") || "";
    const dispatch = useDispatch();
    const { blogs, pending } = useSelector((reduxData: any) => {
        return reduxData.sharingBlogReducers;
    });
    const [avatar, setAvatar] = useState("");
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [bio, setBio] = useState("");

    // get list followers
    const [followerList, setFollowerList] = useState([]);
    // get list following
    const [followingList, setFollowingList] = useState([]);

    // getInfo
    useEffect(() => {
        // 
    }, [token, username]);

    // get list followers
    useEffect(() => {
        const fetchFollower = async () => {
            const follower = await followService.getProfileByUsername(username)
            if (follower) {
                //console.log(follower)
                setFollowerList(follower.profile.listFollower)
                setFollowingList(follower.profile.listFollowing)
            }
        }
        fetchFollower(followerList, followingList);
    }, [username]);


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

    return (
        <ErrorBoundary fallback={<div>Loading...</div>}>
            <Sidebar>
                <ProfileFrame>
                    <ProfileHeader
                        fullname={fullname}
                        username={username}
                        // isFollow={}
                    >
                        <Avatar
                            size={128}
                            src={avatar}
                            alt="Avatar"
                            className="w-full h-full object-cover"
                        />
                    </ProfileHeader>

                    {/* Body */}
                    <ProfileGroupBox
                        bio={bio}
                        followerList={followerList}
                        handleViewFollowers={handleViewFollowers}
                        followingList={followingList}
                        handleViewFollowing={handleViewFollowing}
                    />

                    {/* Blogs */}
                    <ProfilePosts pending={pending} blogs={blogs} />
                </ProfileFrame>
            </Sidebar>
        </ErrorBoundary>

    );
}
