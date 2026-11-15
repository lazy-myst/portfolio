'use client'

import { useEffect, useRef } from "react"
import { glState, subscribeGL } from "./glStore"

// Run `cb` once, as soon as the loader has finished (immediately on later visits).
export function useGLReady(cb) {
    const cbRef = useRef(cb)
    cbRef.current = cb
    useEffect(() => {
        let fired = false
        const fire = () => {
            if (fired) return
            fired = true
            cbRef.current()
        }
        if (glState.ready) {
            fire()
            return
        }
        const off = subscribeGL((s) => { if (s.ready) { fire(); off() } })
        return () => { off() }
    }, [])
}

// Adds `is-in` to every `.reveal` element inside `ref` when it scrolls into view.
export function useReveal(ref) {
    useEffect(() => {
        const root = ref.current
        if (!root) return
        const els = root.querySelectorAll(".reveal")
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-in")
                        io.unobserve(entry.target)
                    }
                })
            },
            { rootMargin: "0px 0px -12% 0px" }
        )
        els.forEach((el) => io.observe(el))
        return () => io.disconnect()
    }, [ref])
}
