interface Props {
    type: 'button' | 'submit' | undefined;
    label: string;
    className?: string;
    disabled?: boolean,
}
export const Button = ({ type, label, className, disabled = false }: Props) => {
    return (
        <button
            type={type}
            className={`group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 
                ${disabled ? ' disabled:opacity-50 ' : ' '} ${className}`}
            disabled={disabled}
        >
            {label}
        </button>
    )
}