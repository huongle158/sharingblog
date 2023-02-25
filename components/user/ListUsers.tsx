import { Avatar, Button, List, Typography } from "antd"
import { FC } from "react"

interface Props {
    users: Users[]
}

interface Users {
    name: string,
    avatar: string,
    mutualFriends: number
}

export const ListUsers: FC<Props> = ({users}) => {
    return (
        <>
            <div className="flex justify-between items-center mb-4">
                <Typography.Title level={5}>Friends (255)</Typography.Title>
                <Button>View All</Button>
            </div>
            <List
                dataSource={users}
                renderItem={(item) => (
                    <List.Item className="flex">
                        <div className="justify-items-start">
                            <Avatar size={48} src={item.avatar} />
                            <Typography.Text className="ml-2" strong>{item.name}</Typography.Text>
                        </div>
                        <div className="justify-items-end">
                            <Typography.Text type="secondary">
                                {item.mutualFriends} mutual friends
                            </Typography.Text>
                        </div>
                    </List.Item>
                )}
            />
        </>
    )
}