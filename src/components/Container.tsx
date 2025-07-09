import { ReactNode } from 'react';
import clsx from 'clsx';

type PropsType = {
    children: ReactNode;
    className?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
};

function Container({ children, className = '', size = 'lg' }: PropsType) {
    function getSizeStyles() {
        switch (size) {
            case 'sm':
                return 'max-w-[768px]';
            case 'md':
                return 'max-w-[1024px]';
            case 'lg':
                return 'max-w-[1280px]';
            case 'xl':
                return 'max-w-[1600px]';
            case 'full':
                return '';
        }
    }

    return <div className={clsx('flex flex-col w-full mx-auto px-4', className, getSizeStyles())}>{children}</div>;
}

export default Container;
