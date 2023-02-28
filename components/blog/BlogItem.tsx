import { CommentOutlined, HeartFilled, HeartOutlined } from '@ant-design/icons';
import { Avatar, Card, Tag } from 'antd';

interface Props {
    blog: Blog
}

interface Blog {
    title: string,
    content: string,
    image: string,
    time: string,
    tags: string[],
    author: {
        name: string,
        avatar: string
    }
}


export const BlogItem = ({ blog }: Props) => {
    return (
        <Card
            className="mb-8 w-full border-gray-200 -z-10"
            title={
                // Header card
                <a href="#" className="flex justify-left items-left hover:text-black">
                    <div className="mr-4">
                        <Avatar
                            size={36}
                            src={blog.author.avatar}
                            alt="Avatar"
                        />
                    </div>
                    <div>
                        <h5 className="text-xl font-bold mb-2">{blog.author.name}</h5>
                    </div>
                </a>
            }>

            {/* Body card */}
            <h1 className="text-xl font-bold mb-2">{blog.title}</h1>
            <a href="#" className="lg:flex h-fit hover:text-black">
                <p className="lg:flex-1 mb-4 lg:mr-2">{blog.content}</p>
                <div className="lg:flex-2">
                    <img src={blog.image} alt="Post" className="w-40 rounded-lg object-cover" />
                </div>
            </a>
            <div className="mt-4">
                <span>Chủ đề: </span>
                {blog.tags.map((tag, index) => (
                    <a key={index} href="#"><Tag>{tag}</Tag></a>
                ))}
            </div>


            {/* Footer card */}
            <div className="flex mt-5 mb-2">
                <div className="flex-1">
                    {/* unlike */}
                    <a href="#" className="hover:text-gray-400 mr-2"><HeartOutlined className="border-black text-lg" /> 22</a>
                    {/* liked */}
                    <a href="#" hidden className="mr-2"><HeartFilled className="text-red-600 text-lg" /> 23</a>

                    {/* comments */}
                    <a href="#" className="hover:text-gray-400"><CommentOutlined className="text-lg" /> 25</a>
                </div>

                <div>
                    <p className="text-gray-400 italic">Đăng ngày {blog.time}</p>
                </div>
            </div>
        </Card>
    );
};