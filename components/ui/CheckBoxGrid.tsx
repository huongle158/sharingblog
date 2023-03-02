import { Checkbox, Col, Row, Typography } from "antd"
import { CheckboxValueType } from "antd/es/checkbox/Group"

interface Props {
    title: string,
    items: string[],
    onChange: (checkedValues: CheckboxValueType[]) => void
}

const CheckBoxGrid = ({ title, items, onChange }: Props) => {
    return (
        <div>
            <Typography.Title level={3}>{title}</Typography.Title>
            <Checkbox.Group onChange={onChange}>
                <Row className='space-y-2 max-h-80 overflow-scroll'>
                    {items.map((item, index) => (
                        <Col span={8} key={index}>
                            <Checkbox value={index}>{item}</Checkbox>
                        </Col>
                    ))}
                </Row>
            </Checkbox.Group>
        </div>
    )
}

export default CheckBoxGrid