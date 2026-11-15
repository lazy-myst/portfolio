'use client'

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import gsap from "gsap"
import { projects, site } from "../../data/projects"
import { glState, setGL, sendGL } from "../../lib/glStore"
import { navigate } from "../../lib/transition"
import { useGLReady } from "../../lib/hooks"

const LOCK_MS = 1300

export default function FocusView() {
    const router = useRouter()
    const [active, setActive] = useState(() => glState.index)
    const rootRef = useRef(null)
    const titleRef = useRef(null)
    const lockUntil = useRef(0)
    const drag = useRef(null)
    const opening = useRef(false)
    const project = projects[active]

    // Enter focus mode.
    useEffect(() => {
        setGL({ mode: "focus", hover: window.matchMedia("(pointer: fine)").matches ? 1 : 0 })
        sendGL("reset-zoom")
        return () => setGL({ hover: 0 })
    }, [])

    // Intro once the loader is gone.
    useGLReady(() => {
        gsap.fromTo(
            rootRef.current.querySelectorAll(".focus-intro"),
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.1, ease: "power3.out", stagger: 0.08, delay: 0.2 }
        )
    })

    // Title swap animation on every change.
    useLayoutEffect(() => {
        const chars = titleRef.current?.querySelectorAll(".char")
        if (!chars?.length) return
        gsap.fromTo(chars, { yPercent: 115, rotate: 6 }, { yPercent: 0, rotate: 0, duration: 1.1, ease: "power4.out", stagger: 0.025, delay: 0.25 })
    }, [active])

    const goTo = useCallback((next, dir) => {
        const now = performance.now()
        if (now < lockUntil.current || opening.current) return
        lockUntil.current = now + LOCK_MS
        const n = projects.length
        const index = ((next % n) + n) % n
        if (index === glState.index) return
        setGL({ index, direction: dir, duration: 1.6, velocity: 1 })
        setActive(index)
    }, [])

    const step = useCallback((dir) => goTo(glState.index + dir, dir), [goTo])

    const open = useCallback(() => {
        if (opening.current) return
        opening.current = true
        const p = projects[glState.index]
        sendGL("open")
        gsap.to(rootRef.current.querySelectorAll(".focus-ui"), { opacity: 0, y: -20, duration: 0.6, ease: "power2.in", stagger: 0.03 })
        navigate(router, `/work/${p.slug}`, {
            useCover: false,
            beforePush: () => new Promise((r) => setTimeout(r, 850)),
        })
    }, [router])

    // Wheel + keyboard.
    useEffect(() => {
        let acc = 0
        let accTimer
        const onWheel = (e) => {
            acc += e.deltaY
            clearTimeout(accTimer)
            accTimer = setTimeout(() => { acc = 0 }, 160)
            setGL({ velocity: Math.min(1, Math.abs(acc) / 200) })
            if (Math.abs(acc) > 50) {
                step(acc > 0 ? 1 : -1)
                acc = 0
            }
        }
        const onKey = (e) => {
            if (e.key === "ArrowDown" || e.key === "ArrowRight") step(1)
            if (e.key === "ArrowUp" || e.key === "ArrowLeft") step(-1)
            if (e.key === "Enter") open()
        }
        window.addEventListener("wheel", onWheel, { passive: true })
        window.addEventListener("keydown", onKey)
        return () => {
            window.removeEventListener("wheel", onWheel)
            window.removeEventListener("keydown", onKey)
            clearTimeout(accTimer)
        }
    }, [step, open])

    // Drag / swipe on the stage. A tap opens the project.
    const onPointerDown = (e) => {
        drag.current = { x: e.clientX, y: e.clientY, moved: 0 }
    }
    const onPointerMove = (e) => {
        if (!drag.current) return
        const dy = e.clientY - drag.current.y
        const dx = e.clientX - drag.current.x
        drag.current.moved = Math.max(Math.abs(dy), Math.abs(dx))
        setGL({ velocity: Math.min(1, drag.current.moved / 250) })
    }
    const onPointerUp = (e) => {
        if (!drag.current) return
        const dy = e.clientY - drag.current.y
        const dx = e.clientX - drag.current.x
        const moved = drag.current.moved
        drag.current = null
        if (moved < 8) return open()
        const main = Math.abs(dy) > Math.abs(dx) ? dy : dx
        if (Math.abs(main) > 60) step(main < 0 ? 1 : -1)
    }

    return (
        <section ref={rootRef} className="focus">
            {/* Stage hit area */}
            <div
                className="absolute inset-0 touch-none select-none"
                data-cursor="View"
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={() => { drag.current = null }}
            />

            {/* Project title */}
            <div className="focus__info pointer-events-none">
                <div className="focus-ui focus-intro flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-neutral-300 mb-4">
                    <span className="tabular-nums">{project.number}</span>
                    <span className="w-10 h-px bg-neutral-400" />
                    <span className="tabular-nums text-neutral-500">{String(projects.length).padStart(2, "0")}</span>
                </div>
                <h1 ref={titleRef} className="focus-ui focus-intro focus__title font-serif" aria-live="polite">
                    {project.title.split("").map((c, i) => (
                        <span key={i} className="char-wrap"><span className="char">{c === " " ? " " : c}</span></span>
                    ))}
                </h1>
                <div className="focus-ui focus-intro mt-5 flex flex-wrap gap-x-6 gap-y-1 text-[11px] uppercase tracking-[0.25em] text-neutral-400">
                    <span>{project.category}</span>
                    <span>{project.year}</span>
                </div>
                <button
                    type="button"
                    onClick={open}
                    className="focus-ui focus-intro pointer-events-auto mt-8 link-underline text-[11px] uppercase tracking-[0.25em]"
                >
                    View project
                </button>
            </div>

            {/* Indicator */}
            <ol className="focus-ui focus-intro focus__indicator">
                {projects.map((p, i) => (
                    <li key={p.slug}>
                        <button
                            type="button"
                            aria-label={`Show ${p.title}`}
                            onClick={() => goTo(i, i > glState.index ? 1 : -1)}
                            className={`focus__tick ${i === active ? "is-active" : ""}`}
                        >
                            <span className="tabular-nums">{p.number}</span>
                            <span className="focus__tickLine" />
                        </button>
                    </li>
                ))}
            </ol>

            {/* Side contact */}
            <address className="focus-ui focus-intro focus__contact not-italic">
                <dl className="space-y-4">
                    <div>
                        <dt className="font-serif text-lg">Hello.</dt>
                        <dd><a className="link-underline text-xs text-neutral-300" href={`mailto:${site.email}`}>{site.email}</a></dd>
                    </div>
                    <div>
                        <dt className="font-serif text-lg">Work Together.</dt>
                        <dd className="flex gap-4">
                            {site.socials.map((s) => (
                                <a key={s.href} className="link-underline text-xs text-neutral-300" href={s.href} target="_blank" rel="noreferrer">{s.label}</a>
                            ))}
                        </dd>
                    </div>
                </dl>
            </address>

            {/* Scroll hint */}
            <div className="focus-ui focus-intro focus__hint pointer-events-none">
                <span className="focus__hintLine" />
                <span>Scroll · Drag</span>
            </div>
        </section>
    )
}
