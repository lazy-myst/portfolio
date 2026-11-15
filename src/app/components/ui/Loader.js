'use client'

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { glState, setGL, subscribeGL } from "../../lib/glStore"
import { site } from "../../data/projects"

const MIN_TIME = 1600

export default function Loader() {
    const ref = useRef(null)
    const countRef = useRef(null)
    const barRef = useRef(null)
    const [done, setDone] = useState(false)

    useEffect(() => {
        const start = performance.now()
        const shown = { value: 0 }
        let finished = false

        const letters = ref.current.querySelectorAll(".loader__letter")
        gsap.fromTo(letters, { y: 0, yPercent: 110 }, { y: 0, yPercent: 0, duration: 1, ease: "power4.out", stagger: 0.06, delay: 0.1 })

        const render = () => {
            if (!countRef.current) return
            countRef.current.textContent = String(Math.round(shown.value * 100)).padStart(3, "0")
            barRef.current.style.transform = `scaleX(${shown.value})`
        }

        const finish = () => {
            if (finished) return
            finished = true
            const wait = Math.max(0, MIN_TIME - (performance.now() - start)) / 1000
            gsap.timeline({ delay: wait })
                .to(shown, { value: 1, duration: 0.4, onUpdate: render })
                .to(letters, { yPercent: -110, duration: 0.7, ease: "power3.in", stagger: 0.04 })
                .add(() => setGL({ ready: true }), "-=0.2")
                .to(ref.current, { clipPath: "inset(0 0 100% 0)", duration: 1, ease: "power4.inOut" }, "-=0.3")
                .add(() => setDone(true))
        }

        const update = (s) => {
            if (finished) return
            gsap.to(shown, { value: s.progress * 0.95, duration: 0.6, onUpdate: render, overwrite: true })
            if (s.loaded) finish()
        }
        update(glState)
        const off = subscribeGL(update)
        return () => { off() }
    }, [])

    if (done) return null

    return (
        <div ref={ref} className="loader" style={{ clipPath: "inset(0 0 0% 0)" }}>
            <div className="flex overflow-hidden font-serif text-[18vw] md:text-[12vw] leading-none tracking-tight">
                {site.name.toUpperCase().split("").map((l, i) => (
                    <span key={i} className="loader__letter inline-block">{l}</span>
                ))}
            </div>
            <div className="loader__meta">
                <span className="uppercase tracking-[0.3em] text-[10px] text-neutral-400">{site.role}</span>
                <span ref={countRef} className="tabular-nums text-xs text-neutral-400">000</span>
            </div>
            <div className="loader__bar"><div ref={barRef} className="loader__barFill" /></div>
        </div>
    )
}
