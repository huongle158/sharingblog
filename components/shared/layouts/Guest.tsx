import { ReactNode } from "react";
import 'react-toastify/dist/ReactToastify.css';

interface Props {
	label: string;
	children: ReactNode;
}

export const Guest = ({ label, children }: Props) => {
  return (
	<div className="min-h-screen flex flex-col justify-center py-12 md:px-4 sm:px-6 lg:px-8 sm:w-full bg-gradient-to-r from-indigo-100 to-blue-200">
		<div className="sm:mx-auto sm:w-full sm:max-w-md">
			<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
			{label}
			</h2>
		</div>

		<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
			<div className="bg-white py-8 px-4 lg:shadow md:shadow rounded-xl sm:px-10">
			{children}
			</div>
		</div>
	</div>
  );
};
