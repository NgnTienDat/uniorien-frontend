import { ArrowUpIcon } from "lucide-react"

import { Button } from "@/components/ui/button"


interface ButtonProps {
    name: string;
}

export function UOButton({name}: ButtonProps) {
    return (
        <div className="flex flex-wrap items-center gap-2 md:flex-row ">
            <Button variant="outline" className="bg-blue-600 text-white cursor-pointer hover:bg-blue-800 hover:text-white">{name}</Button>
        </div>
    )
}
