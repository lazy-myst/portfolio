'use client'

import { useCallback, useEffect, useRef } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import gsap from "gsap"
import { projects } from "../../data/projects"
import { glApi, glState, setGL, subscribeGL } from "../../lib/glStore"
import { navigate } from "../../lib/transition"
import { getLenis } from "../ui/SmoothScroll"

export const INDEX_CLOSE_EVENT = "index:close"

export default function IndexList() {
    const router = useRouter()
    const rootRef = useRef(null)
    const thumbRefs = useRef([])
    const opening = useRef(false)

    // Unfold a thumbnail into its slide, then change the route.
    const openProject = useCallback(async (i) => {
        if (opening.current) return
        opening.current = true
        getLenis()?.stop()
        gsap.to(rootRef.current.querySelectorAll(".index-fade"), { opacity: 0, duration: 0.5, ease: "power2.in" })
        const api = glApi()
        if (api) await api.openItem(i)
        else setGL({ index: i + 1, open: true })
        router.push(`/work/${projects[i].slug}`, { scroll: false })
    }, [router])

    useEffect(() => {
        const api = glApi()
        const lenis = getLenis()
        const from = glState.index

        // Bring the slot of the slide we came from into view before folding into it.
        let target = 0
        const el = from > 0 ? thumbRefs.current[from - 1] : null
        if (el) {
            const r = el.getBoundingClientRect()
            target = Math.max(0, window.scrollY + r.top + r.height / 2 - window.innerHeight / 2)
        }
        if (lenis) lenis.scrollTo(target, { immediate: true, force: true })
        window.scrollTo(0, target)

        api?.setList(thumbRefs.current)
        const delay = api ? api.revealList(from) : 0.5
        setGL({ open: false })

        // Text fades in alongside the thumbnails.
        const fadeIn = () => gsap.fromTo(
            rootRef.current.querySelectorAll(".index-fade"),
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.04, delay: delay + 0.3 }
        )
        let offReady
        if (glState.ready) fadeIn()
        else offReady = subscribeGL((s) => { if (s.ready) { offReady(); offReady = null; fadeIn() } })

        // Scrolling makes the thumbnails ripple in depth.
        const onScroll = ({ velocity }) => glApi()?.setScrollVelocity(velocity)
        lenis?.on("scroll", onScroll)

        // The header X closes the index back into the current slide.
        const onClose = () => {
            const cur = glState.index
            if (cur > 0) openProject(cur - 1)
            else navigate(router, "/", { useCover: false })
        }
        window.addEventListener(INDEX_CLOSE_EVENT, onClose)

        return () => {
            offReady?.()
            lenis?.off("scroll", onScroll)
            window.removeEventListener(INDEX_CLOSE_EVENT, onClose)
            glApi()?.setList(null)
        }
    }, [openProject, router])

    return (
        <section ref={rootRef} className="index">
            <header className="index-head index-fade">
                <h1>Index</h1>
                <span className="tabular-nums">{String(projects.length).padStart(3, "0")} works</span>
            </header>
            <ul className="index-grid">
                {projects.map((p, i) => (
                    <li key={p.slug} className="index-card">
                        <a
                            href={`/work/${p.slug}`}
                            onClick={(e) => { e.preventDefault(); openProject(i) }}
                            onPointerEnter={() => glApi()?.hover(i, true)}
                            onPointerLeave={() => glApi()?.hover(i, false)}
                            className="index-card__inner"
                            data-cursor="Open"
                        >
                            <span className="index-card__num index-fade tabular-nums">{String(i + 1).padStart(3, "0")}</span>
                            <span className="index-card__thumb" ref={(el) => { thumbRefs.current[i] = el }}>
                                {/* Shown only without WebGL; otherwise the stage draws this slot. */}
                                <Image src={p.cover} alt="" fill sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw" className="object-cover" />
                            </span>
                            <span className="index-card__title index-fade"><span>{p.title}</span></span>
                            <span className="index-card__cat index-fade">{p.category} — {p.year}</span>
                        </a>
                    </li>
                ))}
            </ul>
        </section>
    )
}
