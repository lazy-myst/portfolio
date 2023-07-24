'use client'

import { motion as m } from "framer-motion"

const HeroSection = () => {
    return (
        <section className="container mt-56 mb-24 xl:my-64">
            <m.h1
                initial={{ filter: 'blur(10px)' }}
                whileInView={{ filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '0px 0px -300px 0px' }}
                transition={{ duration: 0.5, delay: .5 }}
                className="text-3xl xl:text-4xl text-center">
                An assortment of my Work
            </m.h1>
        </section>
    )
}

export default HeroSection