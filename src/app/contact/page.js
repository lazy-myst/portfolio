'use client'

import Image from "next/image"
import Link from "next/link"
import { motion as m } from "framer-motion"


const page = () => {

    return (
        <main className="bg-[#ADD8E6] text-black flex  min-h-screen">
            <div className="flex container px-0 justify-center mt-40 items-start md:items-center flex-col gap-y-6">
                <div className="flex hover:opacity-70">
                    <m.div
                        initial={{ filter: 'blur(10px)' }}
                        whileInView={{ filter: 'blur(0px)' }}
                        viewport={{ once: true, margin: '0px 0px -200px 0px' }}
                        transition={{ duration: .5, delay: .5 }}
                        className="flex items-center justify-center">
                        <Image
                            src="/ghlogoCon.png"
                            height={100}
                            width={100}
                            className="p-2"
                        />
                        <div className="flex ml-3 text-xl items-center justify-center">
                            <Link
                                target="_blank"
                                href='https://github.com/lazy-myst'>lazy-myst
                            </Link>
                        </div>
                    </m.div>
                </div>
                <div className="flex hover:opacity-70">
                    <m.div
                        initial={{ filter: 'blur(10px)' }}
                        whileInView={{ filter: 'blur(0px)' }}
                        viewport={{ once: true, margin: '0px 0px -200px 0px' }}
                        transition={{ duration: .5, delay: .5 }} className=" flex items-center justify-center">
                        <Image
                            src="/lilogoCon.png"
                            height={100}
                            width={100}
                            className="p-4"
                        />
                        <div className="flex ml-3 text-xl items-center justify-center">
                            <Link
                                target="_blank"
                                href='https://www.linkedin.com/in/muhammad-ammad-8193b724a/'>Muhammad Ammad
                            </Link>
                        </div>
                    </m.div>
                </div>
                <div className="flex hover:opacity-70">
                    <m.div
                        initial={{ filter: 'blur(10px)' }}
                        whileInView={{ filter: 'blur(0px)' }}
                        viewport={{ once: true, margin: '0px 0px -200px 0px' }}
                        transition={{ duration: .5, delay: .5 }}
                        className=" flex  items-center justify-center">
                        <Image
                            src="/iglogoCon.png"
                            height={100}
                            width={100}
                            className="p-5"
                        />
                        <div className="flex text-xl ml-3 items-center justify-center">
                            <Link
                                target="_blank"
                                href='https://www.instagram.com/aint_myst/'>aint_myst
                            </Link>
                        </div>
                    </m.div>
                </div>
                <div className="flex hover:opacity-70">
                    <m.div
                        initial={{ filter: 'blur(10px)' }}
                        whileInView={{ filter: 'blur(0px)' }}
                        viewport={{ once: true, margin: '0px 0px -200px 0px' }}
                        transition={{ duration: .5, delay: .5 }}
                        className=" flex items-center justify-center">
                        <Image
                            src="/fblogoCon.png"
                            height={100}
                            width={100}
                            className="p-4"
                        />
                        <div className="flex ml-3 text-xl items-center justify-center">
                            <Link
                                target="_blank"
                                href='https://www.facebook.com/aint.myst/'>Aint Myst
                            </Link>
                        </div>
                    </m.div>
                </div>
                <div className="flex hover:opacity-70">
                    <m.div
                        initial={{ filter: 'blur(10px)' }}
                        whileInView={{ filter: 'blur(0px)' }}
                        viewport={{ once: true, margin: '0px 0px -200px 0px' }}
                        transition={{ duration: .5, delay: .5 }}
                        className=" flex  items-center justify-center">
                        <Image
                            src="/tNewlogoCon.png"
                            height={100}
                            width={100}
                            className="p-6"
                        />
                        <div className="flex ml-3 text-xl items-center justify-center">
                            <Link
                                target="_blank"
                                href='https://twitter.com/MYSTGAMING5'>Ain't Myst
                            </Link>
                        </div>
                    </m.div>
                </div>
            </div>
        </main>
    )
}

export default page