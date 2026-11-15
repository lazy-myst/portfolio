'use client'

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import Lenis from "lenis"

let lenis = null
export const getLenis = () => lenis

export default function SmoothScroll() {
    const pathname = usePathname()

    useEffect(() => {
        lenis = new Lenis({ lerp: 0.09, smoothWheel: true })
        let raf
        const loop = (time) => {
            lenis.raf(time)
            raf = requestAnimationFrame(loop)
        }
        raf = requestAnimationFrame(loop)
        return () => {
            cancelAnimationFrame(raf)
            lenis.destroy()
            lenis = null
        }
    }, [])

    // Every route starts at the top; the Focus page never scrolls.
    useEffect(() => {
        if (!lenis) return
        lenis.scrollTo(0, { immediate: true, force: true })
        if (pathname === "/") lenis.stop()
        else lenis.start()
    }, [pathname])

    return null
}
