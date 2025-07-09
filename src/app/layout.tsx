import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import Header from '@/components/Header';
import './globals.css';
import clsx from 'clsx';

const poppinsSans = Poppins({
    weight: ['400', '500', '600', '700'],
    variable: '--font-poppins',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'MUUS',
    description: 'MUUS description',
};

type PropsType = {
    children: ReactNode;
};

function RootLayout({ children }: PropsType) {
    return (
        <html lang="en">
            <body className={clsx('flex flex-col min-h-screen text-gray-100', poppinsSans.variable)}>
                <Header />
                {children}
            </body>
        </html>
    );
}

export default RootLayout;
