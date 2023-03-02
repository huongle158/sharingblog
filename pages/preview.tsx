import React, { useState } from 'react'
import { UploadOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, FloatButton, message, Row, Typography, Upload } from 'antd'
import { RcFile, UploadFile } from 'antd/es/upload';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { tags } from '@/fake-data';
import CheckBoxGrid from '@/components/ui/CheckBoxGrid';

const Preview = () => {
    const [fileImage, setFileImage] = useState({}) // image file upload
    const [isValidFileImage, setIsValidFileImage] = useState(false); // to prevent show image on error

    // Check before upload file image type
    const beforeUpload = (file: RcFile) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('Bạn chỉ có thể upload file có đuôi png hoặc jpg!');
            setIsValidFileImage(false)
            return false
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Hình ảnh đăng tải phải nhỏ hơn 2MB!');
            setIsValidFileImage(false)
            return false
        }
        setFileImage(file)
        setIsValidFileImage(true)
        return true;
    };

    const onChangeCheckBox = (checkedValues: CheckboxValueType[]) => {
        console.log('checked = ', checkedValues);
    };

    return (
        <div className='flex py-8 px-10'>
            {/* Left part */}
            <div className='w-1/2 p-10'>
                {/* Preview title, content */}
                <Typography.Title level={3}>Xem trước</Typography.Title>
                <div className='mt-10 max-w-full'>
                    <Typography.Title level={4} className="text-center">Ngành gì đang hot hiện nay? Top ngành nghề dự báo trở thành xu thế </Typography.Title>
                    <div className='mt-4 lg:max-h-96 overflow-scroll'>
                        Mặc dù “IT - vua của mọi nghề” chỉ là câu nói đùa vui của các anh em trong ngành, thế nhưng thực
                        tế thì IT vẫn sẽ là một trong những ngành nghề được dự đoán sẽ hot và được săn đón nhiều nhất
                        trong những năm tới.
                        Mặc dù “IT - vua của mọi nghề” chỉ là câu nói đùa vui của các anh em trong ngành, thế nhưng thực
                        tế thì IT vẫn sẽ là một trong những ngành nghề được dự đoán sẽ hot và được săn đón nhiều nhất
                        trong những năm tới.....
                        Mặc dù “IT - vua của mọi nghề” chỉ là câu nói đùa vui của các anh em trong ngành, thế nhưng thực
                        tế thì IT vẫn sẽ là một trong những ngành nghề được dự đoán sẽ hot và được săn đón nhiều nhất
                        trong những năm tới.
                        Mặc dù “IT - vua của mọi nghề” chỉ là câu nói đùa vui của các anh em trong ngành, thế nhưng thực
                        tế thì IT vẫn sẽ là một trong những ngành nghề được dự đoán sẽ hot và được săn đón nhiều nhất
                        trong những năm tới.....
                        Mặc dù “IT - vua của mọi nghề” chỉ là câu nói đùa vui của các anh em trong ngành, thế nhưng thực
                        tế thì IT vẫn sẽ là một trong những ngành nghề được dự đoán sẽ hot và được săn đón nhiều nhất
                        trong những năm tới.
                        Mặc dù “IT - vua của mọi nghề” chỉ là câu nói đùa vui của các anh em trong ngành, thế nhưng thực
                        tế thì IT vẫn sẽ là một trong những ngành nghề được dự đoán sẽ hot và được săn đón nhiều nhất
                        trong những năm tới.....
                        Mặc dù “IT - vua của mọi nghề” chỉ là câu nói đùa vui của các anh em trong ngành, thế nhưng thực
                        tế thì IT vẫn sẽ là một trong những ngành nghề được dự đoán sẽ hot và được săn đón nhiều nhất
                        trong những năm tới.
                    </div>
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
                    onClick={() => {}}
                    shape="square"
                    type="primary"
                    className="w-[90px] right-12"
                    description={'Đăng bài'}
                />
            </div>
        </div>
    )
}

export default Preview