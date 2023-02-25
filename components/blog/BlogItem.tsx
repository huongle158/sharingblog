import { CommentOutlined } from '@ant-design/icons';
import { Avatar, Card, Tag } from 'antd';

interface Blogs {
    title: string;
    content: string;
    image: string;
    tags: string[];
    time: string;
}

export const BlogItem: React.FC<Blogs> = ({ title, content, image, tags, time }) => {
    return (
        <Card
            className="mb-8 w-full"
            title={
                <a href="#" className="flex justify-left items-left hover:text-black">
                    <div className="mr-4">
                        <Avatar
                            size={36}
                            src="https://img.freepik.com/free-vector/cute-chick-bite-knife-cartoon-vector-icon-illustration-animal-nature-icon-concept-isolated-premium-vector-flat-cartoon-style_138676-4216.jpg?w=1380&t=st=1677256095~exp=1677256695~hmac=0149fa8211014395c1fac56ad159b39254a380729278eeb9e877fab0d12d6136"
                            alt="Avatar"
                        />
                    </div>
                    <div>
                        <h5 className="text-xl font-bold mb-2">Lu Nguyen</h5>
                    </div>
                </a>
            }>
            <h1 className="text-xl font-bold mb-2">{ title }</h1>
            <a href="#" className="lg:flex h-fit hover:text-black">
                <p className="lg:flex-1 mb-4">{content}</p>
                <div className="lg:flex-2">
                    <img src={image} alt="Post" className="w-40 rounded-lg object-cover"/>
                </div>
            </a>
            <div className="flex mt-4 mb-4">
                <div className="flex-1">
                    {tags.map((tag, index) => (
                        <a key={index} href="#"><Tag>{tag}</Tag></a>
                    ))}
                </div>
                <div>
                    <a href="#"><CommentOutlined /> Comments (25)</a>
                </div>
            </div>
            <i>Posted on {time}</i>
        </Card>
    );
};
