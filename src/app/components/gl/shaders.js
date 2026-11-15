export const vertexShader = /* glsl */ `
varying vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
}
`

// Slide transition: the outgoing image is dragged sideways and stretched in a
// diagonal sweep (pixels on the leading edge start first and accelerate), the
// incoming image is pulled in behind it, UVs mirror at the borders so the
// stretch smears into reflections, and a travelling sine wave bends both.
export const fragmentShader = /* glsl */ `
precision highp float;

uniform sampler2D uTex1;
uniform sampler2D uTex2;
uniform vec2 uRes1;
uniform vec2 uRes2;
uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uTime;
uniform float uProgress;   // 0 -> 1
uniform float uDir;        // 1 next, -1 previous
uniform float uMask;       // 0 closed (black) -> 1 fully open letterbox
uniform float uDim;        // overall brightness

varying vec2 vUv;

#define TAU 6.28318530718

// Reflect UVs outside 0..1 back into range (stretch smears into mirrored copies).
vec2 mirrorUv(vec2 v) {
    vec2 m = mod(v, 2.0);
    return mix(m, 2.0 - m, step(1.0, m));
}

// 0 -> 1 -> 0 triangle.
float peak(float v) { return 1.0 - abs(v * 2.0 - 1.0); }

vec2 coverUv(vec2 uv, vec2 imgRes) {
    float screenRatio = uResolution.x / uResolution.y;
    float imageRatio = imgRes.x / imgRes.y;
    vec2 scale = screenRatio > imageRatio
        ? vec2(1.0, imageRatio / screenRatio)
        : vec2(screenRatio / imageRatio, 1.0);
    return (uv - 0.5) * scale + 0.5;
}

float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }

vec3 sampleSlide(sampler2D tex, vec2 res, vec2 uv, float blur) {
    vec2 base = coverUv(uv, res);
    // Horizontal smear: a few taps along x, wider while the pixel is moving fast.
    vec3 c = texture2D(tex, mirrorUv(base)).rgb * 0.4;
    c += texture2D(tex, mirrorUv(base + vec2(blur, 0.0))).rgb * 0.2;
    c += texture2D(tex, mirrorUv(base - vec2(blur, 0.0))).rgb * 0.2;
    c += texture2D(tex, mirrorUv(base + vec2(blur * 2.0, 0.0))).rgb * 0.1;
    c += texture2D(tex, mirrorUv(base - vec2(blur * 2.0, 0.0))).rgb * 0.1;
    return c;
}

void main() {
    vec2 uv = vUv;
    float p = uProgress;

    // Subtle parallax + breathing so a resting slide still feels alive.
    vec2 rest = (uv - 0.5) * (0.965 + sin(uTime * 0.25) * 0.005) + 0.5;
    rest += (uMouse - 0.5) * vec2(-0.012, -0.008);

    // Leading edge: the side the new image arrives from.
    float lead = uDir > 0.0 ? uv.x : 1.0 - uv.x;

    // Diagonal sweep with a wobbling front.
    float spreadX = 1.1;
    float spreadY = 0.55 + sin(uTime * 1.7 + uv.x * TAU) * 0.12;
    float d = p * (1.0 + spreadX + spreadY) - (1.0 - lead) * spreadX - uv.y * spreadY;
    d = clamp(d, 0.0, 1.0);

    // Travel: global progress plus the accelerated local sweep.
    float accel = 1.6;
    float travel = p + d * accel;
    float shift1 = travel * 0.55;
    float shift2 = (travel - 1.0 - accel) * 0.55;

    // Wave that only exists mid-transition.
    vec2 wave = sin(uTime * vec2(2.1, 1.3) + uv.yx * vec2(9.0, 5.5)) * vec2(0.035, 0.02);
    vec2 bend = (peak(p) * 0.45 + peak(d) * 0.55) * wave;

    float blur = peak(d) * 0.018 + peak(p) * 0.006;

    vec3 c1 = sampleSlide(uTex1, uRes1, rest + vec2(uDir * shift1, 0.0) + bend, blur);
    vec3 c2 = sampleSlide(uTex2, uRes2, rest + vec2(uDir * shift2, 0.0) + bend, blur);

    // Mostly a soft cross-fade along the sweep, with a hint of a hard seam.
    float seam = step(1.0 - lead, d);
    vec3 color = mix(c1, c2, mix(d, seam, 0.25));

    // Flash of light riding the sweep.
    color += peak(d) * 0.08;

    // Vignette + dim so overlaid text reads.
    float aspect = uResolution.x / uResolution.y;
    float vig = smoothstep(1.2, 0.3, length((vUv - 0.5) * vec2(aspect, 1.0) * 0.9));
    color *= mix(0.55, 1.0, vig) * uDim;
    // Shade the left side, where project text sits, so it reads on bright images.
    color *= mix(0.72, 1.0, smoothstep(0.05, 0.6, vUv.x));

    // Film grain.
    color += (hash(vUv * uResolution + fract(uTime) * 91.0) - 0.5) * 0.04;

    // Letterbox: only a horizontal band of height uMask is visible.
    float band = step(abs(vUv.y * 2.0 - 1.0), uMask);
    color *= band;

    gl_FragColor = vec4(color, 1.0);
}
`

