import React, { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { getTitleNewBlog } from "@/store/redux/actions/sharingblogAction";
import { Button } from "antd";

export default function ModalDisplayCreateTitleBLog({
    modal,
    setShowModal,
}: any) {
    const router = useRouter();
    const dispatch = useDispatch();

    const createTitleBlog = () => {
        setShowModal();
        router.push("/createBlog");
        dispatch(getTitleNewBlog(title));
    };
    const [title, setTitle] = useState("Title");
    const onChangeTitleHandle = (event: any) => {
        setTitle(event.target.value);
    };

  return (
    <>
      {modal ? (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-1/2 my-6 mx-auto lg:max-w-3xl w-[85%]">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex justify-center p-5 border-b border-solid border-slate-200 rounded-t">
                        <h3 className="lg:text-xl text-lg font-semibold py-2 text-center">{title == "" ? "Title" : title}</h3>
                    </div>
                    {/*body*/}
                    <div className="relative p-6 flex-auto justify-self-center">
                    <input
                        value={title == "Title" ? "" : title}
                        onChange={onChangeTitleHandle}
                        type="text"
                        className="border-0 w-full h-12 p-2 rounded-md"
                        placeholder="Enter your blog title here..."
                    />
                    </div>
                    {/*footer*/}
                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                        <Button className="mr-2" onClick={setShowModal} >
                            Đóng
                        </Button>
                        <Button type="primary" className="bg-blue-500 hover:bg-blue-400" onClick={createTitleBlog}>
                            Viết bài
                        </Button>
                    </div>
                </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
