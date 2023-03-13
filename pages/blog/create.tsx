import React, { useState } from "react";
import { Sidebar } from "@/components/shared/layouts/Sidebar";
import "react-quill/dist/quill.snow.css";
import { useDispatch } from "react-redux";
import { message } from "antd";
import { useRouter } from "next/router";
import { getContentNewBlog } from "@/store/redux/actions/sharingblogAction";
import CreateContent from "@/components/pages/blog/CreateContent";

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
		router.push("preview");

	}

	return (
		<Sidebar>
			<div className="container overflow-y-scroll h-screen">
				<CreateContent content={content} handleContentChange={handleContentChange} pushPreview={pushPreview} />
			</div>
		</Sidebar>
	);
};
export default CreateBlog;


