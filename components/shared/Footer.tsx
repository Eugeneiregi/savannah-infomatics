import Link from "next/link"
import Image from "next/image"


const Footer = () => {
    return (
        <footer className="border-t justify-between ">
            <div className="flex-center wrapper flex-between flex flex-col gap-4 p-5 text-center sm:flex-row">
                <Link href='/'>
                    <Image
                        src="/assets/savannah.jpg" width={110} height={32}
                        className="rounded-full"
                        alt="Savannah Logo"
                    />
                </Link>

                <p>2024 Savannah Informatics. All Rights reserved.</p>
            </div>
        </footer>

    )
}

export default Footer
