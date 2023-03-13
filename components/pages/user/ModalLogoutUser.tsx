import React from "react";
import { Modal, Button } from "antd";

const ModalLogout = ({ modal, setModal, handleLogout } : any) => {
  const handleOk = () => {
    handleLogout();
    setModal(false);
  };

  const handleCancel = () => {
    setModal(false);
  };

  return (
    <Modal
      open={modal}
      title="Xác nhận đăng xuất"
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Hủy bỏ
        </Button>,
        <Button key="logout" type="primary" danger onClick={handleOk}>
          Đăng xuất
        </Button>,
      ]}
    >
      <p>Bạn có chắc muốn đăng xuất khỏi tài khoản của mình?</p>
    </Modal>
  );
};

export default ModalLogout;
