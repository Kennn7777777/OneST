"use client";

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation'
import Link from "next/link";

export default function Navigation() {
    const pathname = usePathname()

    const isActive = (path) =>
        pathname === path
            ? "border-blue-400 text-blue-400"
            : "border-transparent text-white";

    return (
        <header className="bg-slate-800 text-white p-4 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <h1 className="text-3xl font-bold">oneST</h1>
                <nav className="absolute left-1/2 transform -translate-x-1/2">
                    <ul className="flex space-x-6">
                        <li>
                            <Link href="/weather">
                                <span
                                    className={`${isActive(
                                        "/weather"
                                    )} border-b-2 pb-1 border-transparent hover:border-blue-400 hover:text-blue-400 transition-colors duration-300`}
                                >
                                    Weather
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/verify-uen">
                                <span className={`${isActive(
                                        "/verify-uen"
                                    )} border-b-2 pb-1 border-transparent hover:border-blue-400 hover:text-blue-400 transition-colors duration-300`}>
                                    Verify UEN
                                </span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
