import { ReactNode } from "react";

interface ContainerProps {
    children: ReactNode;
    className?: string;
}

export default function Container({ children, className = "" }: ContainerProps) {
    return (
        <div
            className={`container mx-auto px-4 sm:px-6 md:px-10 lg:px-20 xl:px-32 2xl:px-40 pb-2 bg-gray-100 ${className}`}
        >
            {children}
        </div>
    );
}
