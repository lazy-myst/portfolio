'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"

const Footer = () => {
    const pathname = usePathname()

    return (
        <footer className={`w-full py-20 ${pathname === '/whyme' ? 'bg-white text-black'
            : pathname === '/work' ? 'bg-[#EEFFC9] text-black'
                : pathname === '/contact' ? 'bg-[#ADD8E6] text-black'
                    : 'bg-black text-white'}`}>
            <div className="container">
                <div className="max-w-md xl:max-w-none mx-auto text-[13px] sm:text-sm grid grid-cols-1 xl:grid-rows-2 xl:grid-cols-3 xl:grid-flow-col-dense gap-x-16 xl:gap-x-24 gap-y-6">
                    <div className="col-span-2 xl:col-auto flex flex-col md:flex-row gap-3 md:gap-4 xl:gap-8 uppercase">
                        <Link
                            className="hover:opacity-50 transition duration-300"
                            href='/whyme'>
                            why me
                        </Link>
                        <Link
                            className="hover:opacity-50 transition duration-300"
                            href='/work'>
                            work
                        </Link>
                        <Link
                            className="hover:opacity-50 transition duration-300"
                            href='/contact'>
                            contact
                        </Link>
                    </div>
                    <div className="col-span-full xl:col-span-1 xl:col-start-2 order-last xl:order-none mt-16 xl:mt-0">
                        <Link
                            href='mailto:ammad9978@gmail.com'>ammad9978@gmail.com</Link>
                    </div>
                    <div className="col-span-full xl:col-auto xl:row-span-full mt-16 xl:mt-0">
                        LIVES IN KARACHI, PAKISTAN
                        <br />
                        <br />
                        The City of Lights, with the beauty of Sea
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer