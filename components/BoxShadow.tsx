import { ReactNode } from "react"

interface Props {
  label: string
  children: ReactNode
}
export const BoxShadow = ({ label, children }: Props) => {
  return (
    <div className="min-h-screen flex flex-col justify-center py-12 md:px-4 sm:px-6 lg:px-8 sm:w-full login">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {label}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md login-chill">
        <div className="bg-white py-8 px-4 lg:shadow md:shadow sm:rounded-lg sm:px-10">
            {children}
        </div>
      </div>
    </div>
  )
}