"use client";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { Renderable, Toast, Toaster, ValueFunction, toast } from 'react-hot-toast';
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const Login = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const [isAuthenticating, setIsAuthenticating] = useState(false);

    const showToast = (message: string, type: 'success' | 'error' = 'success') => toast[type](message, {
        duration: 3000, // 3 seconds
    });

    const handleSignIn = async (provider: string) => {
        setIsAuthenticating(true);
        try {
            showToast(`Signing in with ${provider}...`);

            const data = await signIn(provider);

            console.log(data);

                setIsAuthenticating(false);
            
        } catch (error) {
            console.error(error);
            setIsAuthenticating(false);
            showToast(`Failed to sign in with ${provider}. Please try again.`);
        }
    };

    useEffect(() => {
        
        if (session) {
            showToast("Thank You For Signing", 'success');
            router.push('/');
        }
    }, [session, router]);

    return (
        <div className="flex justify-center items-center h-screen">
            <Toaster position="top-center" /> {/* Render Toaster component */}
            <div className="w-full max-w-md">
                <div className="px-4 text-5xl text-bold text-center justify-center">Welcome !!! </div>
                
                <div className="text-center space-x-2">
                    <p>Sign in with...</p>
                    <div className="px-10 py-5 flex flex-col items-center space-y-4">
                        <Button
                            className={`bg-slate-900 hover:bg-black flex items-center space-x-2 px-9 py-5 ${isAuthenticating ? 'cursor-not-allowed opacity-50' : ''}`}
                            onClick={() => handleSignIn("google")}
                            disabled={isAuthenticating}
                        >
                            <FcGoogle />
                            <span>Continue with Google</span>
                        </Button>
                        <Button
                            className={`bg-slate-500 flex items-center space-x-2 px-9 py-5 ${isAuthenticating ? 'cursor-not-allowed opacity-50' : ''}`}
                            onClick={() => handleSignIn("github")}
                            disabled={isAuthenticating}
                        >
                            <FaGithub />
                            <span>Continue with Github</span>
                        </Button>
                    </div>
                </div>
                <p className="text-center text-gray-500 text-xs">
                    &copy;2024 Savannah Corp. All rights reserved.
                </p>
            </div>
        </div>
    );
};

export default Login;


//My previous code .


// "use client";
// import { useSession, signIn, signOut } from "next-auth/react";
// import { useRouter } from 'next/navigation';
// import { Toaster, toast } from 'react-hot-toast';
// // import { Toaster, toast } from "@/components/ui/sonner";
// import Link from "next/link";
// import { FcGoogle } from "react-icons/fc";
// import { FaGithub } from "react-icons/fa";

// import React, { useEffect, useState } from "react";

// import { Button } from "@/components/ui/button";

// const Login = () => {
//     const router = useRouter()
//     const { data: session } = useSession();
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [isAuthenticating, setIsAuthenticating] = useState(false);

//     const submitHandler = async (e: React.FormEvent<HTMLFormElement> | Event) => {
//         e.preventDefault();

//         try {
//             const data = await signIn("credentials", {
//                 redirect: false,
//                 email,
//                 password,
//             });

//             console.log(data);
//         } catch (error) {
//             console.log(error);
//         }
//     };
//     useEffect(() => {
//         if (session) {
//             router.push('/')
//         }
//     }, [session])
//     useEffect(() => {
//         if (isAuthenticating) {
//             toast("Please wait, we are authenticating you...");
//             const timer = setTimeout(() => {
//                 setIsAuthenticating(false);
//             }, 2000);

//             return () => clearTimeout(timer);
//         }
//     }, [isAuthenticating]);

//     return (
//         <div className="flex justify-center items-center h-screen">
//              {/* {!session && <Toaster />} */}
//             <div className="w-full max-w-md">
//                 <div className="px-4 text-5xl text-bold text-center justify-center">Welcome !!! </div>
//                 {/* <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={submitHandler}>
//                     <div className="mb-6">
//                         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
//                             Email Address
//                         </label>
//                         <input
//                             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                             id="email"
//                             type="email"
//                             placeholder="Email Address"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                         />
//                     </div>
//                     <div className="mb-6">
//                         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
//                             Password
//                         </label>
//                         <input
//                             className="shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
//                             id="password"
//                             type="password"
//                             placeholder="******************"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                         />
//                         <p className="text-black text-xs italic">Please choose a password.</p>
//                     </div>
//                     <div className="flex items-center justify-between">
//                         <Button
//                             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                             type="submit"
//                         >
//                             <Link href="/"> This option is not implemented</Link>

//                         </Button>
//                         <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
//                             Forgot Password?
//                         </a>
//                     </div>
//                 </form> */}
//                 <div className="text-center space-x-2">
//                     <p>Sign in with...</p>
//                     <div className="px-10 py-5 flex flex-col items-center space-y-4">
//                         <Button
//                             className="bg-slate-900 hover:bg-black flex items-center space-x-2 px-9 py-5"
                            
//                             onClick={() => {
//                                 setIsAuthenticating(true);
//                                 signIn("google");
//                             }}
//                         >
//                             <FcGoogle />
//                             <span>Continue with Google</span>
//                         </Button>
//                         <Button
//                             className="bg-slate-500 flex items-center space-x-2 px-9 py-5"
//                             onClick={() => {
//                                 setIsAuthenticating(true);
//                                 signIn("github");
//                             }}
//                         >
//                             <FaGithub />
//                             <span>Continue with Github</span>
//                         </Button>
//                     </div>

//                 </div>
//                 <p className="text-center text-gray-500 text-xs">
//                     &copy;2024 Savannah Corp. All rights reserved.
//                 </p>
//             </div>
//         </div>
//     )
// }



// export default Login;


