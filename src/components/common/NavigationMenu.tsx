"use client";

import React from "react";
import Link from "next/link";
import {
    NavigationMenu as ShadNavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuContent,
} from "@/components/ui/navigation-menu";

interface MenuItem {
    label: string;
    href: string;
}

interface Props {
    title: string;
    items: MenuItem[];
}

export default function NavigationMenu({ title, items }: Props) {
    return (
        <ShadNavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-blue-600 font-medium">
                        {title}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="rounded-md border border-gray-200 shadow-md">
                        <ul className="flex flex-col w-44 bg-white text-sm">
                            {items.map((item, idx) => (
                                <React.Fragment key={item.href}>
                                    <li>
                                        <Link
                                            href={item.href}
                                            className="block px-4 py-2 hover:bg-gray-100"
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                    {idx !== items.length - 1 && (
                                        <hr className="border-gray-300" />
                                    )}
                                </React.Fragment>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </ShadNavigationMenu>
    );
}
