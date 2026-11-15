'use client'

import { useEffect, useRef } from "react"
import Image from "next/image"
import gsap from "gsap"
import { site } from "../../data/projects"
import { setGL } from "../../lib/glStore"
import { useGLReady, useReveal } from "../../lib/hooks"

const interests = [
    {
        title: "My Interest",
        body: "I've always been interested in technology, so I chose the IT profession, where I discovered my enthusiasm for coding and learned about many different sectors.",
    },
    {
        title: "Mindset",
        body: "I write code from personal experience, and I'm never reluctant to ask questions that help resolve issues and sharpen a concept.",
    },
    {
        title: "Why goals matter",
        body: "Setting goals has the power to improve your life. Make it a practice to set objectives in advance and you'll eventually see how capable you are.",
    },
    {
        title: "Listen to heart",
        body: "Listening to your emotions and perception is a crucial part of following your heart — and it matters in every aspect of life, not just relationships.",
    },
]

const process = [
    { title: "Collaboration", body: "Collaboration is necessary to solve problems. Everyone has an aptitude to generate ideas, and together they become an inventive new product." },
    { title: "Discussion", body: "Discussion gives people the chance to share ideas, open up, and evaluate other perspectives — it builds bonds and a feeling of community." },
    { title: "Innovation", body: "Innovation has always shaped the history of humanity, and it continues to play a vital role in our economy and society as a whole." },
]

const companies = [
    { name: "Nubit Software", logo: "/nubitlogo.ico" },
    { name: "Apex Web Studios", logo: "/apex-logo.png" },
]

function Section({ number, title, children }) {
    return (
        <section className="about-section">
            <div className="reveal about-section__head">
                <span className="tabular-nums">{number}</span>
                <span className="w-10 h-px bg-neutral-600" />
                <h2>{title}</h2>
            </div>
            <div className="about-section__body">{children}</div>
        </section>
    )
}

export default function AboutView() {
    const rootRef = useRef(null)
    useReveal(rootRef)

    useEffect(() => {
        setGL({ mode: "hidden", hover: 0 })
    }, [])

    useGLReady(() => {
        gsap.fromTo(
            rootRef.current.querySelectorAll(".about-line"),
            { y: 0, yPercent: 110 },
            { y: 0, yPercent: 0, duration: 1.3, ease: "power4.out", stagger: 0.1, delay: 0.2 }
        )
    })

    return (
        <div ref={rootRef} className="page-shell">
            <h1 className="about-hero font-serif">
                <span className="block overflow-hidden"><span className="about-line block">Code, motion</span></span>
                <span className="block overflow-hidden"><span className="about-line block italic text-neutral-400">& a little light.</span></span>
            </h1>

            <Section number="01" title={site.name}>
                <p className="reveal about-lead font-serif">
                    I&apos;m {site.name}, a developer who builds interfaces that feel alive — fast, considered and
                    full of motion. This text is placeholder copy; replace it with your own introduction.
                </p>
            </Section>

            <Section number="02" title="Beliefs">
                <div className="about-cards">
                    {interests.map((item) => (
                        <div key={item.title} className="reveal">
                            <h3 className="about-cardTitle">{item.title}</h3>
                            <p className="text-neutral-400 leading-relaxed">{item.body}</p>
                        </div>
                    ))}
                </div>
            </Section>

            <Section number="03" title="Process">
                <div className="about-cards about-cards--3">
                    {process.map((item) => (
                        <div key={item.title} className="reveal">
                            <h3 className="about-cardTitle">{item.title}</h3>
                            <p className="text-neutral-400 leading-relaxed">{item.body}</p>
                        </div>
                    ))}
                </div>
            </Section>

            <Section number="04" title="Worked with">
                <ul className="about-companies">
                    {companies.map((c) => (
                        <li key={c.name} className="reveal">
                            <Image src={c.logo} alt="" width={48} height={48} className="object-contain w-10 h-10" />
                            <span className="font-serif text-2xl">{c.name}</span>
                        </li>
                    ))}
                </ul>
            </Section>

            <Section number="05" title="Hire me">
                <a href={`mailto:${site.email}`} className="reveal about-mail font-serif link-underline">{site.email}</a>
                <div className="reveal flex gap-8 mt-8 text-[11px] uppercase tracking-[0.25em]">
                    {site.socials.map((s) => (
                        <a key={s.href} href={s.href} target="_blank" rel="noreferrer" className="link-underline">{s.label}</a>
                    ))}
                </div>
            </Section>
        </div>
    )
}
