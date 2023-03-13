import { User } from "@/types"
import { Button, List, Typography } from "antd"
import { FC } from "react"
import { SingleLineList } from "../../shared/ui/SingleLineList"

interface Props {
    users: User[],
    title?: string,
    onClickButton?: () => void,
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
                    <SingleLineList userDetail={item} />
                )}
            />
        </div>
    )
}