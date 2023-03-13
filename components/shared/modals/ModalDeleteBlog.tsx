import React, { useEffect, useState } from "react";
import { Modal, Button } from "antd";
import blogService from "@/services/blogService";

const ModalDeleteBlog = ({ showModal, setShowModal, handleDeleteBlog }: any) => {
	const handleOk = async() => {
		handleDeleteBlog()
		setShowModal(false);
	};

	const handleCancel = () => {
		setShowModal(false);
	};

	return (
		<Modal
			open={showModal}
			title="Xác nhận xoá blog"
			onOk={handleOk}
			onCancel={handleCancel}
			footer={[
				<Button key="cancel" onClick={handleCancel}>
					Hủy bỏ
				</Button>,
				<Button key="delete" type="primary" danger onClick={handleOk}>
					Xoá
				</Button>,
			]}
		>
			<p>Bạn có chắc muốn xoá bài blog này không?</p>
		</Modal>
	);
};

export default ModalDeleteBlog;
