import { Tag, Typography } from "antd"

interface Props {
    title?: string,
    tags: string[]
}

export const TagsBox = ({title, tags}: Props) => {
    return (
        <div>
            <Typography.Title level={5}>{ title }</Typography.Title>
            <div className="mt-4">
                {tags.map((item, index) => (
                    <a href="#" key={index}><Tag className="mb-2">{item}</Tag></a>
                ))}
            </div>
        </div>
    )
}