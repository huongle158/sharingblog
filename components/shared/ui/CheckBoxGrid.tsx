import { Checkbox, Col, Row, Spin, Typography } from "antd"
import { CheckboxValueType } from "antd/es/checkbox/Group"

interface Props {
    title: string,
    items: string[],
    itemsChecked?: string[],
    onChange: (checkedValues: CheckboxValueType[]) => void,
    pending?: boolean,
}

const CheckBoxGrid = ({ title, items, itemsChecked = [], onChange, pending = false }: Props) => {
    return (
        <div>
            <Typography.Title className="mb-6" level={3}>{title}</Typography.Title>
            {itemsChecked.length !== 0 ? (
                <Checkbox.Group onChange={onChange} value={itemsChecked} >
                    <Row className='space-y-2 max-h-100 overflow-scroll'>
                        {items.map((item, index) => (
                            <Col span={8} key={index}>
                                <Checkbox value={item}>{item}</Checkbox>
                            </Col>
                        ))}
                    </Row>
                </Checkbox.Group>
            ) : (
                <Checkbox.Group onChange={onChange} >
                        <Row className='space-y-2 max-h-80 overflow-scroll'>
                            {
                                pending ?
                                    <div className="flex items-center justify-center">
                                        <Spin className="w-12 h-12" />
                                    </div> :
                                    items.map((item, index) => (
                                        <Col span={8} key={index}>
                                            <Checkbox value={item}>{item}</Checkbox>
                                        </Col>
                                    ))
                            }
                        
                    </Row>
                </Checkbox.Group>
            )}
        </div>
    )
}

export default CheckBoxGrid