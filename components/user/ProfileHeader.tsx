import { EditOutlined } from "@ant-design/icons"
import { Button } from "antd"
import { ReactNode } from "react"

interface Props {
    children: ReactNode,
    fullname: string,
    username: string,
    showInfoModal?: () => void,
    handleFollow?: () => void,
    handleUnFollow?: () => void,
    // isFollow?: boolean,
}

export const ProfileHeader = ({ children, fullname, username, showInfoModal, handleFollow, handleUnFollow }: Props) => {
    console.log(showInfoModal)
    return (
        <div className="flex justify-center items-center mb-8">
            {/* Avatar */}
            <div className="mr-4">
                {children}
            </div>
            {/* Info */}
            <div>
                <h1 className="text-3xl font-bold mb-1 mt-1">{fullname}</h1>
                <p className="mb-2">@{username}</p>
                {
                    !showInfoModal && (
                        <Button type="primary" onClick={handleFollow}>Theo dõi</Button>
                        // <Button onClick={handleUnFollow}>Đang theo dõi</Button>
                    )
                }
            </div>
            <EditOutlined size={4} onClick={showInfoModal} />
        </div>
    )
}