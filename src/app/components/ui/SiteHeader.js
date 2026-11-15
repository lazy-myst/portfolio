'use client'

import { usePathname, useRouter } from "next/navigation"
import TransitionLink from "./TransitionLink"
import { site } from "../../data/projects"
import { glState, setGL } from "../../lib/glStore"
import { navigate } from "../../lib/transition"
import { INDEX_CLOSE_EVENT } from "../slides/IndexList"
import { SLIDE_LEAVE_EVENT } from "../slides/SlideView"

function ArrowRight() {
    return (
        <svg className="header__arrow" viewBox="0 0 45 7" aria-hidden="true">
            <polyline points="0,7 45,7 24,0 24,6 0,6" />
        </svg>
    )
}

export default function SiteHeader() {
    const pathname = usePathname()
    const router = useRouter()
    const listOpen = pathname === "/work"

    // Hamburger: a project slide folds straight into its thumbnail on the index;
    // the home slide closes its letterbox first. X: unfold back into the slide.
    const toggleList = (e) => {
        e.preventDefault()
        if (listOpen) {
            window.dispatchEvent(new Event(INDEX_CLOSE_EVENT))
            return
        }
        window.dispatchEvent(new Event(SLIDE_LEAVE_EVENT))
        if (glState.index > 0) {
            navigate(router, "/work", { useCover: false })
            return
        }
        setGL({ open: false })
        navigate(router, "/work", {
            useCover: false,
            beforePush: () => new Promise((r) => setTimeout(r, 750)),
        })
    }

    return (
        <header className="header">
            <div className="header__left">
                <TransitionLink href="/" label={site.name} className="header__home underline-anim">
                    {site.name.toUpperCase()}
                </TransitionLink>
                <TransitionLink href="/whyme" label="About" className={`header__about ${pathname === "/whyme" ? "is-active" : ""}`}>
                    <span>About</span>
                    <ArrowRight />
                </TransitionLink>
                <TransitionLink href="/contact" label="Contact" className={`header__about ${pathname === "/contact" ? "is-active" : ""}`}>
                    <span>Contact</span>
                    <ArrowRight />
                </TransitionLink>
            </div>

            <ul className="header__sns">
                {site.socials.map((s) => (
                    <li key={s.href}>
                        <a href={s.href} target="_blank" rel="noreferrer" className="underline-anim">{s.label.toLowerCase()}</a>
                    </li>
                ))}
            </ul>

            <a
                href={listOpen ? "/" : "/work"}
                onClick={toggleList}
                className={`menuTrigger ${listOpen ? "is-close" : ""}`}
                aria-label={listOpen ? "Close index" : "Open index"}
            >
                <span /><span /><span />
            </a>
        </header>
    )
}
