import { User } from "@/types"
import { EditOutlined } from "@ant-design/icons"
import { Card, Typography } from "antd"
import { ListUsers } from "./ListUsers"

interface Props {
    showBioModal?: () => void,
    bio: string,
    followerList: User[],
    handleViewFollowers: () => void,
    followingList: User[],
    handleViewFollowing: () => void,
}
export const ProfileGroupBox = ({
    showBioModal,
    bio,
    followerList,
    handleViewFollowers,
    followingList,
    handleViewFollowing
}: Props) => {
    const titleFollower = `Người theo dõi (${followerList.length})`
	const titleFollowing = `Đang theo dõi (${followingList.length})`
    return (
        <div className="lg:flex w-full">
            {/* Bio */}
            <div className="lg:flex-[30%] lg:mr-10 h-auto my-8 lg:max-w-[300px]">
                <Typography.Title level={5}>Tiểu sử</Typography.Title>
                <Card className="lg:p-2 mt-2 flex flex-col">
                    <div className="flex-1 flex flex-col items-end">
                        { showBioModal && <EditOutlined size={4} onClick={showBioModal} /> }
                    </div>
                    <p className="text-center flex-1 mt-2 break-words">{bio}</p>
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
    )
}