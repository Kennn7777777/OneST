"use client";

import { useState } from "react";
import { api } from "@lib/config";

export default function VerifyPage() {
    const [uenValue, setUenValue] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState(false);

    const handleChange = (event) => {
        setMessage("");
        setUenValue(event.target.value);
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
          handleVerifyUen();
        }
    };
      
    const handleVerifyUen = async () => {
        try {
            setError(false);
            const response = await api.post("/verify-uen", {uen : uenValue});
            setMessage(response.data.message);
        } catch (error) {
            const message = error.response?.data?.error || 'An unexpected error occurred';
            setError(true);
            setMessage(message);
        }
    };
  
    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center">
            <h1 className="font-bold mb-4">UEN Verification</h1>

            <div className="w-full max-w-sm min-w-[200px] mb-2">
                <div className="relative">
                    <input
                        type="text"
                        className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-16 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                        placeholder="Enter UEN..."
                        onChange={handleChange}
                        onKeyDown={handleKeyPress}
                    />
                    <button
                        onClick={handleVerifyUen}
                        className="absolute right-0 top-0 rounded bg-slate-800 h-full px-4 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button"
                    >
                        Verify
                    </button>
                </div>
            </div>

            <span className={`${error ? "text-red-500" : "text-green-500"} min-h-[40px]`}>
                {message}
            </span>
        </div>
    );
}
