'use client'

import { motion as m } from "framer-motion"

const HeroSection = () => {
    return (
        <section className="h-screen container max-w-screen-2xl mx-auto text-center flex justify-center items-center">
            <m.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, }}
                transition={{ duration: 0.5, delay: .5 }}
                className=" text-3xl md:text-2xl py-12 max-w-3xl uppercase">
                enthusiastic javascript developer pursuing teams to collaborate with and serve.
            </m.h2>
        </section>
    )
}

export default HeroSection