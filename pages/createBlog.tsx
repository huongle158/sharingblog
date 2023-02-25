import React, { useState } from "react";
import { Sidebar } from "@/components/layouts/Sidebar";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { useSelector } from "react-redux";
import blogService from './../services/blogService';
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
	const [content, setContent] = useState("");
	const [title, setTitle] = useState("");

	const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(event.target.value);
	};

  const handleContentChange = (value: string) => {
    setContent(value);
  };

	return (
		<Sidebar>
			<div className=" container">
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
						className="preview"
						dangerouslySetInnerHTML={{ __html: content }}
					/>
				</div>
			</div>
		</Sidebar>
	);
};
export default CreateBlog;


