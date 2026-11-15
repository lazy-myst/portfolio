'use client'

import { usePathname } from "next/navigation"
import TransitionLink from "./TransitionLink"
import { site } from "../../data/projects"

const NAV = [
    { href: "/", label: "Focus" },
    { href: "/work", label: "All" },
    { href: "/whyme", label: "About" },
    { href: "/contact", label: "Contact" },
]

export default function SiteHeader() {
    const pathname = usePathname()
    const isActive = (href) => (href === "/" ? pathname === "/" : pathname.startsWith(href))

    return (
        <header className="site-header">
            <TransitionLink href="/" label="Focus" className="font-serif text-2xl tracking-tight leading-none">
                {site.name}<span className="text-neutral-500">.</span>
            </TransitionLink>
            <nav>
                <ul className="flex gap-5 md:gap-8 text-[11px] uppercase tracking-[0.2em]">
                    {NAV.map((item) => (
                        <li key={item.href}>
                            <TransitionLink
                                href={item.href}
                                label={item.label}
                                className={`nav-link ${isActive(item.href) ? "is-active" : ""}`}
                            >
                                {item.label}
                            </TransitionLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    )
}
