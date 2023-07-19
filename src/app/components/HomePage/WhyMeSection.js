'use client'

import Link from "next/link"
import { motion as m } from "framer-motion"
import { useState } from "react"

const Section = () => {
    const [isHover, setIsHover] = useState(false)

    return (
        <section className="max-w-md  lg:max-w-none xl:mx-0 mx-auto lg:w-1/2 flex-col flex items-start">
            <h3 className="text-base md:text-lg overflow-hidden">
                <m.div
                    initial={{ opacity: 0, y: 75 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '0px 0px -200px 0px' }}
                    transition={{ duration: 0.5 }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas at ligula libero. Integer pellentesque diam est, volutpat tempus lectus sagittis nec. Praesent et hendrerit risus.
                </m.div>
            </h3>
            <Link href="/whyme" className="text-xs md:text-sm uppercase overflow-hidden my-4 flex items-center">
                <m.span
                    initial={{ display: 'flex', opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: '0px 0px -200px 0px' }}
                    transition={{ duration: 0.8, delay: .4 }}>
                    <span className={`${isHover ? 'bg-white' : 'bg-transparent'} hover:bg-white rounded-full duration-300 border mr-3 h-3 w-3`}></span>
                </m.span>
                <div className="flex overflow-hidden"
                    onMouseOver={() => setIsHover(true)}
                    onMouseLeave={() => setIsHover(false)}>
                    <m.div
                        initial={{ opacity: 0, x: -75 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '0px 0px -200px 0px' }}
                        transition={{ duration: 0.5, delay: .4 }}>Explore Why me
                    </m.div>
                </div>
            </Link>
        </section >
    )
}

export default Section