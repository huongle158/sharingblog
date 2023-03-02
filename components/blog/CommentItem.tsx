import { Avatar, Typography } from "antd"

interface Props {
    onClickReply: () => void,
    onClickEdit: () => void,
    onClickDelete: () => void,
    content: string,
    user: {
        name: string,
        avatar: string
    }
}

export const CommentItem = ({ onClickReply, onClickEdit, onClickDelete, content, user }: Props) => {
    return (
        <div className="p-2 mt-3">
            <div className="bg-gray-100 p-4 rounded-3xl">
                <div>
                    <a href="#" className="flex justify-left items-left hover:text-black">
                        <div className="mr-2">
                            <Avatar
                                size={36}
                                src={user.avatar}
                                alt={user.avatar}
                            />
                        </div>
                        <Typography.Title level={5} className="mt-1">{user.name}</Typography.Title>
                    </a>
                </div>
                <div className="px-12">
                    <p>{content}</p>
                </div>
            </div>
            <div className="pl-16 mt-1 text-xs text-gray-500 font-bold space-x-4">
                <a onClick={onClickReply}>Trả lời</a>
                <a onClick={onClickEdit}>Chỉnh sửa</a>
                <a onClick={onClickDelete}>Xoá</a>
            </div>
        </div>
    )
}