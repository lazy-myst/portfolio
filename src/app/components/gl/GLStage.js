'use client'

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import gsap from "gsap"
import { slides, projects } from "../../data/projects"
import { glState, setGL, subscribeGL, registerGLApi } from "../../lib/glStore"
import { vertexShader, fragmentShader, itemVertexShader, itemFragmentShader } from "./shaders"

const SLIDE_DURATION = 1.8
const FOV = 45
// Corner start offsets; each corner gets one, in a random order per transition.
const CORNER_DELAYS = [0, 0.1, 0.2, 0.3]
const CORNER_SPAN = 0.7

const smooth = (t) => t * t * (3 - 2 * t)
const ramp = (start, span, t) => smooth(Math.min(1, Math.max(0, (t - start) / span)))
const shuffle = (arr) => {
    const a = [...arr]
    for (let i = a.length - 1; i > 0; i--) {
        const j = (Math.random() * (i + 1)) | 0
        ;[a[i], a[j]] = [a[j], a[i]]
    }
    return a
}
const lerp = (a, b, t) => a + (b - a) * t

export default function GLStage() {
    const mountRef = useRef(null)
    const [fallback, setFallback] = useState(null)

    useEffect(() => {
        const mount = mountRef.current
        let renderer
        try {
            renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: "high-performance" })
        } catch (e) {
            setGL({ progress: 1, loaded: true })
            const sync = (s) => setFallback({ index: s.index, open: s.open })
            sync(glState)
            return subscribeGL(sync)
        }
        document.documentElement.classList.add("has-gl")
        // Dev only: lets you slow every animation from the console, e.g. __gsap.globalTimeline.timeScale(0.2)
        if (process.env.NODE_ENV !== "production") window.__gsap = gsap

        let W = window.innerWidth
        let H = window.innerHeight
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75))
        renderer.setSize(W, H)
        renderer.setClearColor(0x000000, 1)
        mount.appendChild(renderer.domElement)

        const scene = new THREE.Scene()
        // Perspective camera in pixel units: at z = 0, one unit is one CSS pixel.
        const camera = new THREE.PerspectiveCamera(FOV, W / H, 1, 10000)
        const placeCamera = () => {
            camera.aspect = W / H
            camera.position.z = (H / 2) / Math.tan(THREE.MathUtils.degToRad(FOV / 2))
            camera.updateProjectionMatrix()
        }
        placeCamera()

        const blank = new THREE.DataTexture(new Uint8Array([0, 0, 0, 255]), 1, 1)
        blank.needsUpdate = true

        // ---- Fullscreen slide quad (clip space) -------------------------------
        const uniforms = {
            uTex1: { value: blank },
            uTex2: { value: blank },
            uRes1: { value: new THREE.Vector2(1, 1) },
            uRes2: { value: new THREE.Vector2(1, 1) },
            uResolution: { value: new THREE.Vector2(W, H) },
            uMouse: { value: new THREE.Vector2(0.5, 0.5) },
            uTime: { value: 0 },
            uProgress: { value: 0 },
            uDir: { value: 1 },
            uMask: { value: 0 },
            uDim: { value: 0.72 },
        }
        const material = new THREE.ShaderMaterial({ uniforms, vertexShader, fragmentShader, depthTest: false, depthWrite: false })
        const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material)
        mesh.frustumCulled = false
        mesh.renderOrder = 0
        scene.add(mesh)

        // ---- Index thumbnails ---------------------------------------------------
        const itemGeometry = new THREE.PlaneGeometry(1, 1, 48, 48)
        const items = projects.map((p, i) => {
            const u = {
                uTex: { value: blank },
                uTexRes: { value: new THREE.Vector2(1, 1) },
                uRect: { value: new THREE.Vector4(0, 0, 1, 1) },
                uScreen: { value: new THREE.Vector2(W, H) },
                uCorners: { value: new THREE.Vector4(0, 0, 0, 0) },
                uSway: { value: 0 },
                uHover: { value: new THREE.Vector3(0.5, 0.5, 0) },
                uHoverShift: { value: new THREE.Vector2(0, 0) },
                uBright: { value: 0.8 },
                uOpacity: { value: 0 },
                uTime: uniforms.uTime,
            }
            const m = new THREE.Mesh(itemGeometry, new THREE.ShaderMaterial({
                uniforms: u,
                vertexShader: itemVertexShader,
                fragmentShader: itemFragmentShader,
                transparent: true,
                depthTest: false,
                depthWrite: false,
            }))
            m.frustumCulled = false
            m.visible = false
            m.renderOrder = 1
            m.userData = { index: i, hover: 0, hoverTarget: 0, frozen: false, sway: 0, local: [0.5, 0.5] }
            scene.add(m)
            return m
        })

        // ---- Textures (image or video per slide) ------------------------------
        const textures = []
        const videos = []
        let loadedCount = 0
        const markLoaded = () => {
            loadedCount++
            setGL({ progress: loadedCount / slides.length, loaded: loadedCount === slides.length })
        }
        const sizeOf = (tex) => {
            const img = tex.image
            return [img.videoWidth || img.width || 1, img.videoHeight || img.height || 1]
        }
        const onTexture = (i, tex) => {
            textures[i] = tex
            if (i === glState.index && uniforms.uTex1.value === blank) setCurrent(i)
            const item = items[i - 1]
            if (item) {
                item.material.uniforms.uTex.value = tex
                item.material.uniforms.uTexRes.value.set(...sizeOf(tex))
            }
            markLoaded()
        }

        const imageLoader = new THREE.TextureLoader()
        slides.forEach((slide, i) => {
            if (slide.video) {
                const video = document.createElement("video")
                Object.assign(video, { src: slide.video, muted: true, loop: true, playsInline: true, crossOrigin: "anonymous", preload: "auto" })
                video.addEventListener("loadeddata", () => {
                    const tex = new THREE.VideoTexture(video)
                    tex.minFilter = THREE.LinearFilter
                    videos[i] = video
                    onTexture(i, tex)
                    video.play().catch(() => {})
                }, { once: true })
                video.addEventListener("error", markLoaded, { once: true })
                video.load()
                return
            }
            imageLoader.load(slide.image, (tex) => {
                tex.minFilter = THREE.LinearFilter
                tex.generateMipmaps = false
                onTexture(i, tex)
            }, undefined, markLoaded)
        })

        // ---- Slide transitions ------------------------------------------------
        let currentIndex = glState.index
        let pendingIndex = null
        let transitioning = false

        function setCurrent(i) {
            const tex = textures[i]
            if (!tex) return
            uniforms.uTex1.value = tex
            uniforms.uRes1.value.set(...sizeOf(tex))
        }

        function transitionTo(i, dir) {
            const tex = textures[i]
            if (!tex || uniforms.uMask.value < 0.02) {
                currentIndex = i
                setCurrent(i)
                return
            }
            transitioning = true
            setGL({ busy: true })
            uniforms.uTex2.value = tex
            uniforms.uRes2.value.set(...sizeOf(tex))
            uniforms.uDir.value = dir
            uniforms.uProgress.value = 0
            gsap.to(uniforms.uProgress, {
                value: 1,
                duration: SLIDE_DURATION,
                ease: "power2.inOut",
                onComplete: () => {
                    currentIndex = i
                    setCurrent(i)
                    uniforms.uProgress.value = 0
                    transitioning = false
                    if (pendingIndex !== null && pendingIndex !== currentIndex) {
                        const next = pendingIndex
                        pendingIndex = null
                        transitionTo(next, glState.direction)
                    } else {
                        pendingIndex = null
                        setGL({ busy: false })
                    }
                },
            })
        }

        // Letterbox open / close.
        let maskOpen = false
        const applyMask = (s) => {
            const shouldOpen = s.ready && s.open
            if (shouldOpen === maskOpen) return
            maskOpen = shouldOpen
            gsap.to(uniforms.uMask, shouldOpen
                ? { value: 1, duration: 1.6, ease: "expo.inOut", delay: 0.1, overwrite: true }
                : { value: 0, duration: 0.8, ease: "expo.inOut", overwrite: true })
        }
        const setMaskInstant = (open) => {
            gsap.killTweensOf(uniforms.uMask)
            uniforms.uMask.value = open ? 1 : 0
            maskOpen = open
        }

        const unsubscribe = subscribeGL((s) => {
            applyMask(s)
            if (s.index === currentIndex && !transitioning) return
            if (transitioning) {
                pendingIndex = s.index
                return
            }
            transitionTo(s.index, s.direction)
        })
        applyMask(glState)

        // ---- Index: fold / unfold ---------------------------------------------
        let listEls = null
        let scrollSway = 0
        let foldTween = null
        let folding = 0      // slide index currently folding into the index (0 = none)
        let lastFold = null

        const setCorners = (item, e, order) => {
            const c = item.material.uniforms.uCorners.value
            c.set(
                ramp(CORNER_DELAYS[order[0]], CORNER_SPAN, e),
                ramp(CORNER_DELAYS[order[1]], CORNER_SPAN, e),
                ramp(CORNER_DELAYS[order[2]], CORNER_SPAN, e),
                ramp(CORNER_DELAYS[order[3]], CORNER_SPAN, e),
            )
            // Depth wave peaks mid-flight.
            const t = ramp(0, 0.9, e)
            item.userData.sway = t < 0.5 ? t * 2 : (1 - t) * 2
        }

        const updateRect = (item) => {
            const el = listEls?.[item.userData.index]
            if (!el || item.userData.frozen) return
            const r = el.getBoundingClientRect()
            item.material.uniforms.uRect.value.set(r.left + r.width / 2 - W / 2, -(r.top + r.height / 2 - H / 2), r.width, r.height)
            item.userData.domRect = r
        }

        const whenReady = (fn) => {
            if (glState.ready) return fn()
            const off = subscribeGL((s) => { if (s.ready) { off(); fn() } })
        }

        const api = {
            // IndexList mounts / unmounts its thumbnail slots.
            setList(els) {
                listEls = els
                if (!els) {
                    // Remember an interrupted fold so an immediate remount (React StrictMode) can resume it.
                    if (folding) lastFold = { from: folding, time: performance.now() }
                    folding = 0
                    foldTween?.kill()
                    items.forEach((m) => {
                        m.visible = false
                        m.userData.frozen = false
                        m.material.uniforms.uOpacity.value = 0
                        m.material.uniforms.uCorners.value.set(0, 0, 0, 0)
                        m.userData.sway = 0
                    })
                    return
                }
                items.forEach((m) => { m.visible = true; updateRect(m) })
            },

            // Show the index. If a project slide is on screen, fold it into its slot.
            revealList(fromSlide) {
                const from = items[fromSlide - 1]
                const resumed = lastFold && lastFold.from === fromSlide && performance.now() - lastFold.time < 400
                lastFold = null
                const fold = !!from && (uniforms.uMask.value > 0.5 || resumed)
                folding = fold ? fromSlide : 0
                items.forEach((m) => {
                    m.material.uniforms.uOpacity.value = 0
                    m.material.uniforms.uCorners.value.set(0, 0, 0, 0)
                    m.renderOrder = 1
                })
                const others = items.filter((m) => !(fold && m === from)).map((m) => m.material.uniforms.uOpacity)

                if (fold) {
                    setMaskInstant(false)
                    from.renderOrder = 10
                    from.material.uniforms.uOpacity.value = 1
                    const order = shuffle([0, 1, 2, 3])
                    const state = { e: 1 }
                    setCorners(from, 1, order)
                    foldTween?.kill()
                    foldTween = gsap.to(state, {
                        e: 0, duration: 1.6, ease: "power3.inOut",
                        onUpdate: () => setCorners(from, state.e, order),
                        onComplete: () => { from.renderOrder = 1; folding = 0 },
                    })
                    gsap.to(others, { value: 1, duration: 1, ease: "power2.out", stagger: 0.06, delay: 0.7 })
                    return 0.7
                }
                whenReady(() => {
                    gsap.to(others, { value: 1, duration: 1.1, ease: "power2.out", stagger: 0.07, delay: 0.5 })
                })
                return 0.5
            },

            // Unfold thumbnail `i` to full screen, then hand over to the slide quad.
            openItem(i) {
                return new Promise((resolve) => {
                    const item = items[i]
                    if (!item || !listEls) { resolve(); return }
                    updateRect(item)
                    item.userData.frozen = true
                    item.userData.hoverTarget = 0
                    item.renderOrder = 10
                    const order = shuffle([0, 1, 2, 3])
                    const state = { p1: 0, p2: 0 }
                    const others = items.filter((m) => m !== item).map((m) => m.material.uniforms.uOpacity)
                    gsap.to(others, { value: 0, duration: 0.6, ease: "power2.in" })
                    foldTween?.kill()
                    const update = () => setCorners(item, state.p1 + state.p2, order)
                    foldTween = gsap.timeline({ onUpdate: update, onComplete: () => {
                        // Handover: the slide quad shows the same image at full screen.
                        const slideIndex = i + 1
                        Object.assign(glState, { index: slideIndex, direction: 1 })
                        currentIndex = slideIndex
                        setCurrent(slideIndex)
                        setMaskInstant(true)
                        setGL({ open: true })
                        item.visible = false
                        resolve()
                    } })
                        .to(state, { p1: 0.5, duration: 1.2, ease: "power3.inOut" }, 0)
                        .to(state, { p2: 0.5, duration: 1.5, ease: "power2.inOut" }, 0)
                })
            },

            hover(i, on) {
                const item = items[i]
                if (item) item.userData.hoverTarget = on ? 1 : 0
            },

            setScrollVelocity(v) {
                scrollSway = Math.min(0.3, Math.abs(v) * 0.012)
            },
        }
        const unregister = registerGLApi(api)

        // ---- Input ----------------------------------------------------------
        const mouse = new THREE.Vector2(0.5, 0.5)
        const mousePx = { x: W / 2, y: H / 2 }
        const onMove = (e) => {
            mouse.set(e.clientX / W, 1 - e.clientY / H)
            mousePx.x = e.clientX
            mousePx.y = e.clientY
        }
        const onResize = () => {
            W = window.innerWidth
            H = window.innerHeight
            renderer.setSize(W, H)
            placeCamera()
            uniforms.uResolution.value.set(W, H)
            items.forEach((m) => m.material.uniforms.uScreen.value.set(W, H))
        }
        window.addEventListener("pointermove", onMove)
        window.addEventListener("resize", onResize)

        // ---- Loop -----------------------------------------------------------
        const start = performance.now()
        let raf
        let smoothScrollSway = 0
        const tick = () => {
            raf = requestAnimationFrame(tick)
            uniforms.uTime.value = (performance.now() - start) / 1000
            uniforms.uMouse.value.lerp(mouse, 0.05)

            if (listEls) {
                smoothScrollSway = lerp(smoothScrollSway, scrollSway, 0.08)
                scrollSway *= 0.9
                items.forEach((m) => {
                    updateRect(m)
                    const u = m.material.uniforms
                    const d = m.userData
                    d.hover = lerp(d.hover, d.hoverTarget, 0.08)
                    const r = d.domRect
                    if (r && !d.frozen) {
                        const lx = (mousePx.x - r.left) / r.width
                        const ly = 1 - (mousePx.y - r.top) / r.height
                        d.local[0] = lerp(d.local[0], lx, 0.12)
                        d.local[1] = lerp(d.local[1], ly, 0.12)
                    }
                    u.uHover.value.set(d.local[0], d.local[1], d.hover)
                    u.uHoverShift.value.set((0.5 - d.local[0]) * 0.05 * d.hover, (0.5 - d.local[1]) * 0.05 * d.hover)
                    u.uBright.value = lerp(0.78, 1.0, d.hover)
                    u.uSway.value = Math.max(d.sway, smoothScrollSway)
                })
            }

            renderer.render(scene, camera)
        }
        tick()

        return () => {
            cancelAnimationFrame(raf)
            unsubscribe()
            unregister()
            foldTween?.kill()
            document.documentElement.classList.remove("has-gl")
            window.removeEventListener("pointermove", onMove)
            window.removeEventListener("resize", onResize)
            gsap.killTweensOf(uniforms.uProgress)
            gsap.killTweensOf(uniforms.uMask)
            videos.forEach((v) => { if (v) { v.pause(); v.removeAttribute("src"); v.load() } })
            textures.forEach((t) => t && t.dispose())
            items.forEach((m) => m.material.dispose())
            itemGeometry.dispose()
            blank.dispose()
            material.dispose()
            mesh.geometry.dispose()
            renderer.dispose()
            if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement)
        }
    }, [])

    return (
        <div ref={mountRef} className="gl-stage" aria-hidden="true">
            {fallback && fallback.open && (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={fallback.index} src={slides[fallback.index].image} alt="" className="gl-fallback" />
            )}
        </div>
    )
}
