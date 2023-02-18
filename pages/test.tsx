import React from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const BlogPage: React.FC = () => {
  const [content, setContent] = React.useState("");

  const handleContentChange = (value: string) => {
    setContent(value);
  };

  const handleSave = () => {
    console.log("Content:", content);
  };

  return (
    <div>
      <ReactQuill value={content} onChange={handleContentChange} />
      <button onClick={handleSave}>Save</button>
      <div
      dangerouslySetInnerHTML={{__html: content}}
      />  
    </div>
  );
};

export default BlogPage;