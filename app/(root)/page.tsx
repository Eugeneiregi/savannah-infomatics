"use client"

import { Button } from "@/components/ui/button";
import { useSession, signIn, signOut } from "next-auth/react"
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const { data: session } = useSession();
  return (
    <>
       <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h1-bold">Create, Explore, Celebrate: Your Albums, Our Platform!</h1>
            <p className="p-regular-20 md:p-regular-24">Book create and explore 3,168+ albums in world-class Albums with our Album community.</p>
          {session ? 
            <Button size="lg" asChild className="button w-full sm:w-fit bg-black">
              <Link href="/users">
                Explore Now
              </Link>
            </Button> : <Button className="rounded-full bg-black" onClick={() => signOut()}>PLease Sign here</Button>}
          </div>

          <Image 
            src="/assets/album.jpg"
            alt="album"
            width={1000}
            height={1000}
            className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]"
          />
        </div>
      </section>
    </>
  );
}
