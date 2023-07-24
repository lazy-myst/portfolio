'use client'

import { motion as m } from "framer-motion"

const DevelopmentSection = () => {
    return (
        <>
            <div className="flex items-center justify-center py-40">
                <m.h2 className="text-3xl md:text-2xl py-12 max-w-3xl"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: '0px 0px -200px 0px' }}
                    transition={{ duration: 0.5, delay: .2 }}
                >The efficient CDI development process, I admire
                </m.h2>
            </div>
            <div className="container max-w-screen-xl px-0 xl:px-8 mx-auto flex items-center justify-center mb-20 xl:my-40 py-20">
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-24 xl:gap-24">
                    <div className="text-left max-w-md mx-auto">
                        <m.h4 className="mb-8 text-sm tracking-wide uppercase"
                            initial={{ filter: 'blur(10px)' }}
                            whileInView={{ filter: 'blur(0px)' }}
                            viewport={{ once: true, margin: '0px 0px -300px 0px' }}
                            transition={{ duration: 0.5 }}
                        >
                            collabration
                        </m.h4>
                        <m.p className="text-lg xl:text-xl"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true, margin: '0px 0px -200px 0px' }}
                            transition={{ duration: 0.5, delay: .5 }}>
                            Collaboration is necessary in order to solve problems. Everyone has an aptitude to generate ideas.
                            <br />
                            <br />
                            They will be able to develop an inventive new product by applying their own talents, perspectives, and interests into action.
                        </m.p>
                    </div>
                    <div className="text-left max-w-md mx-auto">
                        <m.h4 className="mb-8 text-sm tracking-wide uppercase"
                            initial={{ filter: 'blur(10px)' }}
                            whileInView={{ filter: 'blur(0px)' }}
                            viewport={{ once: true, margin: '0px 0px -300px 0px' }}
                            transition={{ duration: 0.5 }}>
                            Discussion
                        </m.h4>
                        <m.p className="text-lg xl:text-xl"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true, margin: '0px 0px -200px 0px' }}
                            transition={{ duration: 0.5, delay: .5 }}>
                            People acquire the chance to discuss ideas and interests, open up to others, and evaluate other perspectives via discussion.
                            <br />
                            <br />
                            An personal encounter like discussion assists people forge bonds with one another. These bonds bring people together and foster a feeling of community.
                        </m.p>
                    </div>
                    <div className="text-left max-w-md mx-auto">
                        <m.h4 className="mb-8 text-sm tracking-wide uppercase"
                            initial={{ filter: 'blur(10px)' }}
                            whileInView={{ filter: 'blur(0px)' }}
                            viewport={{ once: true, margin: '0px 0px -300px 0px' }}
                            transition={{ duration: 0.5 }}>
                            innovation
                        </m.h4>
                        <m.p className="text-lg xl:text-xl"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true, margin: '0px 0px -200px 0px' }}
                            transition={{ duration: 0.5, delay: .5 }}>
                            The history of humanity has always been greatly influenced by innovation. Innovation has always been responsible for many advancements in our world.
                            <br />
                            <br />
                            It persists to play a vital role of regulating the global economy and our society as a whole.
                        </m.p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DevelopmentSection