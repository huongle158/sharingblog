import { Button, Input, Modal } from "antd"

interface Props {
    title: string,
    isModalOpen: boolean,
    handleOk: () => void,
    handleCancel: () => void,
    defaultValue?: string,
    onChange: (e: any) => void,
    isTextArea?: boolean,
    maxLength?: number,
    placeHolder?: string,
}

const { TextArea } = Input;

export const ModalInput = ({
    title,
    isModalOpen,
    handleOk,
    handleCancel,
    defaultValue,
    onChange,
    isTextArea = false,
    maxLength,
    placeHolder,
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
                isTextArea ? (
                    <TextArea
                        defaultValue={defaultValue}
                        placeholder={placeHolder}
                        onChange={onChange}
                        className="h-20 mb-8"
                        showCount
                        maxLength={maxLength}
                    />
                ) : (
                    <Input
                        defaultValue={defaultValue}
                        onChange={onChange}
                    />
                )
            }
        </Modal>
    )
}