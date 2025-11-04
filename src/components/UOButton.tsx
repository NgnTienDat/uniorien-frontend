import { Button } from "@/components/ui/button"
import Link from "next/link"

interface ButtonProps {
    name: string;
    href: string;
}

export function UOButton({ name, href }: ButtonProps) {
    return (
        <div className="flex flex-wrap items-center gap-2 md:flex-row">
            <Button 
                variant="outline" 
                className="bg-blue-600 text-white cursor-pointer hover:bg-blue-800 hover:text-white"
                asChild
            >
                <Link href={href}>{name}</Link>
            </Button>
        </div>
    )
}