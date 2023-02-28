import { Avatar, Button, Image, List, Typography } from "antd"
import { FC } from "react"

interface Props {
    user: {
        name: string,
        avatar: string
    },
    title?: string,
    image?: string
}

export const SingleLineList: FC<Props> = ({ user, title, image }) => {
    return (
        <a href="#">
            <List.Item className="flex">
                <div className="justify-items-start w-[84%]">
                    <Avatar size={48} src={user.avatar} />
                    <Typography.Text className="ml-2"><strong>{user.name}</strong> {title === null ? '' : title}</Typography.Text>
                </div>
                {image !== null
                    ? (<div className="justify-items-end w-[12%]">
                        <Image src={image} alt={title} preview={false} />
                    </div>)
                    : ''
                }
            </List.Item>
        </a>
    )
}