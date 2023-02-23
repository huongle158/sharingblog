import React, { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { getTitleNewBlog } from "@/store/redux/actions/sharingblogAction";

export default function ModalDisplayCreateTitleBLog({
    modal,
    setShowModal,
}: any) {
    const router = useRouter();
    const dispatch = useDispatch();

    const createTitleBlog = () => {
        setShowModal();
        router.push("/createBlog");
        dispatch(getTitleNewBlog(tilte));
    };
    const [tilte, setTitle] = useState("");
    const onChangeTitleHandle = (event: any) => {
        setTitle(event.target.value);
    };

  return (
    <>
      {modal ? (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-96 my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex justify-center p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="lg:text-2xl text-xl font-semibold py-5 text-center">Your blog title</h3>
                    </div>
                    {/*body*/}
                    <div className="relative p-6 flex-auto justify-self-center">
                    <input
                        value={tilte}
                        onChange={onChangeTitleHandle}
                        type="text"
                        className="border-0 w-full h-12 p-2 rounded-md"
                        placeholder="Enter your blog title here..."
                    />
                    </div>
                    {/*footer*/}
                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={setShowModal}
                    >
                        Close
                    </button>
                    <button
                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={createTitleBlog}
                    >
                        Save Changes
                    </button>
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
