'use client'

import { useEffect, useRef } from "react"
import Image from "next/image"
import gsap from "gsap"
import { projects } from "../../data/projects"
import { setGL, showProject, sendGL } from "../../lib/glStore"
import { useGLReady, useReveal } from "../../lib/hooks"
import TransitionLink from "../ui/TransitionLink"

export default function ProjectDetail({ slug }) {
    const rootRef = useRef(null)
    const project = projects.find((p) => p.slug === slug)
    const next = projects[(project.index + 1) % projects.length]

    useReveal(rootRef)

    useEffect(() => {
        setGL({ mode: "detail", detailScroll: 0, hover: 0 })
        showProject(project.index, 1.4)
        sendGL("reset-zoom")

        const onScroll = () => {
            setGL({ detailScroll: Math.min(1, window.scrollY / window.innerHeight) })
        }
        window.addEventListener("scroll", onScroll, { passive: true })
        return () => {
            window.removeEventListener("scroll", onScroll)
            setGL({ detailScroll: 0 })
        }
    }, [project.index])

    useGLReady(() => {
        const q = gsap.utils.selector(rootRef)
        gsap.fromTo(q(".hero-char"), { y: 0, yPercent: 115 }, { y: 0, yPercent: 0, duration: 1.3, ease: "power4.out", stagger: 0.03, delay: 0.2 })
        gsap.fromTo(q(".hero-fade"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.08, delay: 0.6 })
    })

    return (
        <article ref={rootRef}>
            <TransitionLink href="/work" label="All" className="detail-close" aria-label="Close project">
                <span /><span />
            </TransitionLink>

            {/* Hero: transparent so the WebGL image shows through */}
            <header className="detail-hero">
                <div className="hero-fade flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-neutral-300 mb-6">
                    <span className="tabular-nums">{project.number}</span>
                    <span className="w-10 h-px bg-neutral-400" />
                    <span>{project.category}</span>
                </div>
                <h1 className="font-serif detail-hero__title">
                    {project.title.split("").map((c, i) => (
                        <span key={i} className="char-wrap"><span className="hero-char inline-block">{c === " " ? " " : c}</span></span>
                    ))}
                </h1>
                <p className="hero-fade mt-6 max-w-md text-neutral-300">{project.summary}</p>
                <div className="hero-fade detail-hero__scroll">
                    <span className="focus__hintLine" />
                    <span>Scroll</span>
                </div>
            </header>

            <div className="detail-body">
                {/* Overview */}
                <section className="detail-grid">
                    <div className="reveal">
                        <h2 className="detail-label">Overview</h2>
                    </div>
                    <p className="reveal detail-lead font-serif">{project.description}</p>
                    <dl className="reveal detail-meta">
                        <div><dt>Year</dt><dd>{project.year}</dd></div>
                        <div><dt>Role</dt><dd>{project.role}</dd></div>
                        <div><dt>Stack</dt><dd>{project.stack.join(", ")}</dd></div>
                    </dl>
                </section>

                {/* Gallery */}
                <section className="detail-gallery">
                    {project.images.map((src, i) => (
                        <figure key={src} className={`reveal reveal--image detail-figure detail-figure--${i % 4}`}>
                            <Image src={src} alt={`${project.title} screenshot ${i + 1}`} fill sizes="(min-width: 768px) 70vw, 100vw" className="object-cover" />
                        </figure>
                    ))}
                </section>

                {/* Next project */}
                <TransitionLink href={`/work/${next.slug}`} label={next.title} data-cursor="Next" className="detail-next">
                    <span className="text-[11px] uppercase tracking-[0.25em] text-neutral-400">Next project — {next.number}</span>
                    <span className="font-serif detail-next__title">{next.title}</span>
                </TransitionLink>
            </div>
        </article>
    )
}
