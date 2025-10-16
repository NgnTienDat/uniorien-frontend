"use client"

import * as React from "react"
import Link from "next/link"

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

interface MenuItem {
    label: string;
    href: string;
}

interface Props {
    title: string;
    items: MenuItem[];
}

export function UONavigationMenu({ title, items }: Props) {
    return (
        <NavigationMenu viewport={false} >
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger
                        className="font-medium hover:bg-gray-100 hover:text-blue-700">
                        {title}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[200px] gap-1">
                            {items.map((item, idx) => (
                                <li key={idx}>
                                    <NavigationMenuLink asChild>
                                        <Link href={item.href}>{item.label}</Link>
                                    </NavigationMenuLink>
                                </li>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>

            </NavigationMenuList>
        </NavigationMenu>
    )
}