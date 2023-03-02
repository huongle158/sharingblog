import { Input, Modal } from "antd"

interface Props {
    title: string,
    isModalOpen: boolean,
    handleOk: () => void,
    handleCancel: () => void,
    defaultValue?: string,
    onChange: (e: any) => void,
}
export const ModalInput = ({title, isModalOpen, handleOk, handleCancel, defaultValue, onChange}: Props) => {
    return (
        <Modal title={title} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <Input defaultValue={defaultValue} onChange={onChange} />
        </Modal>
    )
}