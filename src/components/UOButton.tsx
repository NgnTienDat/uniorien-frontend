import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ButtonProps {
    name: string;
    href?: string;
    onClick?: () => void;
}

export function UOButton({ name, href, onClick }: ButtonProps) {
    return (
        <Button
            variant="outline"
            className="bg-blue-600 text-white hover:bg-blue-800 hover:text-white cursor-pointer"
            asChild={!onClick}
            onClick={onClick}
        >
            {href ? <Link href={href}>{name}</Link> : <span>{name}</span>}
        </Button>
    );
}
