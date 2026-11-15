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

    // Every route starts at the top; slide pages (home + /work/<slug>) never scroll.
    useEffect(() => {
        if (!lenis) return
        // The index positions itself (it scrolls to the slot it folds into).
        if (pathname !== "/work") lenis.scrollTo(0, { immediate: true, force: true })
        const isSlide = pathname === "/" || pathname.startsWith("/work/")
        if (isSlide) lenis.stop()
        else lenis.start()
    }, [pathname])

    return null
}
