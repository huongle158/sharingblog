import React, {useState} from 'react'
import { Sidebar } from '@/components/Sidebar';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const modules = {
 toolbar: [
  [{ header: [1,2,3,4,5,6, false]}],
  [{font: []}],
  [{size: []}],
  ["bold","italic","underline","strike","blockquote"],
  [
    {list : "ordered"},
    {list : "bullet"},
    {indent : "-1"},
    {indent : "+1"},
  ],
  ["link", "image", "video"]
 ]
}
const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (value: string) => {
    setContent(value);
    console.log(value)
  };

  return (
    <Sidebar>
      <div className="ml-7 container">
        <div className="row">
          <div className="editor">
            <ReactQuill 
              theme="snow"
              value={content}
              onChange={handleContentChange}
              className="editor-input"
              modules={modules}
              />
          </div>
          <div className="preview"
           dangerouslySetInnerHTML={{__html: content}}
          />
        </div>
      </div>
    </Sidebar>
  )
}
export default CreateBlog;
