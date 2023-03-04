import React, { useEffect, useState } from 'react'
import { UploadOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, FloatButton, message, Row, Typography, Upload } from 'antd'
import { RcFile, UploadFile } from 'antd/es/upload';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import CheckBoxGrid from '@/components/ui/CheckBoxGrid';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import blogService from '../services/blogService';
import { useRouter } from "next/router";
import tagService from '@/services/tagService';
import { getAllTags } from '@/store/redux/actions/tagAction';
import { toast } from "react-toastify";

const Preview = () => {
    const router = useRouter();
    const { newTitle, newContent } = useSelector((reduxData: any) => {
        return reduxData.sharingBlogReducers
    })
    const [fileImage, setFileImage] = useState("") // image file upload
    const [isValidFileImage, setIsValidFileImage] = useState(false); // to prevent show image on error

    // Check before upload file image type
    const beforeUpload = (file: RcFile) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('Bạn chỉ có thể upload file có đuôi png hoặc jpg!');
            setIsValidFileImage(false)
            return false
        }
        setFileImage(file)
        setIsValidFileImage(true)
        return true;
    };
    const [tagList, setTagList] = useState([])
    const onChangeCheckBox = (checkedValues: CheckboxValueType[]) => {
        setTagList(checkedValues)
    };
    const onClickCreateBlog = async () => {
        const token = Cookies.get('token') ;
        if(fileImage === "") {
            message.error('Avatar Blog không được để trống');
            return false
        }
        const newBlog = {
            title: newTitle,
            content: newContent,
            banner: fileImage,
            tagList: tagList,
        };
        try {
            const post = await blogService.createPost(token, newBlog);
            console.log(post);
            router.push("/profile");
            toast.success('Tạo bài Blog thành công');
          } catch (error) {
            console.error(error);
            toast.error('Tạo bài Blog thất bại');
          }
    }

    const [tags, setTags] = useState([])
    useEffect(() => {
        const fetchTags = async () => {
            const allTags = await tagService.getAllTags()
            if (allTags && allTags.tags) {
                setTags(allTags.tags)
                getAllTags()
            }
        }
        fetchTags()
    }, []);

    return (
        <div className='flex py-8 px-10'>
            {/* Left part */}
            <div className='w-1/2 p-10'>
                {/* Preview title, content */}
                <Typography.Title level={3}>Xem trước</Typography.Title>
                <div className='mt-10 max-w-full'>
                    <Typography.Title level={4} className="text-center">{newTitle} </Typography.Title>
                    {newContent && (
                    <div className="mt-4 lg:max-h-96 overflow-scroll review" 
                        dangerouslySetInnerHTML={{__html: newContent}} 
                    />
                    )}
                    </div>
            </div>

            {/* Right part */}
            <div className='w-1/2 p-10'>
                {/* Add image */}
                <div className='h-40'>
                    <Typography.Title level={3} className='mb-4'>Thêm hình ảnh</Typography.Title>
                    <Upload
                        maxCount={1}
                        listType="picture"
                        beforeUpload={beforeUpload}
                        className="upload-list-inline"
                        showUploadList={isValidFileImage}
                    >
                        <Button icon={<UploadOutlined />}>Upload</Button>
                    </Upload>
                </div>

                {/* Add tags */}
                <div className='mt-2'>
                    <CheckBoxGrid title='Thêm tags' items={tags} onChange={onChangeCheckBox} />
                </div>

                {/* Button post blog */}
                <FloatButton
                    onClick={onClickCreateBlog}
                    shape="square"
                    type="primary"
                    className="w-[90px] right-12"
                    description={'Xuất bản'}
                />
            </div>
        </div>
    )
}

export default Preview