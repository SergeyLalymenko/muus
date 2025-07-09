import { ReactNode } from 'react';
import clsx from 'clsx';

type PropsType = {
    children: ReactNode;
    variant?: 'primary';
    size?: 'sm' | 'md' | 'lg';
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    className?: string;
};

const sizeStyles = {
    sm: 'text-sm px-3 py-1.5',
    md: 'text-base px-4 py-2',
    lg: 'text-lg px-6 py-3',
};

const variantStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
};

function Button({
    children,
    variant = 'primary',
    size = 'md',
    onClick = () => {},
    type = 'button',
    disabled = false,
    className = '',
}: PropsType) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={clsx(
                'rounded font-medium transition-colors duration-200 outline-none cursor-pointer',
                sizeStyles[size],
                variantStyles[variant],
                disabled && 'opacity-50 cursor-not-allowed',
                className
            )}
        >
            {children}
        </button>
    );
}

export default Button;
