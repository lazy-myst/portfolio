// Tiny shared store between React pages and the persistent WebGL stage.
// Pages write intent (which slide, open or closed); GLStage reads it every frame.

const listeners = new Set()

export const glState = {
    index: 0,          // slide on the stage (0 = home, 1..n = projects)
    direction: 1,      // 1 = next (streaks left), -1 = previous (streaks right)
    open: false,       // letterbox open (slide visible) or closed (black)
    progress: 0,       // texture loading progress 0..1
    loaded: false,     // all textures ready
    ready: false,      // loader finished, intro can play
    busy: false,       // a slide transition is running
}

export function setGL(patch) {
    Object.assign(glState, patch)
    listeners.forEach((fn) => fn(glState))
}

export function subscribeGL(fn) {
    listeners.add(fn)
    return () => listeners.delete(fn)
}

// Imperative API registered by GLStage (index thumbnails, fold / unfold).
let api = null
export function registerGLApi(a) {
    api = a
    return () => { if (api === a) api = null }
}
export const glApi = () => api
