'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Routes } from '@/const/routes';
import Container from '@/components/Container';

function Header() {
    const pathname = usePathname();

    return (
        <header className="w-full border-solid border-b border-gray-700 bg-gray-800">
            <Container className="py-5">
                <ul className="flex items-center justify-center flex-wrap gap-5">
                    <Link
                        href={Routes.HOME}
                        className={clsx(
                            'hover:text-indigo-300 transition-colors duration-200',
                            pathname === Routes.HOME && 'text-indigo-300'
                        )}
                    >
                        Головна
                    </Link>
                </ul>
            </Container>
        </header>
    );
}

export default Header;
