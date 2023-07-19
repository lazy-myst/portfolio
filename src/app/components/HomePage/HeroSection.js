'use client'

import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"

const HeroSection = () => {
    return (
        <div className="flex-1">
            <div className="h-screen text-white container justify-center m-auto md:flex-row flex-col flex items-center">
                <AnimatePresence>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 1 }}
                        exit={{ opacity: 0 }}>
                        <Image
                            className="md:ml-[-5rem]"
                            src="https://images.pexels.com/photos/5266990/pexels-photo-5266990.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            height="300"
                            width="500"
                            alt="Image"
                        />
                    </motion.div>
                </AnimatePresence>
                <div className=" flex items-center overflow-hidden md:items-start max-w-xs flex-col">
                    <h1 className="uppercase cursor-default translate-x-[-203px] font-semibold text-3xl md:text-5xl ">
                        <motion.div
                            className="transition duration-300"
                            animate={{ x: 206 }}
                            transition={{ delay: .25, duration: .4 }}
                        >
                            ammad
                        </motion.div>
                    </h1>
                    <AnimatePresence>
                        <motion.div
                            className="transition duration-300"
                            animate={{ x: 301 }}
                            transition={{ delay: .50, duration: .4 }}
                        >
                            <p className=" translate-x-[-300px] cursor-default text-xs md:text-sm text-center md:text-left">
                                Why the moon pic ? I just like it&nbsp;&lt;3.
                            </p>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div >

        </div>
    )
}

export default HeroSection