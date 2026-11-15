import { slides } from "../data/projects"
import { glState, setGL } from "./glStore"

let lockUntil = 0
const LOCK_MS = 1500
const OUT_MS = 420

// Move the stage to slide `target` and change the URL once the text has left.
// `beforeLeave` lets the current view animate its text out.
export function goToSlide(router, target, dir, beforeLeave) {
    const now = performance.now()
    if (now < lockUntil) return false
    const n = slides.length
    const index = ((target % n) + n) % n
    if (index === glState.index && window.location.pathname === slides[index].href) return false
    lockUntil = now + LOCK_MS
    setGL({ index, direction: dir ?? (index > glState.index ? 1 : -1), open: true })
    beforeLeave?.()
    setTimeout(() => router.push(slides[index].href, { scroll: false }), OUT_MS)
    return true
}
