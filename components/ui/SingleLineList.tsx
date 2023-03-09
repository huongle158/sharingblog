import { Avatar, Button, Image, List, message, Typography } from "antd"
import Cookies from "js-cookie"
import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import followService from './../../services/followService';
import { useDispatch, useSelector } from "react-redux";
import { getDetailUser } from "@/store/redux/actions/userAction";

export const SingleLineList = ({ user, title }: any) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const token = Cookies.get("token") || "";

    // trạng thái follow
    const [following,setFollowing] = useState(false)
    useEffect(() => {
		const fetchFollower =  async () => {
			const follower = await followService.getProfileByUsername(token,user.username)
			if (follower) {
				setFollowing(follower.profile.following)
			}
		}
		fetchFollower();
   }, [user,following]);
    const handleFollowUser = async () => {
        await followService.followUser(token,user.username)
			.then((result) => {
                setFollowing(result.profile.following)
                console.log(following)
			})
			.catch((err) => {
				message.error(err);
			})
    }
    const handleUnFollowUser = async () => {
        await followService.unfollowUser(token,user.username)
			.then((result) => {
                setFollowing(result.profile.following)
                console.log("unfollow thành công")
			})
			.catch((err) => {
				message.error(err);
			})
    }
    // ham call get page profiles/username
    const handleViewProfileUser = async () => {;
        dispatch(getDetailUser(user))
            router.push({
                pathname: '/profiles/[username]',
                query: {
                    username: user.username
                }
            });
            
    }
    return (
<List.Item className="flex items-center justify-between">
  <div className="flex items-center">
    <a className="cursor-default hover:cursor-pointer" onClick={handleViewProfileUser}>
      <Avatar size={48} src={user.avatar} />
      <Typography.Text className="ml-2">
        <strong>{user.username}</strong> {title === null ? '' : title}
      </Typography.Text>
    </a>
  </div>
  <div>
    {following ? (
      <Button type="primary" onClick={handleUnFollowUser}>
        Bỏ Theo dõi
      </Button>
    ) : (
      <Button type="primary" onClick={handleFollowUser}>
        Theo dõi
      </Button>
    )}
  </div>
</List.Item>

    )
}