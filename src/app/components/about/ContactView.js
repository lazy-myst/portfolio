'use client'

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { site } from "../../data/projects"
import { setGL } from "../../lib/glStore"
import { useGLReady } from "../../lib/hooks"

export default function ContactView() {
    const rootRef = useRef(null)

    useEffect(() => {
        // Keep the current project image, heavily dimmed, behind the contact page.
        setGL({ mode: "list", hover: 0 })
    }, [])

    useGLReady(() => {
        const q = gsap.utils.selector(rootRef)
        gsap.fromTo(q(".contact-line"), { y: 0, yPercent: 110 }, { y: 0, yPercent: 0, duration: 1.3, ease: "power4.out", stagger: 0.1, delay: 0.2 })
        gsap.fromTo(q(".contact-fade"), { opacity: 0 }, { opacity: 1, duration: 1, delay: 0.7, stagger: 0.08 })
    })

    return (
        <section ref={rootRef} className="contact">
            <p className="contact-fade text-[11px] uppercase tracking-[0.25em] text-neutral-400 mb-8">Get in touch</p>
            <h1 className="font-serif contact__title">
                <span className="block overflow-hidden"><span className="contact-line block">Let&apos;s make</span></span>
                <span className="block overflow-hidden"><span className="contact-line block italic">something together.</span></span>
            </h1>
            <a href={`mailto:${site.email}`} className="contact-fade link-underline font-serif text-2xl md:text-4xl mt-12 inline-block">
                {site.email}
            </a>
            <ul className="contact-fade flex gap-8 mt-10 text-[11px] uppercase tracking-[0.25em]">
                {site.socials.map((s) => (
                    <li key={s.href}><a href={s.href} target="_blank" rel="noreferrer" className="link-underline">{s.label}</a></li>
                ))}
            </ul>
        </section>
    )
}
