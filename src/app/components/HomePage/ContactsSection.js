'use client'

import Link from "next/link"
import Image from "next/image"
import { motion as m } from "framer-motion"
import { useState } from "react"

const ContactsSection = () => {
    const [isHover, setIsHover] = useState(false)
    return (
        <div className="max-w-md w-full flex flex-col xl:flex-row xl:max-w-none xl:mx-0 mx-auto">
            <div className="xl:w-1/4 xl:pr-8 flex xl:flex-col justify-center xl:justify-start">
                <h5 className="text-lg tracking-wide leading-5 xl:mb-32 mb-4 uppercase">
                    <m.div
                        initial={{ filter: 'blur(10px)' }}
                        whileInView={{ filter: 'blur(0px)' }}
                        viewport={{ once: true, margin: '0px 0px -100px 0px' }}
                        transition={{ duration: 0.5, delay: .4 }}>
                        Social</m.div>
                </h5>
                <h6 className="text-lg hidden xl:block tracking-wide leading-5 uppercase">
                    <Link
                        href='/contact'
                        className="flex items-center text-base">
                        <m.span
                            initial={{ display: 'flex', opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true, margin: '0px 0px -200px 0px' }}
                            transition={{ duration: 0.8, delay:.8 }}>
                            <span className={`${isHover ? 'bg-white' : 'bg-transparent'} hover:bg-white rounded-full duration-300 border mr-3 h-3 w-3`}></span>
                        </m.span>
                        <div className=" flex overflow-hidden"
                            onMouseOver={() => setIsHover(true)}
                            onMouseLeave={() => setIsHover(false)}>
                            <m.div
                                initial={{ opacity: 0, x: -75 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: '0px 0px -200px 0px' }}
                                transition={{ duration: 0.5, delay: .8 }}>
                                More ways to contact
                            </m.div>
                        </div>
                    </Link>
                </h6>
            </div>
            <div className="xl:w-1/2 space-y-4 text-sm flex flex-col md:text-base">
                <Link 
                    target="_blank"
                    href='https://www.instagram.com/aint_myst/' 
                    className="flex items-center ">
                    <m.div
                        initial={{ display: 'flex', opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: '0px 0px -200px 0px' }}
                        transition={{ duration: 0.8, delay: .6 }}>
                        <Image
                            src='/instalogo.png'
                            height={25}
                            width={25}
                            alt="Insta Logo"
                            className="mr-2"
                        />
                    </m.div>
                    <div className="flex overflow-hidden">
                        <m.div
                            initial={{ opacity: 0, x: -65 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: '0px 0px -200px 0px' }}
                            transition={{ duration: 0.5, delay: .7 }}>
                            Instagram
                        </m.div>
                    </div>
                </Link>
                <Link 
                    target="_blank"
                    href='https://www.facebook.com/aint.myst/' 
                    className="flex items-center ">
                    <m.div
                        initial={{ display: 'flex', opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: '0px 0px -200px 0px' }}
                        transition={{ duration: 0.8, delay: .6 }}>
                        <Image
                            src='/facebooklogo.png'
                            height={25}
                            width={25}
                            alt="Facebook Logo"
                            className="mr-2"
                        />
                    </m.div>
                    <div className="flex overflow-hidden">
                        <m.span
                            initial={{ opacity: 0, x: -65 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: '0px 0px -200px 0px' }}
                            transition={{ duration: 0.5, delay: .7 }}>
                            Facebook
                        </m.span>
                    </div>
                </Link>
                <Link 
                    target="_blank"
                    href='https://www.linkedin.com/in/muhammad-ammad-8193b724a/' 
                    className="flex items-center ">
                    <m.div
                        initial={{ display: 'flex', opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: '0px 0px -200px 0px' }}
                        transition={{ duration: 0.8, delay: .6 }}>
                        <Image
                            src='/linkedinlogo.png'
                            height={25}
                            width={25}
                            alt="Facebook Logo"
                            className="mr-2"
                        />
                    </m.div>
                    <div className="flex overflow-hidden">
                        <m.span
                            initial={{ opacity: 0, x: -55 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: '0px 0px -200px 0px' }}
                            transition={{ duration: 0.5, delay: .7 }}>
                            Linked In
                        </m.span>
                    </div>
                </Link>
                <Link
                    href='/contact'
                    className="flex xl:hidden items-center text-base"><m.span
                        initial={{ display: 'flex', opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: '0px 0px -200px 0px' }}
                        transition={{ duration: 0.8, delay: .8 }}>
                        <span className={`${isHover ? 'bg-white' : 'bg-transparent'} hover:bg-white rounded-full duration-300 border mr-3 h-3 w-3`}></span>
                    </m.span>
                    <div className=" flex overflow-hidden"
                        onMouseOver={() => setIsHover(true)}
                        onMouseLeave={() => setIsHover(false)}>
                        <m.div
                            initial={{ opacity: 0, x: -75 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: '0px 0px -200px 0px' }}
                            transition={{ duration: 0.5, delay: .8 }}>
                            More ways to contact
                        </m.div>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default ContactsSection
