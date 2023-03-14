import { message, Spin, Tag, Typography } from "antd"
import cx from 'classnames';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import  blogService  from '@/services/blogService';
import Cookies from "js-cookie";
import { getAllBlogsByTags } from "@/store/redux/actions/sharingblogAction";

interface Props {
  title?: string,
  tags: string[],
  pending: boolean,
}

export const TagsBox = ({title, tags, pending}: Props) => {
    const [selectedTag, setSelectedTag] = useState('');
    const token = Cookies.get("token") || "";
    const dispatch = useDispatch();
    const filterBlogByTags = async (item: string) => {
        if (selectedTag === item) {
            setSelectedTag('');
            const result = await blogService.getAllPostsFollow(token, undefined, undefined, '');
            dispatch(getAllBlogsByTags(result.articles));
   
          } else {
            setSelectedTag(item);
            const result = await blogService.getAllPostsFollow(token, undefined, undefined, item);
            if(result.articles.length === 0) {
              message.info("Không tìm thấy bài viết chưa tags này")
              return false
            }
            dispatch(getAllBlogsByTags(result.articles));

          }

    
    }
    
    return (
        <div>
        <Typography.Title level={5}>{title}</Typography.Title>
        {
          pending ? 
            <div className="flex items-center justify-center">
              <Spin className="w-12 h-12" />
            </div> :
            (
              <div className="mt-4">
                {tags && tags.map((item, index) => (
                  <a key={index} >
                    <Tag
                      className={cx('cursor-pointer mb-1', {
                        'text-blue-800'
                          : item === selectedTag,
                      })}
                      onClick={() => filterBlogByTags(item)}
                    >
                      {item}
                    </Tag>
                  </a>
                ))}
              </div>
            )
        }
        </div>
    )
}