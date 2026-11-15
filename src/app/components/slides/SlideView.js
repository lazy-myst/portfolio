'use client'

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import gsap from "gsap"
import { slides, site } from "../../data/projects"
import { glState, setGL, subscribeGL } from "../../lib/glStore"
import { goToSlide } from "../../lib/slideNav"

export const SLIDE_LEAVE_EVENT = "slide:leave"

function Arrow({ dir }) {
    // Long thin arrow; the head points away from the centre.
    return (
        <svg className="slideNavi__arrow" viewBox="0 0 360 7" preserveAspectRatio="none" aria-hidden="true">
            {dir < 0
                ? <polyline points="360,7 0,7 21,0 21,6 360,6" />
                : <polyline points="0,7 360,7 339,0 339,6 0,6" />}
        </svg>
    )
}

function NaviLink({ dir, slide, onGo }) {
    return (
        <a
            href={slide.href}
            className={`slideNavi__link slideNavi__link--${dir < 0 ? "prev" : "next"} slide-in`}
            onClick={(e) => { e.preventDefault(); onGo(dir) }}
            data-cursor={dir < 0 ? "Prev" : "Next"}
        >
            <span className="slideNavi__num">#{slide.number}</span>
            <span className="slideNavi__title"><span>{slide.title}</span></span>
            <Arrow dir={dir} />
        </a>
    )
}

function HomeContent() {
    return (
        <h1 className="slideHome">
            <span className="slideHome__role slide-in">{site.role}</span>
            <span className="slideHome__name slide-in">
                {site.name.toUpperCase().split("").map((c, i) => <span key={i}>{c}</span>)}
            </span>
            <span className="slideHome__from slide-in">{site.tagline}</span>
        </h1>
    )
}

function ProjectContent({ project }) {
    const [info, setInfo] = useState(false)
    return (
        <div className="slideWork">
            <div className="slideWork__header slide-in">
                <span>#{project.number}</span>
                <span>{project.category}</span>
            </div>
            <h1 className="slideWork__title slide-in">{project.title}</h1>
            <p className="slideWork__desc slide-in">{project.description}</p>
            <div className="slideWork__actions slide-in">
                <button type="button" className="slideWork__info" aria-expanded={info} onClick={() => setInfo((v) => !v)}>
                    {info ? "Close" : "Information"}
                </button>
            </div>
            <dl className={`slideWork__meta ${info ? "is-open" : ""}`}>
                <div><dt>Year</dt><dd>{project.year}</dd></div>
                <div><dt>Role</dt><dd>{project.role}</dd></div>
                <div><dt>Stack</dt><dd>{project.stack.join(" / ")}</dd></div>
            </dl>
        </div>
    )
}

export default function SlideView({ index }) {
    const router = useRouter()
    const rootRef = useRef(null)
    const drag = useRef(null)
    const slide = slides[index]
    const n = slides.length
    const prev = slides[(index - 1 + n) % n]
    const next = slides[(index + 1) % n]

    // Point the stage at this slide and open the letterbox.
    useEffect(() => {
        if (glState.index !== index) setGL({ index, direction: index > glState.index ? 1 : -1 })
        setGL({ open: true })
    }, [index])

    // Text in: wait for the loader (first visit) and for the streak to settle.
    const playIn = useCallback(() => {
        const items = rootRef.current?.querySelectorAll(".slide-in")
        if (!items?.length) return
        gsap.fromTo(items,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.1, ease: "power3.out", stagger: 0.07, delay: glState.busy ? 0.9 : 0.6 })
    }, [])
    useLayoutEffect(() => {
        if (glState.ready) {
            playIn()
            return
        }
        const off = subscribeGL((s) => { if (s.ready) { off(); playIn() } })
        return () => { off() }
    }, [index, playIn])

    const leave = useCallback(() => {
        const items = rootRef.current?.querySelectorAll(".slide-in")
        if (items?.length) gsap.to(items, { y: -24, opacity: 0, duration: 0.4, ease: "power2.in", stagger: 0.03 })
    }, [])

    const step = useCallback((dir) => goToSlide(router, index + dir, dir, leave), [router, index, leave])

    // The header asks the text to leave when the index opens.
    useEffect(() => {
        window.addEventListener(SLIDE_LEAVE_EVENT, leave)
        return () => window.removeEventListener(SLIDE_LEAVE_EVENT, leave)
    }, [leave])

    // Wheel, keys.
    useEffect(() => {
        let acc = 0
        let timer
        const onWheel = (e) => {
            const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY
            acc += delta
            clearTimeout(timer)
            timer = setTimeout(() => { acc = 0 }, 180)
            if (Math.abs(acc) > 60) {
                step(acc > 0 ? 1 : -1)
                acc = 0
            }
        }
        const onKey = (e) => {
            if (e.key === "ArrowRight" || e.key === "ArrowDown") step(1)
            if (e.key === "ArrowLeft" || e.key === "ArrowUp") step(-1)
        }
        window.addEventListener("wheel", onWheel, { passive: true })
        window.addEventListener("keydown", onKey)
        return () => {
            window.removeEventListener("wheel", onWheel)
            window.removeEventListener("keydown", onKey)
            clearTimeout(timer)
        }
    }, [step])

    // Drag / swipe.
    const onPointerDown = (e) => { drag.current = { x: e.clientX, y: e.clientY } }
    const onPointerUp = (e) => {
        if (!drag.current) return
        const dx = e.clientX - drag.current.x
        const dy = e.clientY - drag.current.y
        drag.current = null
        const main = Math.abs(dx) > Math.abs(dy) ? dx : dy
        if (Math.abs(main) > 60) step(main < 0 ? 1 : -1)
    }

    return (
        <section ref={rootRef} className="slide">
            <div
                className="slide__hit"
                data-cursor="Drag"
                onPointerDown={onPointerDown}
                onPointerUp={onPointerUp}
                onPointerCancel={() => { drag.current = null }}
            />
            <div className="slide__content" key={slide.key}>
                {slide.project ? <ProjectContent project={slide.project} /> : <HomeContent />}
            </div>
            <nav className="slideNavi" aria-label="Slides">
                <NaviLink dir={-1} slide={prev} onGo={step} />
                <NaviLink dir={1} slide={next} onGo={step} />
            </nav>
        </section>
    )
}
