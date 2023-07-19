'use client'

import Image from "next/image"
import { motion as m } from "framer-motion"

const Section1 = () => {
    return (
        <div className="flex xl:w-full max-w-md flex-col xl:flex-row mx-auto xl:justify-start xl:max-w-none items-start">
            <div className="text-md items-start xl:w-1/4 xl:pr-8 mb-8 xl:mb-0 uppercase md:text-lg">
                <m.div
                initial={{filter: 'blur(10px)'}}
                whileInView={{filter: 'blur(0px)'}}
                viewport={{ once: true, margin: '0px 0px -100px 0px' }}
                transition={{ duration: 0.5 }}
                >
                    Companies I Worked for
                </m.div>
            </div>
            <div className=" xl:w-3/5 grid grid-cols-4 xl:grid-cols-6 gap-4 xl:gap-8 xl:ml-auto">
                <Image
                    src="/loadingicon.png"
                    width={100}
                    height={100}
                    className="object-contain w-full" />
                <Image
                    src="/loadingicon.png"
                    width={100}
                    height={100}
                    className="object-contain w-full" />
                <Image
                    src="/loadingicon.png"
                    width={100}
                    height={100}
                    className="object-contain w-full" />
                <Image
                    src="/loadingicon.png"
                    width={100}
                    height={100}
                    className="object-contain w-full" />
                <Image
                    src="/loadingicon.png"
                    width={100}
                    height={100}
                    className="object-contain w-full" />
                <Image
                    src="/loadingicon.png"
                    width={100}
                    height={100}
                    className="object-contain w-full" />
                <Image
                    src="/loadingicon.png"
                    width={100}
                    height={100}
                    className="object-contain w-full" />
                <Image
                    src="/loadingicon.png"
                    width={100}
                    height={100}
                    className="object-contain w-full" />
                <Image
                    src="/loadingicon.png"
                    width={100}
                    height={100}
                    className="object-contain w-full" />
                <Image
                    src="/loadingicon.png"
                    width={100}
                    height={100}
                    className="object-contain w-full" />
                <Image
                    src="/loadingicon.png"
                    width={100}
                    height={100}
                    className="object-contain w-full" />
                <Image
                    src="/loadingicon.png"
                    width={100}
                    height={100}
                    className="object-contain w-full" />
                <Image
                    src="/loadingicon.png"
                    width={100}
                    height={100}
                    className="object-contain w-full" />
                <Image
                    src="/loadingicon.png"
                    width={100}
                    height={100}
                    className="object-contain w-full" />
                <Image
                    src="/loadingicon.png"
                    width={100}
                    height={100}
                    className="object-contain w-full" />
                <Image
                    src="/loadingicon.png"
                    width={100}
                    height={100}
                    className="object-contain w-full" />
                <Image
                    src="/loadingicon.png"
                    width={100}
                    height={100}
                    className="object-contain w-full" />
                <Image
                    src="/loadingicon.png"
                    width={100}
                    height={100}
                    className="object-contain w-full" />
                <Image
                    src="/loadingicon.png"
                    width={100}
                    height={100}
                    className="object-contain w-full" />
                <Image
                    src="/loadingicon.png"
                    width={100}
                    height={100}
                    className="object-contain w-full" />
                <Image
                    src="/loadingicon.png"
                    width={100}
                    height={100}
                    className="object-contain w-full" />
                <Image
                    src="/loadingicon.png"
                    width={100}
                    height={100}
                    className="object-contain w-full" />
                <Image
                    src="/loadingicon.png"
                    width={100}
                    height={100}
                    className="object-contain w-full" />
                <Image
                    src="/loadingicon.png"
                    width={100}
                    height={100}
                    className="object-contain w-full" />
            </div>
        </div>
    )
}

export default Section1