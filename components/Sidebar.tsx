import Link from "next/link"
import React, { ReactNode } from "react"
import { AiOutlineHome, AiOutlinePlus } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';

interface Props {
    children: ReactNode
}

export const Sidebar = ({children}: Props) => {
  return (
    <div className="flex">
        <div className="fixed w-30 h-screen p-4 border-r-[1px] flex flex-col justify-between bg-slate-100">
            <div className="flex flex-col items-center">
                <Link href="/login">
                    <div className="bg-purple-800 text-white p-3 rounded-lg inline-block">
                        Avatar
                    </div>
                </Link>
                <span className="border-b-[1px] border-gray-200 w-full p-2"></span>
                <Link href="/createBlog">
                    <div className=" bg-blue-600 rounded-full text-white text-xl hover:bg-blue-400 cursor-pointer 
                            mt-4 mb-5 p-3 inline-block"
                        >
                        <AiOutlinePlus />
                    </div>
                </Link>
                <Link href="/">
                    <div className=" text-2xl hover:bg-slate-300 cursor-pointer my-3 p-3  inline-block">
                        <AiOutlineHome />
                    </div>
                </Link>
                <Link href="/profile">
                    <div className=" text-2xl hover:bg-slate-300 cursor-pointer my-3 p-3  inline-block">
                        <CgProfile />
                    </div>
                </Link>
                
            </div>
        </div>
        
        <main className="w-full ml-40">
            {children}
        </main>
    </div>
  )
}
