import { Tooltip } from "antd"
import Link from "next/link"
import { useRouter } from "next/router";
import { ReactNode } from "react";

interface Props {
    route?: string,
    title: string,
    children: ReactNode,
    className?: string,
}

export const NavItem = ({ route, title, children, className }: Props) => {
    const router = useRouter();
    return (
        <Link href={route || "#"} legacyBehavior>
            <div
                className={`hover:bg-blue-200 rounded-full text-2xl cursor-pointer my-3 p-3 
						inline-block ${className} ${router.pathname === route ? "bg-blue-300" : ""}`}
            >
                <Tooltip placement="right" title={title}>
                    {children}
                </Tooltip>
            </div>
        </Link>
    )
}