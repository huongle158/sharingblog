import { ReactNode } from "react"

interface Props {
  label: string
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  children: ReactNode
}
export const Form = ({ label, handleSubmit, children }: Props) => {
  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {label}
        </h2>
      </div> */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md ">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 login-chill ">
          <div className="mb-9 sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className=" text-center text-3xl font-extrabold text-gray-900">
              {label}
            </h2>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            {children}
          </form>
        </div>
      </div>
    </div>
  )
}