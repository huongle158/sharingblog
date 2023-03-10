import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { UploadOutlined } from '@ant-design/icons';
import { Button, FloatButton, Image, message, Row, Typography, Upload } from 'antd'
import { RcFile } from 'antd/es/upload';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import CheckBoxGrid from '@/components/ui/CheckBoxGrid';
import tagService from '@/services/tagService';
import { getAllTags } from '@/store/redux/actions/tagAction';

interface Props {
    title: string,
    content: string,
    oldBanner: string,
    newBanner: RcFile | null,
    setNewBanner: Dispatch<SetStateAction<RcFile | null>>,
    tagList: never[],
    setTagList: Dispatch<SetStateAction<never[]>>,
    saveBlog: () => Promise<void>
}
const Preview = ({ title, content, oldBanner, newBanner, setNewBanner, tagList, setTagList, saveBlog }: Props) => {
    const [isValidNewBanner, setIsValidNewBanner] = useState(false); // to prevent show image on error
    const [fileUpload, setFileUpload] = useState<RcFile | null>(null)

    // Check before upload file image type
    const beforeUpload = (file: RcFile) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('Bạn chỉ có thể upload file có đuôi png hoặc jpg!');
            setIsValidNewBanner(false)
            return false
        }
        setFileUpload(file)
        setIsValidNewBanner(true)
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

    useEffect(() => {
        if (isValidNewBanner) {
            setNewBanner(fileUpload)
        }
    }, [fileUpload])

    console.log("file review return: " + newBanner)
    return (
        <div className='flex py-12 px-10'>
            {/* Left part */}
            <div className='w-1/2 p-10'>
                {/* Preview title, content */}
                <Typography.Title level={3}>Xem trước</Typography.Title>
                <div className='mt-10 max-w-full'>
                    <Typography.Title level={4} className="text-center">{title} </Typography.Title>
                    {content && (
                        <div className="mt-4 lg:max-h-96 h-80 overflow-scroll review"
                            dangerouslySetInnerHTML={{ __html: content }}
                        />
                    )}
                </div>
            </div>

            {/* Right part */}
            <div className='w-1/2 p-10'>
                {/* Add image */}
                <div className='h-60'>
                    <Typography.Title level={3} className='mb-4'>Thêm hình ảnh</Typography.Title>
                    <Upload
                        maxCount={1}
                        listType="picture"
                        beforeUpload={beforeUpload}
                        className="upload-list-inline"
                        showUploadList={isValidNewBanner}
                    >
                        <Button icon={<UploadOutlined />}>Upload</Button>
                    </Upload>
                    {!isValidNewBanner && (
                        <div className="h-16 py-2 px-6 mt-4 flex rounded-xl border-2 border-gray-200">
                            <Image alt={oldBanner} src={oldBanner} className="h-12 w-auto mr-2" preview={false} />
                            {/* <p>{oldBanner}</p> */}
                        </div>
                    )}
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