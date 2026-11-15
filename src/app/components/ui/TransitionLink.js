'use client'

import Link from "next/link"
import { useRouter } from "next/navigation"
import { navigate } from "../../lib/transition"

// A Link that plays the page cover before navigating.
export default function TransitionLink({ href, label, onClick, children, ...props }) {
    const router = useRouter()

    const handleClick = (e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
        e.preventDefault()
        onClick?.(e)
        navigate(router, href, { label })
    }

    return (
        <Link href={href} onClick={handleClick} {...props}>
            {children}
        </Link>
    )
}
