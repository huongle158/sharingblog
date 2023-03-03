import React, { useState } from "react";
import { Sidebar } from "@/components/layouts/Sidebar";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import blogService from '../services/blogService';
import { Button, FloatButton, message } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { getContentNewBlog } from "@/store/redux/actions/sharingblogAction";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
const modules = {
	toolbar: [
		[{ header: [1, 2, 3, 4, 5, 6, false] }],
		[{ font: [] }],
		[{ size: [] }],
		["bold", "italic", "underline", "strike", "blockquote"],
		[
			{ list: "ordered" },
			{ list: "bullet" },
			{ indent: "-1" },
			{ indent: "+1" },
		],
		["link", "image", "video"],
	],
};
const formats = [
	"header",
	"font",
	"size",
	"bold",
	"italic",
	"underline",
	"strike",
	"blockquote",
	"list",
	"bullet",
	"indent",
	"link",
	"image",
	"video",
];
const CreateBlog = () => {
	const dispatch = useDispatch();
	const [content, setContent] = useState("");
	const router = useRouter();
	const handleContentChange = (value: string) => {
		setContent(value);
	};
	
	const pushPreview = () => {
		if(content === "") {
			message.error('Nội dung bài Blog không được để trống');
            return false
		}
		dispatch(getContentNewBlog(content))
		router.push("/preview");

	}

	return (
		<Sidebar>
			<div className="container overflow-y-scroll h-screen">
				<div className="row">
					<div className="editor">
						<ReactQuill
							theme="snow"
							value={content}
							onChange={handleContentChange}
							className="editor-input"
							modules={modules}
						/>
					</div>
					<div
						className="preview overflow-y-scroll h-screen"
						dangerouslySetInnerHTML={{ __html: content }}
					/>
					<FloatButton
						onClick={pushPreview}
						shape="square"
						type="primary"
						className="w-[90px] right-12"
						description={'Tiếp tục'}
						// icon={<ArrowRightOutlined />}
					/>
				</div>
			</div>
		</Sidebar>
	);
};
export default CreateBlog;


