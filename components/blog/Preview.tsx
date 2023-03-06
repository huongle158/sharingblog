import React, { useEffect, useState } from 'react'
import { UploadOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, FloatButton, message, Row, Typography, Upload } from 'antd'
import { RcFile, UploadFile } from 'antd/es/upload';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import CheckBoxGrid from '@/components/ui/CheckBoxGrid';
import Cookies from 'js-cookie';
import blogService from "@/services/blogService";
import { useRouter } from "next/router";
import tagService from '@/services/tagService';
import { getAllTags } from '@/store/redux/actions/tagAction';
import { toast } from "react-toastify";

const Preview = ({ title, content, fileImage, setFileImage, tagList, setTagList, saveBlog }: any) => {
    const router = useRouter()
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
    const onChangeCheckBox = (checkedValues: CheckboxValueType[]) => {
        setTagList(checkedValues)
    };

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
    
    const defaultFileList: UploadFile[] = [
        {
            uid: '1',
            name: fileImage,
            status: 'done',
            url: fileImage,
        }
    ]

    return (
        <div className='flex py-8 px-10'>
            {/* Left part */}
            <div className='w-1/2 p-10'>
                {/* Preview title, content */}
                <Typography.Title level={3}>Xem trước</Typography.Title>
                <div className='mt-10 max-w-full'>
                    <Typography.Title level={4} className="text-center">{title} </Typography.Title>
                    {content && (
                        <div className="mt-4 lg:max-h-96 overflow-scroll review"
                            dangerouslySetInnerHTML={{ __html: content }}
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
                        defaultFileList={defaultFileList}
                    >
                        <Button icon={<UploadOutlined />}>Upload</Button>
                    </Upload>
                </div>

                {/* Add tags */}
                <div className='mt-2'>
                    <CheckBoxGrid title='Thêm tags' items={tags} itemsChecked={tagList} onChange={onChangeCheckBox} />
                </div>

                {/* Button post blog */}
                <FloatButton
                    onClick={saveBlog}
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