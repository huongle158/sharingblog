import { Tag, Typography } from "antd"
import cx from 'classnames';
import { useState } from 'react';

interface Props {
    title?: string,
    tags: string[]
}

export const TagsBox = ({title, tags}: Props) => {
    const [selectedTag, setSelectedTag] = useState('');
    const filterBlogByTags = (item: string) => {
        if (selectedTag === item) {
            setSelectedTag('');
          } else {
            setSelectedTag(item);
          }
        console.log(selectedTag)
    }
    return (
        <div>
            <Typography.Title level={5}>{ title }</Typography.Title>
            <div className="mt-4">
                {tags && tags.map((item, index) => (
                    <a key={index} >
                    <Tag
                      className={cx('cursor-pointer mb-1', {
                        'text-blue-800': item === selectedTag,
                      })}
                      onClick={() => filterBlogByTags(item)}
                    >
                      {item}
                    </Tag>
                  </a>
                ))}
            </div>
        </div>
    )
}