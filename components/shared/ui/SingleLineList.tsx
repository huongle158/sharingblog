import { Avatar, Button, Image, List, message, Typography } from "antd"
import Cookies from "js-cookie"
import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import followService from '../../../services/followService';
import { useDispatch, useSelector } from "react-redux";
import { getDetailUser } from "@/store/redux/actions/userAction";
import { BASE_URL_AVATAR } from "@/utils/url";

export const SingleLineList = ({
  userDetail,
  // notification
}: any) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const token = Cookies.get("token") || "";
  const { user } = useSelector((reduxData: any) => {
		return reduxData.userReducer;
	});

  // trạng thái follow
  const [following, setFollowing] = useState(false)
  useEffect(() => {
    const fetchFollower = async () => {
      const follower = await followService.getProfileByUsername(token, userDetail.username)
      if (follower) {
        setFollowing(follower.profile.following)
      }
    }
    fetchFollower();
  }, [userDetail, following]);
  const handleFollowUser = async () => {
    await followService.followUser(token, userDetail.username)
      .then((result) => {
        setFollowing(result.profile.following)
      })
      .catch((err) => {
        message.error(err);
      })
  }
  const handleUnFollowUser = async () => {
    await followService.unfollowUser(token, userDetail.username)
      .then((result) => {
        setFollowing(result.profile.following)
      })
      .catch((err) => {
        message.error(err);
      })
  }
  // ham call get page profile/username
  const handleViewProfileUser = async () => {
    dispatch(getDetailUser(userDetail))
    router.push(`/profile/${userDetail.username}`);

  }
  return (
    <List.Item className="flex items-center justify-between">
      <div className="flex items-center">
        <a className="cursor-default hover:cursor-pointer flex" onClick={handleViewProfileUser}>

          <Avatar size={48} src={userDetail.avatar !== BASE_URL_AVATAR ? userDetail.avatar : "https://i.ibb.co/XWHftvG/sbcf-default-avatar.png"} />
          <div>
            <Typography.Text className="ml-2 font-bold">{userDetail.fullname}</Typography.Text><br />
            <Typography.Text className="ml-2">
              @{userDetail.username}
              {/* {notification && notification.message} */}
            </Typography.Text>
          </div>
        </a>
      </div>
      <div>
        {
          // notification && <Image src={notification.article.image} alt={notification.article.image} preview={false} width="40px" height="40px" />
          // ||
          user.username !== userDetail.username && (
            following ? (
              <Button onClick={handleUnFollowUser}>
                Đang theo dõi
              </Button>
            ) : (
              <Button type="primary" onClick={handleFollowUser}>
                Theo dõi
              </Button>
            )
          )
        }
      </div>
    </List.Item>

  )
}