'use client'

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import gsap from "gsap"
import { registerCover, endTransition } from "../../lib/transition"

export default function PageCover() {
    const ref = useRef(null)
    const textRef = useRef(null)
    const covered = useRef(false)
    const pathname = usePathname()

    useEffect(() => {
        return registerCover({
            in: (label) =>
                new Promise((resolve) => {
                    textRef.current.textContent = label || "Next"
                    covered.current = true
                    gsap.timeline({ onComplete: resolve })
                        .set(ref.current, { y: 0, yPercent: 100, visibility: "visible" })
                        .to(ref.current, { yPercent: 0, duration: 0.75, ease: "power3.inOut" })
                        .fromTo(textRef.current, { yPercent: 100, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.5, ease: "power3.out" }, "-=0.35")
                }),
            markSkip: () => { covered.current = false },
        })
    }, [])

    // New route rendered → reveal it.
    useEffect(() => {
        if (!covered.current) {
            endTransition()
            return
        }
        covered.current = false
        gsap.timeline({ delay: 0.15, onComplete: endTransition })
            .to(textRef.current, { yPercent: -100, opacity: 0, duration: 0.4, ease: "power2.in" })
            .to(ref.current, { yPercent: -100, duration: 0.8, ease: "power3.inOut" }, "-=0.15")
            .set(ref.current, { visibility: "hidden" })
    }, [pathname])

    return (
        <div ref={ref} className="page-cover" aria-hidden="true">
            <div className="overflow-hidden">
                <p ref={textRef} className="font-serif italic text-5xl md:text-7xl">Next</p>
            </div>
        </div>
    )
}
