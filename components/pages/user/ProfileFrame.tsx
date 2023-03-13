import { ReactNode } from "react"

interface Props {
    children: ReactNode;
}

export const ProfileFrame = ({children}: Props) => {
    return (
        <div className="overflow-y-scroll h-screen relative">
            <div className="h-60 bg-gradient-to-r from-gray-100 to-gray-200"></div>
            <div className="max-w-screen-lg mx-auto -mt-20 px-2">
                {children}
            </div>
        </div>
    )
}