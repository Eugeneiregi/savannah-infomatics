"use client"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";  
import Link from "next/link"
import Image from "next/image"
import { Button } from "../ui/button"
import { useSession, signOut } from "next-auth/react"
import { useEffect } from "react"
// import { useRouter } from "next/navigation"

const Header = () => {
    const { data: session } = useSession();
    const user = session?.user;
    const defaultImage = "https://source.unsplash.com/150x150/?portrait?3";

    // const router = useRouter();

    // useEffect(() => {
    //     if (typeof window !== 'undefined' && !session) {
    //         router.push("/");
    //     }
    // }, [session, router]);

    return (
        <header className="w-full border-b">
            <div className="wrapper flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <Link href="/">
                        <Image
                            src="/assets/savannah.jpg" width={110} height={32}
                            className="rounded-full"
                            alt="Savannah Logo"
                        />
                    </Link>
                    <span className="text-base">Savannah <br /> Informatics</span>
                </div>
                <div className="flex w-32 justify-end gap-3">
                    {session ? (
                        <>
                        <DropdownMenu>
                        <DropdownMenuTrigger>
                            {/* <Button className="rounded-full bg-black px-10 py-4">My Account</Button> */}
                            <img 
                                src={user?.image || defaultImage} 
                                alt="User image" 
                                className="w-10 h-10 mx-auto rounded-full dark:bg-gray-500" 
                            />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuLabel>My Account</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem><Link href="/profile">Profile</Link></DropdownMenuItem>
                          <DropdownMenuItem><Link href="/">Home</Link></DropdownMenuItem>
                          <DropdownMenuItem>Settings</DropdownMenuItem>
                          <DropdownMenuItem><Button className="rounded-full bg-black px-10 py-4" onClick={() => signOut()}>Sign Out</Button></DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      
                        {/* <Button className="rounded-full bg-black px-10 py-4" onClick={() => signOut()}>Sign Out</Button> */}
                        </>
                    ) : (
                        <Button className="rounded-full bg-black px-10 py-4" size="lg">
                            <Link href="/login">
                                Login
                            </Link>
                        </Button>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;





// "use client"

// import Link from "next/link"
// import Image from "next/image"
// import { Button } from "../ui/button"
// import { useSession, signIn, signOut } from "next-auth/react"
// import { useEffect } from "react"

// const Header = () => {
//     const { data: session } = useSession();
//     useEffect(() => {})

//     return (
//         <header className="w-full border-b">
//             <div className="wrapper flex items-center justify-between">
//                 <div className="flex items-center space-x-2">
//                     <Link href="/">
//                         <Image
//                             src="/assets/savannah.jpg" width={110} height={32}
//                             className="rounded-full"
//                             alt="Savannah Logo"
//                         />
                        
//                     </Link>
//                     <span className="text-base">Savannah <br /> informatics</span>
//                 </div>
//                 <div className="flex w-32 justify-end gap-3">
//                     {session ? <Button className="rounded-full bg-black px-10 py-4" onClick={() => signOut()}>Sign Out</Button> :
//                         <Button className="rounded-full bg-black px-10 py-4" size="lg">
//                             <Link href="/login">
//                                 Login
//                             </Link>
//                         </Button>}
//                 </div>
//             </div>
//         </header>
//     )
// }

// export default Header
