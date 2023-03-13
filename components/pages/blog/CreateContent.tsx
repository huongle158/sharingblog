import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { FloatButton } from "antd";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
const modules = {
    toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
        ],
        ["link", "image", "video"],
    ],
};

const CreateContent = ({ content, handleContentChange, pushPreview }: any) => {
    return (
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
            <div
                className="preview overflow-y-scroll h-screen"
                dangerouslySetInnerHTML={{ __html: content }}
            />
            <FloatButton
                onClick={pushPreview}
                shape="square"
                type="primary"
                className="w-[90px] right-12"
                description={'Tiếp tục'}
            // icon={<ArrowRightOutlined />}
            />
        </div>
    );
};
export default CreateContent;
