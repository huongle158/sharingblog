import { Input, Select } from "antd"

const { Option } = Select;
const { Search } = Input;

interface Props {
    onSearch: () => void
}

export const SearchOptions = ({onSearch}: Props) => {
    return (
        <Input.Group compact size="large">
            <Select defaultValue="Title" className="lg:w-[20%] w-[30%]" size="large">
                <Option value="Title">Title</Option>
                <Option value="Author">Author</Option>
                <Option value="Tags">Tags</Option>
            </Select>
            <Search placeholder="Tìm kiếm..." onSearch={onSearch} className="lg:w-[80%] w-[70%]" size="large" />
        </Input.Group>
    )
}