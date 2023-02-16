interface Props {
    input: {
        label: string;
        id: string;
        name: string;
        type: string;
        required: boolean;
        value: string;
        onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    }
}

export const Input = ({input}: Props) => {
    return (
        <div>
            <label
            htmlFor={input.type}
            className="block text-sm font-medium text-gray-700"
            >
            {input.label}
            </label>
            <div className="mt-1">
            <input
                id={input.id}
                name={input.name}
                type={input.type}
                required={input.required}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={input.value}
                onChange={input.onChange}
            />
            </div>
        </div>
    )
}