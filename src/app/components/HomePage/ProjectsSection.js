'use client'

import Image from "next/image"
import Link from "next/link"
import { motion as m } from "framer-motion"
import { useState } from "react"

const ProjectsSection = () => {
    const [isHover, setIsHover] = useState(false)

    return (
        <>
            <div className="xl:w-1/4 pr-8">
                <div className="xl:h-[80vh] xl:sticky xl:top-24 flex flex-col">
                    <div className="mb-8 tracking-wide text-lg leading-5 uppercase xl:mb-80">
                        <m.div
                            initial={{ filter: 'blur(10px)' }}
                            whileInView={{ filter: 'blur(0px)' }}
                            viewport={{ once: true, margin: '0px 0px -100px 0px' }}
                            transition={{ duration: 0.5 }}
                            className="xl:mb-4">
                            My Recent Projects
                        </m.div>
                    </div>
                    <div className="hidden xl:block relative mt-auto">
                        <Link href="/work" className="text-xs md:text-sm uppercase flex items-center">
                            <m.span
                                initial={{ display: 'flex', opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true, margin: '0px 0px -200px 0px' }}
                                transition={{ duration: 0.8 }}>
                                <span className={`${isHover ? 'bg-white' : 'bg-transparent'} hover:bg-white rounded-full duration-300 border mr-3 h-3 w-3`}></span>
                            </m.span>
                            <div className=" flex overflow-hidden"
                                onMouseOver={() => setIsHover(true)}
                                onMouseLeave={() => setIsHover(false)}>
                                <m.div
                                    initial={{ opacity: 0, x: -75 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: '0px 0px -150px 0px' }}
                                    transition={{ duration: 0.5 }}>
                                    More Work
                                </m.div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div >
            <div className="xl:flex-1">
                <div className="flex flex-col space-y-8">
                    <m.div
                        initial={{ clipPath: 'inset(50px)' }}
                        whileInView={{ clipPath: 'inset(0px)' }}
                        viewport={{ margin: '0px 0px -100px 0px' }}
                        transition={{ duration: 0.8 }}>
                        <Link
                            href="#"
                            className="block duration-700 relative">
                            <m.div
                                className="aspect-h-9 aspect-w-14">
                                <div className="overflow-hidden">
                                    <Image
                                        src="/31343D.svg"
                                        height={1280}
                                        width={720}
                                        className="w-full h-full object-cover hover:scale-105 transition duration-700"
                                        style={{ objectPosition: '50% 50%' }} />
                                </div>
                            </m.div>
                            <div className="absolute bottom-3 xl:bottom-6 left-3 xl:left-6">
                                <m.h5
                                    className="text-xs xl:text-base text-black uppercase"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: .5 }}>
                                    Coming Soon
                                </m.h5>
                                <m.h6 className="text-xs xl:text-sm text-black"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: .5 }}>
                                    Coming Soon
                                </m.h6>
                            </div>
                        </Link>
                    </m.div>
                    <m.div
                        initial={{ clipPath: 'inset(50px)' }}
                        whileInView={{ clipPath: 'inset(0px)' }}
                        viewport={{ margin: '0px 0px -100px 0px' }}
                        transition={{ duration: 0.8 }}>
                        <Link href="#" className="block relative">
                            <div className="aspect-w-14 aspect-h-9">
                                <div className="overflow-hidden">
                                    <Image
                                        src="/31343D.svg"
                                        height={1280}
                                        width={720}
                                        className="w-full h-full object-cover hover:scale-105 transition duration-700"
                                        style={{ objectPosition: '505 50%' }} />
                                </div>
                            </div>
                            <div className="absolute bottom-3 xl:bottom-6 left-3 xl:left-6">
                                <m.h5
                                    className="text-xs xl:text-base text-black uppercase"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: .5 }}>
                                    Coming Soon
                                </m.h5>
                                <m.h6
                                    className="text-xs xl:text-sm text-black"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: .5 }}>
                                    Coming Soon
                                </m.h6>
                            </div>
                        </Link>
                    </m.div>
                    <m.div
                        initial={{ clipPath: 'inset(50px)' }}
                        whileInView={{ clipPath: 'inset(0px)' }}
                        viewport={{ margin: '0px 0px -100px 0px' }}
                        transition={{ duration: 0.8 }}>
                        <Link href="#" className="block relative">
                            <div className="aspect-w-14 aspect-h-9">
                                <div className="overflow-hidden">
                                    <Image
                                        src="/31343D.svg"
                                        height={1280}
                                        width={720}
                                        className="w-full h-full object-cover hover:scale-105 transition duration-700" />
                                </div>
                            </div>
                            <div className="absolute bottom-3 xl:bottom-6 left-3 xl:left-6">
                                <m.h5
                                    className="text-xs xl:text-base text-black uppercase"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: .5 }}>
                                    Coming Soon
                                </m.h5>
                                <m.h6 className="text-xs xl:text-sm text-black"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: .5 }}>
                                    Coming Soon
                                </m.h6>
                            </div>
                        </Link>
                    </m.div>
                </div>
            </div>
            <div className="block xl:hidden mt-4">
                <Link href="/work" className="text-xs md:text-sm uppercase my-4 flex items-center">
                    <m.span
                        initial={{ display: 'flex', opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: '0px 0px -200px 0px' }}
                        transition={{ duration: 0.8 }}>
                        <span className={`${isHover ? 'bg-white' : 'bg-transparent'} hover:bg-white rounded-full duration-300 border mr-3 h-3 w-3`}></span>
                    </m.span>
                    <div className=" flex overflow-hidden"
                        onMouseOver={() => setIsHover(true)}
                        onMouseLeave={() => setIsHover(false)}>
                        <m.div
                            initial={{ opacity: 0, x: -75 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: '0px 0px -200px 0px' }}
                            transition={{ duration: 0.5 }}>
                            More Work
                        </m.div>
                    </div>
                </Link>
            </div>
        </>
    )
}

export default ProjectsSection