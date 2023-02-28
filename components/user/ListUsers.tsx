import { Avatar, Button, List, Typography } from "antd"
import { FC } from "react"
import { SingleLineList } from "../ui/SingleLineList"

interface Props {
    users: Users[],
    title?: string
}

interface Users {
    name: string,
    avatar: string
}

export const ListUsers: FC<Props> = ({users, title}) => {
    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <Typography.Title level={5}>{title}</Typography.Title>
                <Button>Xem tất cả</Button>
            </div>
            <List
                dataSource={users}
                renderItem={(item) => (
                    <SingleLineList user={item} />
                )}
            />
        </div>
    )
}