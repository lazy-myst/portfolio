'use client'

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { projects } from "../../data/projects"
import { glState, setGL, showProject } from "../../lib/glStore"
import { useGLReady } from "../../lib/hooks"
import TransitionLink from "../ui/TransitionLink"

export default function WorksList() {
    const rootRef = useRef(null)
    const [hovered, setHovered] = useState(null)

    useEffect(() => {
        setGL({ mode: "list" })
    }, [])

    useGLReady(() => {
        gsap.fromTo(
            rootRef.current.querySelectorAll(".works-row__inner"),
            { y: 0, yPercent: 110 },
            { y: 0, yPercent: 0, duration: 1.2, ease: "power4.out", stagger: 0.07, delay: 0.3 }
        )
        gsap.fromTo(
            rootRef.current.querySelectorAll(".works-fade"),
            { opacity: 0 },
            { opacity: 1, duration: 1, delay: 0.6, stagger: 0.05 }
        )
    })

    const enter = (i) => {
        setHovered(i)
        setGL({ mode: "focus" })
        showProject(i, 1.1)
    }
    const leave = () => {
        setHovered(null)
        setGL({ mode: "list" })
    }

    return (
        <section ref={rootRef} className="works">
            <div className="works-fade flex items-end justify-between text-[11px] uppercase tracking-[0.25em] text-neutral-400 mb-10 md:mb-16">
                <span>Selected work</span>
                <span className="tabular-nums">{String(projects.length).padStart(2, "0")} Projects</span>
            </div>
            <ul onPointerLeave={leave}>
                {projects.map((p, i) => (
                    <li
                        key={p.slug}
                        className={`works-row ${hovered !== null && hovered !== i ? "is-dim" : ""}`}
                        onPointerEnter={() => enter(i)}
                    >
                        <TransitionLink
                            href={`/work/${p.slug}`}
                            label={p.title}
                            data-cursor="Open"
                            onClick={() => setGL({ index: i, direction: i > glState.index ? 1 : -1 })}
                            className="works-row__link"
                        >
                            <span className="works-fade tabular-nums text-xs text-neutral-400 w-10 shrink-0">{p.number}</span>
                            <span className="overflow-hidden flex-1">
                                <span className="works-row__inner block font-serif works-row__title">{p.title}</span>
                            </span>
                            <span className="works-fade hidden md:block text-[11px] uppercase tracking-[0.25em] text-neutral-400 w-48 text-right">{p.category}</span>
                            <span className="works-fade text-[11px] tabular-nums text-neutral-400 w-14 text-right">{p.year}</span>
                        </TransitionLink>
                    </li>
                ))}
            </ul>
        </section>
    )
}
