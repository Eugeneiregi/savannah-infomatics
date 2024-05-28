import Link from "next/link"
import Image from "next/image"
import { Button } from "../ui/button"

const Header = () => {
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
                    <span className="text-base">Savannah <br /> informatics</span>
                </div>
                <div className="flex w-32 justify-end gap-3">
                    <Button className="rounded-full bg-black" size="lg">
                        <Link href="/login">
                            Login
                        </Link>
                    </Button>
                </div>
            </div>
        </header>
    )
}

export default Header
