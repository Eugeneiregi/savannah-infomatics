"use client";
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation'


import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

const Login = () => {
    const router = useRouter()
    const { data: session } = useSession();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submitHandler = async (e: React.FormEvent<HTMLFormElement> | Event) => {
        e.preventDefault();

        try {
            const data = await signIn("credentials", {
                redirect: false,
                email,
                password,
            });

            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        if (session) {
            router.push('/')
        }
    }, [session])

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-full max-w-md">
                <div className="px-4 text-4xl text-center justify-center">Welcome !!! </div>
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={submitHandler}>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email Address
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            placeholder="******************"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <p className="text-black text-xs italic">Please choose a password.</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <Button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            <Link href="/"> Sign In</Link>

                        </Button>
                        <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                            Forgot Password?
                        </a>
                    </div>
                </form>
                <div className="text-center space-x-2">
                    <p>Or sign in with</p>
                    <Button
                        className="bg-slate-200 hover:bg-zinc-100"
                        onClick={() => signIn("google")}
                    >
                        <FcGoogle />
                    </Button>
                    <Button
                        className="bg-slate-500"
                        onClick={() => signIn("github")}
                    >

                        <FaGithub />
                    </Button>
                </div>
                <p className="text-center text-gray-500 text-xs">
                    &copy;2024 Savannah Corp. All rights reserved.
                </p>
            </div>
        </div>
    )
}



export default Login;


