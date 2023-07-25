'use client'

import Image from "next/image"
import Link from "next/link"
import { motion as m } from "framer-motion"

const ProjectsSection = () => {

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-10 xl:gap-y-24">
            <Link
                href='#'
                className="block relative">
                <m.div
                    initial={{ filter: 'blur(10px)' }}
                    whileInView={{ filter: 'blur(0px)' }}
                    viewport={{ once: true, margin: '0px 0px -400px 0px' }}
                    transition={{ duration: 0.5, delay: .3 }}
                    className="aspect-w-14 aspect-h-9">
                    <div className="overflow-hidden">
                        <Image
                            src="https://wallpapers.com/images/hd/anticipation-builds-with-coming-soon-message-mhp3vf2zctx9ydvr.jpg"
                            height={1280}
                            width={720}
                            className="object-cover w-full h-full hover:scale-105 transition duration-700" />
                    </div>
                </m.div>
                <div className="absolute bottom-3 md:bottom-6 left-3 md:left-6 ">
                    <m.h5
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: '0px 0px -300px 0px' }}
                        transition={{ duration: 0.5, delay: .5 }}
                        className="text-base uppercase">
                        Coming Soon
                    </m.h5>
                    <m.h6
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: '0px 0px -300px 0px' }}
                        transition={{ duration: 0.5, delay: .5 }}
                        className="text-sm">
                        Coming Soon
                    </m.h6>
                </div>
            </Link>
            <Link
                href='#'
                className="block relative">
                <m.div
                    className="aspect-w-14 aspect-h-9"
                    initial={{ filter: 'blur(10px)' }}
                    whileInView={{ filter: 'blur(0px)' }}
                    viewport={{ once: true, margin: '0px 0px -400px 0px' }}
                    transition={{ duration: 0.5, delay: .3 }}>
                    <div className="overflow-hidden">
                        <Image
                            src="https://wallpapers.com/images/hd/anticipation-builds-with-coming-soon-message-mhp3vf2zctx9ydvr.jpg"
                            height={1280}
                            width={720}
                            className="object-cover w-full h-full hover:scale-105 transition duration-700" />
                    </div>
                </m.div>
                <div className="absolute bottom-3 md:bottom-6 left-3 md:left-6 ">
                    <m.h5
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: '0px 0px -300px 0px' }}
                        transition={{ duration: 0.5, delay: .5 }} className="text-base uppercase">
                        Coming Soon
                    </m.h5>
                    <m.h6
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: '0px 0px -300px 0px' }}
                        transition={{ duration: 0.5, delay: .5 }}
                        className="text-sm">
                        Coming Soon
                    </m.h6>
                </div>
            </Link>
            <Link
                href='#'
                className="block relative">
                <m.div
                    className="aspect-w-14 aspect-h-9"
                    initial={{ filter: 'blur(10px)' }}
                    whileInView={{ filter: 'blur(0px)' }}
                    viewport={{ once: true, margin: '0px 0px -400px 0px' }}
                    transition={{ duration: 0.5, delay: .3 }}>
                    <div className="overflow-hidden">
                        <Image
                            src="https://wallpapers.com/images/hd/anticipation-builds-with-coming-soon-message-mhp3vf2zctx9ydvr.jpg"
                            height={1280}
                            width={720}
                            className="object-cover w-full h-full hover:scale-105 transition duration-700" />
                    </div>
                </m.div>
                <div className="absolute bottom-3 md:bottom-6 left-3 md:left-6 ">
                    <m.h5
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: '0px 0px -300px 0px' }}
                        transition={{ duration: 0.5, delay: .5 }}
                        className="text-base uppercase">
                        Coming Soon
                    </m.h5>
                    <m.h6
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: '0px 0px -300px 0px' }}
                        transition={{ duration: 0.5, delay: .5 }}
                        className="text-sm">
                        Coming Soon
                    </m.h6>
                </div>
            </Link>
            <Link
                href='#'
                className="block relative">
                <m.div
                    initial={{ filter: 'blur(10px)' }}
                    whileInView={{ filter: 'blur(0px)' }}
                    viewport={{ once: true, margin: '0px 0px -400px 0px' }}
                    transition={{ duration: 0.5, delay: .3 }}
                    className="aspect-w-14 aspect-h-9">
                    <div className="overflow-hidden">
                        <Image
                            src="https://wallpapers.com/images/hd/anticipation-builds-with-coming-soon-message-mhp3vf2zctx9ydvr.jpg"
                            height={1280}
                            width={720}
                            className="object-cover w-full h-full hover:scale-105 transition duration-700" />
                    </div>
                </m.div>
                <div className="absolute bottom-3 md:bottom-6 left-3 md:left-6 ">
                    <m.h5
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: '0px 0px -300px 0px' }}
                        transition={{ duration: 0.5, delay: .5 }}
                        className="text-base uppercase">
                        Coming Soon
                    </m.h5>
                    <m.h6
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: '0px 0px -300px 0px' }}
                        transition={{ duration: 0.5, delay: .5 }}
                        className="text-sm">
                        Coming Soon
                    </m.h6>
                </div>
            </Link>
            <Link
                href='#'
                className="block relative">
                <m.div
                    initial={{ filter: 'blur(10px)' }}
                    whileInView={{ filter: 'blur(0px)' }}
                    viewport={{ once: true, margin: '0px 0px -400px 0px' }}
                    transition={{ duration: 0.5, delay: .3 }}
                    className="aspect-w-14 aspect-h-9">
                    <div className="overflow-hidden">
                        <Image
                            src="https://wallpapers.com/images/hd/anticipation-builds-with-coming-soon-message-mhp3vf2zctx9ydvr.jpg"
                            height={1280}
                            width={720}
                            className="object-cover w-full h-full hover:scale-105 transition duration-700" />
                    </div>
                </m.div>
                <div className="absolute bottom-3 md:bottom-6 left-3 md:left-6 ">
                    <m.h5
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: '0px 0px -300px 0px' }}
                        transition={{ duration: 0.5, delay: .5 }}
                        className="text-base uppercase">
                        Coming Soon
                    </m.h5>
                    <m.h6
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: '0px 0px -300px 0px' }}
                        transition={{ duration: 0.5, delay: .5 }}
                        className="text-sm">
                        Coming Soon
                    </m.h6>
                </div>
            </Link>
        </div>
    )
}

export default ProjectsSection