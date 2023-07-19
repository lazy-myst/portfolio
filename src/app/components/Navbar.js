'use client';

import Link from "next/link"
import { motion as m, } from "framer-motion";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const Navbar = () => {
    const [navStyle, setNavStyle] = useState(true)
    const pathname = usePathname()
    
    useEffect(() => {
        window.addEventListener('scroll', changeStyle)
    })

    const changeStyle = () => {
        if (window.scrollY > 100) {
            setNavStyle(false)
        } else {
            setNavStyle(true)
        }
    }



    return (
        <nav className={`${pathname === '/' ? `text-white` : `text-black`} w-full mx-auto flex-wrap uppercase md:px-5 px-4 py-4 flex md:justify-around justify-between md:text-sm text-xs items-center`} >
            <span className='flex mb-auto  md:justify-center w-1/2 md:w-1/4 md:p-4 '>
                <Link href="/" className=" flex cursor-pointer items-center ">
                    <span className="rounded-full mr-2 h-3 w-3 md:h-4 md:w-4 bg-current"></span>
                    <span className="font-bold text-xl overflow-hidden flex md:text-2xl ">
                        <span className={`${navStyle ? 'translate-x-[-120px]' : 'translate-x-[-240px]'} duration-500 `}>
                            <m.div
                                className="duration-300 ease-out "
                                animate={{ x: 120 }}
                                transition={{ duration: .5 }}
                            >
                                Ammad
                            </m.div>
                        </span>
                    </span>
                </Link>
            </span>
            <div className="flex items-end w-1/2 flex-col md:flex-row justify-around">
                <div className="p-2">
                    <Link
                        href="/whyme"
                        className="cursor-pointer duration-300 flex overflow-hidden focus:opacity-70 hover:opacity-70">
                        <span className="translate-x-[-120px]">
                            <m.div
                                className=" transition duration-300"
                                animate={{ x: 120 }}
                                transition={{ delay: .25, duration: .4 }}
                            >
                                Why me ?
                            </m.div>
                        </span>
                    </Link>
                </div>
                <div className="p-2 ">
                    <Link
                        href="/work"
                        className=" hover:opacity-70 focus:opacity-70 duration-300 flex overflow-hidden cursor-pointer">
                        <span className="translate-x-[-120px]">
                            <m.div
                                className=" transition duration-300"
                                animate={{ x: 120 }}
                                transition={{ delay: .35, duration: .4 }}
                            >
                                Work
                            </m.div>
                        </span>
                    </Link>
                </div>
            </div>
            <div className=" md:justify-center w-1/2 ml-auto md:ml-0 flex justify-end md:w-1/4 p-2 ">
                <Link
                    href="/contact"
                    className="hover:opacity-70 focus:opacity-70 flex duration-300 overflow-hidden cursor-pointer">
                    <span className="translate-x-[-120px]">
                        <m.div
                            className=" transition duration-300"
                            animate={{ x: 120 }}
                            transition={{ delay: .45, duration: .4 }}
                        >
                            Contact
                        </m.div>
                    </span>
                </Link>
            </div>
        </nav >
    )
}

export default Navbar