// ---------------------------------------------------------------------------
// Index thumbnails: one subdivided plane per project, drawn with a perspective
// camera in pixel units. Each corner blends independently between the grid
// slot and the full screen, so a thumbnail "unfolds" into the slide (and folds
// back), while a depth wave rolls through it.
// ---------------------------------------------------------------------------
export const itemVertexShader = /* glsl */ `
uniform vec4 uRect;      // slot centre (x, y) and size (w, h), world px
uniform vec2 uScreen;    // viewport size, px
uniform vec4 uCorners;   // per-corner progress: top-left, top-right, bottom-left, bottom-right
uniform float uSway;     // depth wave strength
uniform vec3 uHover;     // pointer uv inside the plane (xy) + strength (z)
uniform float uTime;

varying vec2 vUv;
varying float vBlend;

void main() {
    vUv = uv;

    float top = mix(uCorners.x, uCorners.y, uv.x);
    float bottom = mix(uCorners.z, uCorners.w, uv.x);
    float blend = mix(bottom, top, uv.y);

    vec3 slot = vec3(uRect.xy + position.xy * uRect.zw, 0.0);
    vec3 full = vec3(position.xy * uScreen, 0.0);
    vec3 pos = mix(slot, full, blend);

    // Rolling depth wave, measured from the screen centre.
    float dist = length(pos.xy);
    float wave = sin(uTime * 1.1 + dist * 0.0045) * 170.0
               + sin(uTime * 2.2 + dist * 0.028) * 70.0;
    pos.z += wave * uSway;

    // Pointer ripple while hovering a thumbnail.
    float r = length((uv - uHover.xy) * uRect.zw);
    float ripple = sin(uTime * 3.2 - r * 0.055) * 22.0 * max(0.0, 1.0 - r / 300.0);
    pos.z += ripple * uHover.z * (1.0 - blend);

    vBlend = blend;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`

export const itemFragmentShader = /* glsl */ `
precision highp float;

uniform sampler2D uTex;
uniform vec2 uTexRes;
uniform vec4 uRect;
uniform vec2 uScreen;
uniform vec2 uHoverShift;
uniform float uBright;
uniform float uOpacity;

varying vec2 vUv;
varying float vBlend;

void main() {
    // Cover-fit against the plane's current size (thumbnail -> screen).
    vec2 size = mix(uRect.zw, uScreen, vBlend);
    float planeRatio = size.x / size.y;
    float imageRatio = uTexRes.x / uTexRes.y;
    vec2 scale = planeRatio > imageRatio
        ? vec2(1.0, imageRatio / planeRatio)
        : vec2(planeRatio / imageRatio, 1.0);

    // Thumbnails are slightly zoomed so the image can pan under the pointer;
    // at full screen it matches the slide's resting zoom.
    float zoom = mix(0.88, 0.965, vBlend);
    vec2 uv = (vUv - 0.5) * scale * zoom + 0.5 + uHoverShift * (1.0 - vBlend);
    vec3 color = texture2D(uTex, uv).rgb;

    // Thumbnail grade -> slide grade (vignette, dim, left shade) as it fills the screen.
    float aspect = uScreen.x / uScreen.y;
    float vig = smoothstep(1.2, 0.3, length((vUv - 0.5) * vec2(aspect, 1.0) * 0.9));
    float slideGrade = mix(0.55, 1.0, vig) * 0.72 * mix(0.72, 1.0, smoothstep(0.05, 0.6, vUv.x));
    color *= mix(uBright, slideGrade, vBlend);

    gl_FragColor = vec4(color, uOpacity);
}
`
