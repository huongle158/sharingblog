import { Avatar, Typography } from "antd"
import { getTimeDiffInWords } from '../../shared/format/formatTime';
import { useSelector } from 'react-redux';

interface Props {
    onClickReply: () => void,
    onClickEdit: () => void,
    onClickDelete: () => void,
    content: string,
    userDetail: {
        username: string,
        avatar: string
    },
    createdAt: any,
    updatedAt: any
}

export const CommentItem = ({ onClickReply, onClickEdit, onClickDelete, content, userDetail, createdAt, updatedAt }: Props) => {
    const { user }: any = useSelector((reduxData: any) => {
		return reduxData.userReducer;
	});
    return (
        <div className="p-2 mt-3">
            <div className="bg-gray-100 p-4 rounded-3xl">
                <div>
                    <a href="#" className="flex justify-left items-left hover:text-black">
                        <div className="mr-2">
                            <Avatar
                                size={36}
                                src={userDetail.avatar == "" ? userDetail.avatar : "https://i.ibb.co/XWHftvG/sbcf-default-avatar.png"}
                                alt={userDetail.avatar}
                            />
                        </div>
                        <Typography.Title level={5} className="mt-1">{userDetail.username}</Typography.Title>
                    </a>
                </div>
                <div className="px-12">
                    <p>{content}</p>
                </div>
            </div>
            <div className="pl-16 mt-1 text-xs text-gray-500 font-bold space-x-4">
                {/* <a onClick={onClickReply}>Trả lời</a> */}
                {user.username == userDetail.username ?
                    <>
                        <a onClick={onClickEdit}>Chỉnh sửa</a>
                        <a onClick={onClickDelete}>Xoá</a>
                    </>
                :  <span style={{ display: 'none' }}></span>
                }
                {createdAt === updatedAt ?
                <span className="inline-block align-middle ml-2 text-gray-400">{getTimeDiffInWords(createdAt)}</span>
                :
                <span className="inline-block align-middle ml-2 text-gray-400">Đã chỉnh sửa {getTimeDiffInWords(updatedAt)}</span>
                }
                
            </div>
        </div>
    )
}