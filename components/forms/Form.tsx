import { ReactNode } from "react"

interface Props {
    children: ReactNode
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}
export const Form = ({ children, handleSubmit }: Props) => {
    return (
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {children}
            </form>
          </div>
        </div>
    )
}