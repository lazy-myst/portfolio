// Page transitions: a cover slides in, the route changes, the cover slides out
// (PageCover handles the "out" when the new pathname renders).

let cover = null
let pending = false

export function registerCover(api) {
    cover = api
    return () => { if (cover === api) cover = null }
}

export function isTransitioning() {
    return pending
}

export function endTransition() {
    pending = false
}

export async function navigate(router, href, { label = "", useCover = true, beforePush } = {}) {
    if (pending) return
    if (typeof window !== "undefined" && window.location.pathname === href) return
    pending = true
    try {
        if (beforePush) await beforePush()
        if (useCover && cover) await cover.in(label)
        else if (!useCover) cover?.markSkip()
    } finally {
        router.push(href)
    }
}
