import { Avatar, Button, List, Typography } from "antd"
import { FC } from "react"
import { SingleLineList } from "../ui/SingleLineList"

interface Props {
    users: Users[],
    title?: any,
    onClickButton?: () => void,
}

interface Users {
    name: string,
    avatar: string
}

export const ListUsers: FC<Props> = ({ users, title, onClickButton }) => {
    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <Typography.Title level={5}>{title}</Typography.Title>
                <Button onClick={onClickButton}>Xem tất cả</Button>
            </div>
            <List
                dataSource={users.slice(0, 3)}
                renderItem={(item) => (
                    <SingleLineList user={item} />
                )}
            />
        </div>
    )
}