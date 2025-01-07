import "./globals.css";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export const metadata = {
    title: "OneST",
    description: "web portal",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className="flex flex-col overflow-hidden">
                <Navbar />

                <main className="flex-1 bg-gray-100">{children}</main>
            </body>
        </html>
    );
}
