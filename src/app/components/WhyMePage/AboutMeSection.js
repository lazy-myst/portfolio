'use client'

import { motion as m } from "framer-motion"

const AboutMeSection = () => {
    return (
        <div className=" flex flex-col xl:gap-24">
            <div className="xl:w-1/2 py-14 xl:py-20">
                <div className="max-w-md mx-auto">
                    <m.h4
                        initial={{ filter: 'blur(10px)' }}
                        whileInView={{ filter: 'blur(0px)' }}
                        viewport={{ once: true, margin: '0px 0px -300px 0px' }}
                        transition={{ duration: 0.5 }}
                        className="text-sm tracking-wide uppercase mb-8">
                        My Interest
                    </m.h4>
                    <m.p
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '0px 0px -300px 0px' }}
                        transition={{ duration: 0.5, delay: .6 }}
                        className="text-xl">
                        I've always been interested in technology, consequently I chose the IT profession, where I discovered my enthusiasm in coding and comprehended about several sectors.
                    </m.p>
                </div>
            </div>
            <div className="xl:w-1/2 py-14 xl:py-20">
                <div className="max-w-md mx-auto">
                    <m.h4
                        initial={{ filter: 'blur(10px)' }}
                        whileInView={{ filter: 'blur(0px)' }}
                        viewport={{ once: true, margin: '0px 0px -300px 0px' }}
                        transition={{ duration: 0.5 }}
                        className="text-sm tracking-wide uppercase mb-8">
                        why does goals matters
                    </m.h4>
                    <m.p
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '0px 0px -300px 0px' }}
                        transition={{ duration: 0.5, delay: .6 }}
                        className="text-xl">
                        The importance of setting goals should not be disregarded. It has the power to improve your life and the capacity to do so. Once you make it a practise to establish objectives in advance of what you would like to attain inside a time frame.
                        <br />
                        <br />
                        You'll eventually observe how capable you are and be able to alter your life.
                    </m.p>
                </div>
            </div>
            <div className="xl:w-1/2 xl:ml-auto py-14 xl:py-20">
                <div className="max-w-md mx-auto">
                    <m.h4
                        initial={{ filter: 'blur(10px)' }}
                        whileInView={{ filter: 'blur(0px)' }}
                        viewport={{ once: true, margin: '0px 0px -300px 0px' }}
                        transition={{ duration: 0.5 }}
                        className="text-sm tracking-wide uppercase mb-8">
                        Mindset
                    </m.h4>
                    <m.p
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '0px 0px -300px 0px' }}
                        transition={{ duration: 0.5, delay: .6 }}
                        className="text-xl">
                        I write code utilising my personal expertise, therefore I'm not reluctant of asking queries that can help with resolving issues and optimise a concept.
                    </m.p>
                </div>
            </div>
            <div className="xl:w-1/2 xl:ml-auto py-14 xl:py-20">
                <div className="max-w-md mx-auto">
                    <m.h4
                        initial={{ filter: 'blur(10px)' }}
                        whileInView={{ filter: 'blur(0px)' }}
                        viewport={{ once: true, margin: '0px 0px -300px 0px' }}
                        transition={{ duration: 0.5 }}
                        className="text-sm tracking-wide uppercase mb-8">
                        Listen to Heart
                    </m.h4>
                    <m.p
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '0px 0px -300px 0px' }}
                        transition={{ duration: 0.5, delay: .6 }}
                        className="text-xl">
                        Listening to your emotions and perception is a crucial part of following your heart. Making decisions based on your thoughts rather than your intellect is what it means to listen to your heart.
                        <br />
                        <br />
                        Listening to your heart has significance in every aspect of life, not just relationships and liaisons.
                    </m.p>
                </div>
            </div>
        </div>
    )
}

export default AboutMeSection