import { Input, Select } from "antd"
import { useState } from 'react';

const { Option } = Select;
const { Search } = Input;

interface Props {
    onSearch: (searchOption: string, searchValue: string) => void
}

export const SearchOptions = ({onSearch}: Props) => {
    const [searchOption, setSearchOption] = useState("Title");
    const [searchValue, setSearchValue] = useState("");

    const handleOnSearch = () => {
        onSearch(searchOption, searchValue);
      };

    return (
        <Input.Group compact size="large">
            <Select 
                defaultValue="Title" 
                className="lg:w-[20%] w-[30%]"
                onChange={(value: string) => setSearchOption(value)}
                size="large">
                <Option value="Title">Tiêu đề</Option>
                <Option value="Author">Tác giả</Option>
                <Option value="Tags">Chủ đề</Option>
            </Select>
            <Search placeholder="Tìm kiếm..." 
                    onSearch={handleOnSearch} 
                    className="lg:w-[80%] w-[70%]" 
                    onChange={(e) => setSearchValue(e.target.value)}
                    size="large" />
        </Input.Group>
    )
}