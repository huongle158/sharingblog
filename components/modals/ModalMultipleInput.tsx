import { Button, Input, Modal, Typography } from "antd"

interface Props {
    title: string,
    isModalOpen: boolean,
    handleOk: () => void,
    handleCancel: () => void,
    items: Item[],
}

interface Item {
    title: string,
    value: string,
    onChange: (e: any) => void,
}

const { TextArea } = Input;

export const ModalMultipleInput = ({
    title,
    isModalOpen,
    handleOk,
    handleCancel,
    items,
}: Props) => {
    return (
        <Modal
            title={title}
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
                <Button key="back" onClick={handleCancel}>
                    Huỷ
                </Button>,
                <Button key="submit" type="primary" onClick={handleOk}>
                    Lưu thay đổi
                </Button>,
            ]}
        >
            {
                items.map((item, index) => (
                    <div className="mt-4" key={index}>
                        <p>{item.title} <span className="text-red-600">(*)</span></p>
                        <Input
                            defaultValue={item.value}
                            onChange={item.onChange}
                            required
                        />
                    </div>
                ))
            }
             
        </Modal>
    )
}