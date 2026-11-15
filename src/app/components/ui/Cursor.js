'use client'

import { useEffect, useRef } from "react"
import gsap from "gsap"

// Spring-follow cursor. Grows over links; shows a label from data-cursor="View".
export default function Cursor() {
    const ref = useRef(null)
    const labelRef = useRef(null)

    useEffect(() => {
        if (window.matchMedia("(pointer: coarse)").matches) return
        const el = ref.current
        document.documentElement.classList.add("has-cursor")

        const xTo = gsap.quickTo(el, "x", { duration: 0.55, ease: "power3" })
        const yTo = gsap.quickTo(el, "y", { duration: 0.55, ease: "power3" })

        const move = (e) => {
            xTo(e.clientX)
            yTo(e.clientY)
            el.style.opacity = 1
        }
        const over = (e) => {
            const target = e.target.closest("[data-cursor], a, button")
            if (!target) {
                el.dataset.state = ""
                labelRef.current.textContent = ""
                return
            }
            const label = target.getAttribute("data-cursor") || ""
            el.dataset.state = label ? "label" : "link"
            labelRef.current.textContent = label
        }
        const leave = () => { el.style.opacity = 0 }

        window.addEventListener("pointermove", move)
        document.addEventListener("pointerover", over)
        document.addEventListener("pointerleave", leave)
        return () => {
            document.documentElement.classList.remove("has-cursor")
            window.removeEventListener("pointermove", move)
            document.removeEventListener("pointerover", over)
            document.removeEventListener("pointerleave", leave)
        }
    }, [])

    return (
        <div ref={ref} className="cursor" aria-hidden="true">
            <div className="cursor__ring" />
            <span ref={labelRef} className="cursor__label" />
        </div>
    )
}
