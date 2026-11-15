'use client'

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import gsap from "gsap"
import { projects } from "../../data/projects"
import { glState, setGL, subscribeGL, onGLCommand } from "../../lib/glStore"
import { vertexShader, fragmentShader } from "./shaders"

// Per-mode targets the stage eases toward every frame.
const MODES = {
    focus: { opacity: 1, blackout: 0 },
    list: { opacity: 1, blackout: 0.6 },
    detail: { opacity: 1, blackout: 0.1 },
    hidden: { opacity: 0, blackout: 0.5 },
}

const lerp = (a, b, t) => a + (b - a) * t

export default function GLStage() {
    const mountRef = useRef(null)
    const [fallback, setFallback] = useState(false)
    const [fallbackIndex, setFallbackIndex] = useState(0)

    useEffect(() => {
        const mount = mountRef.current
        let renderer
        try {
            renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false, powerPreference: "high-performance" })
        } catch (e) {
            setFallback(true)
            setGL({ progress: 1, loaded: true })
            return subscribeGL((s) => setFallbackIndex(s.index))
        }

        const dpr = Math.min(window.devicePixelRatio, 1.75)
        renderer.setPixelRatio(dpr)
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.setClearColor(0x111111, 1)
        mount.appendChild(renderer.domElement)

        const scene = new THREE.Scene()
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

        const blank = new THREE.DataTexture(new Uint8Array([17, 17, 17, 255]), 1, 1)
        blank.needsUpdate = true

        const uniforms = {
            uTex1: { value: blank },
            uTex2: { value: blank },
            uRes1: { value: new THREE.Vector2(1, 1) },
            uRes2: { value: new THREE.Vector2(1, 1) },
            uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
            uMouse: { value: new THREE.Vector2(0.5, 0.5) },
            uBg: { value: new THREE.Color(0x111111) },
            uTime: { value: 0 },
            uProgress: { value: 0 },
            uDir: { value: 1 },
            uHover: { value: 0 },
            uVelocity: { value: 0 },
            uZoom: { value: 1 },
            uBlackout: { value: 1 },
            uOpacity: { value: 0 },
        }

        const material = new THREE.ShaderMaterial({ uniforms, vertexShader, fragmentShader })
        const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material)
        scene.add(mesh)

        // ---- Textures -------------------------------------------------------
        const textures = []
        const manager = new THREE.LoadingManager()
        manager.onProgress = (_url, loaded, total) => setGL({ progress: loaded / total })
        manager.onLoad = () => setGL({ progress: 1, loaded: true })
        const loader = new THREE.TextureLoader(manager)

        projects.forEach((p, i) => {
            loader.load(p.cover, (tex) => {
                tex.minFilter = THREE.LinearFilter
                tex.generateMipmaps = false
                textures[i] = tex
                if (i === glState.index && uniforms.uTex1.value === blank) setCurrent(i)
            })
        })

        let currentIndex = glState.index
        let pendingIndex = null
        let transitioning = false

        function setCurrent(i) {
            const tex = textures[i]
            if (!tex) return
            uniforms.uTex1.value = tex
            uniforms.uRes1.value.set(tex.image.width, tex.image.height)
        }

        function transitionTo(i, dir, duration) {
            const tex = textures[i]
            if (!tex) { currentIndex = i; return }
            transitioning = true
            setGL({ busy: true })
            uniforms.uTex2.value = tex
            uniforms.uRes2.value.set(tex.image.width, tex.image.height)
            uniforms.uDir.value = dir
            uniforms.uProgress.value = 0
            gsap.to(uniforms.uProgress, {
                value: 1,
                duration,
                ease: "power2.inOut",
                onComplete: () => {
                    setCurrent(i)
                    uniforms.uProgress.value = 0
                    currentIndex = i
                    transitioning = false
                    if (pendingIndex !== null && pendingIndex !== currentIndex) {
                        const next = pendingIndex
                        pendingIndex = null
                        transitionTo(next, next > currentIndex ? 1 : -1, Math.min(glState.duration, 1.1))
                    } else {
                        pendingIndex = null
                        setGL({ busy: false })
                    }
                },
            })
        }

        const unsubscribe = subscribeGL((s) => {
            if (s.index === currentIndex && !transitioning) return
            if (transitioning) {
                pendingIndex = s.index
                return
            }
            transitionTo(s.index, s.direction, s.duration)
        })

        // One-off commands: zoom into the image before opening a project.
        const offCommand = onGLCommand((cmd) => {
            if (cmd === "open") {
                gsap.to(uniforms.uZoom, { value: 0.82, duration: 0.9, ease: "power3.inOut" })
            }
            if (cmd === "reset-zoom") {
                gsap.to(uniforms.uZoom, { value: 1, duration: 1.2, ease: "power3.out" })
            }
        })

        // ---- Input ----------------------------------------------------------
        const mouse = new THREE.Vector2(0.5, 0.5)
        const onMove = (e) => {
            mouse.set(e.clientX / window.innerWidth, 1 - e.clientY / window.innerHeight)
        }
        const onResize = () => {
            renderer.setSize(window.innerWidth, window.innerHeight)
            uniforms.uResolution.value.set(window.innerWidth, window.innerHeight)
        }
        window.addEventListener("pointermove", onMove)
        window.addEventListener("resize", onResize)

        // ---- Loop -----------------------------------------------------------
        const start = performance.now()
        let raf
        const tick = () => {
            raf = requestAnimationFrame(tick)
            const t = (performance.now() - start) / 1000
            uniforms.uTime.value = t

            const target = MODES[glState.mode] || MODES.focus
            const visible = glState.ready ? target.opacity : 0
            const blackout = glState.mode === "detail"
                ? target.blackout + glState.detailScroll * 0.9
                : target.blackout

            uniforms.uOpacity.value = lerp(uniforms.uOpacity.value, visible, 0.05)
            uniforms.uBlackout.value = lerp(uniforms.uBlackout.value, blackout, 0.06)
            uniforms.uHover.value = lerp(uniforms.uHover.value, glState.hover, 0.06)
            uniforms.uMouse.value.lerp(mouse, 0.08)

            glState.velocity *= 0.92
            uniforms.uVelocity.value = lerp(uniforms.uVelocity.value, glState.velocity, 0.1)

            renderer.render(scene, camera)
        }
        tick()

        return () => {
            cancelAnimationFrame(raf)
            unsubscribe()
            offCommand()
            window.removeEventListener("pointermove", onMove)
            window.removeEventListener("resize", onResize)
            gsap.killTweensOf(uniforms.uProgress)
            gsap.killTweensOf(uniforms.uZoom)
            textures.forEach((t) => t && t.dispose())
            blank.dispose()
            material.dispose()
            mesh.geometry.dispose()
            renderer.dispose()
            if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement)
        }
    }, [])

    return (
        <div ref={mountRef} className="gl-stage" aria-hidden="true">
            {fallback && (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={fallbackIndex} src={projects[fallbackIndex].cover} alt="" className="gl-fallback" />
            )}
        </div>
    )
}
