// Tiny shared store between React pages and the persistent WebGL stage.
// Pages write intent (which project, which mode); GLStage reads it every frame.

const listeners = new Set()

export const glState = {
    index: 0,          // project shown on the stage
    direction: 1,      // 1 = next (wipe from bottom), -1 = previous
    duration: 1.6,     // seconds for the next image transition
    mode: "focus",     // focus | list | detail | hidden
    hover: 0,          // 0..1 cursor lens strength
    velocity: 0,       // drag / wheel energy, decays in GLStage
    detailScroll: 0,   // 0..1 how far the detail hero is scrolled
    progress: 0,       // texture loading progress 0..1
    loaded: false,     // all textures ready
    ready: false,      // loader finished, intro can play
    busy: false,       // an image transition is running
}

export function setGL(patch) {
    Object.assign(glState, patch)
    listeners.forEach((fn) => fn(glState))
}

export function subscribeGL(fn) {
    listeners.add(fn)
    return () => listeners.delete(fn)
}

// Show project `index`, choosing the wipe direction from where we are now.
export function showProject(index, duration = 1.6) {
    if (index === glState.index) return
    setGL({ index, duration, direction: index > glState.index ? 1 : -1 })
}

// One-off commands (e.g. the zoom played before opening a project).
const commandListeners = new Set()
export function sendGL(command) {
    commandListeners.forEach((fn) => fn(command))
}
export function onGLCommand(fn) {
    commandListeners.add(fn)
    return () => commandListeners.delete(fn)
}
