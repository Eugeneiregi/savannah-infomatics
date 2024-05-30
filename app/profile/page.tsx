"use client";

import Footer from "@/components/shared/Footer"
import Header from "@/components/shared/Header"
import Profile from "@/components/shared/Profile"

const profile = () => {

  return (
    <>
    <Header />
    <div className="justify-center h-[378px] items-center flex bg-primary-50 bg-dotted-pattern bg-contain">
      <Profile />
    </div>
    <Footer />
    </>
  )
}

export default profile
