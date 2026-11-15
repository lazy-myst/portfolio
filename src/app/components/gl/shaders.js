export const vertexShader = /* glsl */ `
varying vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
}
`

export const fragmentShader = /* glsl */ `
precision highp float;

uniform sampler2D uTex1;      // current image
uniform sampler2D uTex2;      // next image
uniform vec2 uRes1;           // image sizes for cover-fit
uniform vec2 uRes2;
uniform vec2 uResolution;     // viewport size
uniform vec2 uMouse;          // 0..1, smoothed
uniform vec3 uBg;
uniform float uTime;
uniform float uProgress;      // 0 -> 1 transition
uniform float uDir;           // 1 next, -1 previous
uniform float uHover;         // cursor lens
uniform float uVelocity;      // drag / wheel energy
uniform float uZoom;          // 1 = normal, < 1 = zoomed in
uniform float uBlackout;      // 0..1 darken
uniform float uOpacity;       // 0..1 fade to background

varying vec2 vUv;

// --- Simplex 3D noise (Ashima Arts / Stefan Gustavson, MIT) ---
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
float snoise(vec3 v) {
    const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
        i.z + vec4(0.0, i1.z, i2.z, 1.0))
        + i.y + vec4(0.0, i1.y, i2.y, 1.0))
        + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}

float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }

// Fit an image like CSS background-size: cover.
vec2 coverUv(vec2 uv, vec2 imgRes) {
    float screenRatio = uResolution.x / uResolution.y;
    float imageRatio = imgRes.x / imgRes.y;
    vec2 scale = screenRatio > imageRatio
        ? vec2(1.0, imageRatio / screenRatio)
        : vec2(screenRatio / imageRatio, 1.0);
    return (uv - 0.5) * scale + 0.5;
}

vec2 scaleUv(vec2 uv, float s) { return (uv - 0.5) * s + 0.5; }

void main() {
    vec2 uv = vUv;
    float aspect = uResolution.x / uResolution.y;
    float p = uProgress;
    float wave = sin(p * 3.14159265);          // 0 -> 1 -> 0 across the transition

    // Cursor lens: gently magnify the area around the pointer.
    vec2 toMouse = (uv - uMouse) * vec2(aspect, 1.0);
    float lens = smoothstep(0.45, 0.0, length(toMouse)) * uHover;
    uv -= (uv - uMouse) * lens * 0.06;

    // Idle liquid drift + drag ripples.
    float idle = snoise(vec3(uv * 1.6, uTime * 0.12));
    uv += vec2(idle) * 0.004;
    uv.x += sin(uv.y * 9.0 + uTime * 2.0) * 0.012 * uVelocity;

    // Noise field that shapes the wipe edge.
    float edgeNoise = snoise(vec3(uv * vec2(2.2, 3.0), uTime * 0.25)) * 0.5 + 0.5;
    float axis = uDir > 0.0 ? uv.y : 1.0 - uv.y;
    float field = axis * 0.72 + edgeNoise * 0.28;
    float front = mix(-0.2, 1.2, p);
    float mask = 1.0 - smoothstep(front - 0.1, front + 0.1, field);   // 1 where next image shows
    float edge = mask * (1.0 - mask) * 4.0;                              // peaks on the wipe edge

    // Turbulence that tears the image while it changes.
    vec2 turb = vec2(
        snoise(vec3(uv * 3.5, uTime * 0.6)),
        snoise(vec3(uv * 3.5 + 7.3, uTime * 0.6))
    ) * 0.05 * wave;

    float hoverScale = 1.0 - uHover * 0.035;

    // Current image: pushed away and zoomed while leaving.
    vec2 uv1 = scaleUv(uv, hoverScale * uZoom * (1.0 - p * 0.12));
    uv1.y -= uDir * p * 0.12;
    uv1 += turb + edge * 0.04 * vec2(0.0, -uDir);
    uv1 = coverUv(uv1, uRes1);

    // Next image: arrives zoomed and settles.
    vec2 uv2 = scaleUv(uv, hoverScale * uZoom * (1.0 - (1.0 - p) * 0.18));
    uv2.y += uDir * (1.0 - p) * 0.12;
    uv2 += turb * (1.0 - p) + edge * 0.06 * vec2(0.0, uDir);
    uv2 = coverUv(uv2, uRes2);

    vec4 c1 = texture2D(uTex1, uv1);

    // Chromatic split on the next image along the edge.
    float split = edge * 0.012 + wave * 0.004;
    vec4 c2;
    c2.r = texture2D(uTex2, uv2 + vec2(split, 0.0)).r;
    c2.g = texture2D(uTex2, uv2).g;
    c2.b = texture2D(uTex2, uv2 - vec2(split, 0.0)).b;
    c2.a = 1.0;

    vec3 color = mix(c1.rgb, c2.rgb, mask);

    // Bright seam on the wipe edge.
    color += edge * 0.10 * wave;

    // Dim the whole frame a touch mid-transition.
    color *= 1.0 - wave * 0.18;

    // Vignette.
    float vig = smoothstep(1.15, 0.25, length((vUv - 0.5) * vec2(aspect, 1.0) * 0.95));
    color *= mix(0.45, 1.0, vig);

    // Darken the lower part of the frame so overlaid titles stay readable on bright images.
    color *= mix(0.5, 1.0, smoothstep(0.0, 0.55, vUv.y));

    // Blackout for list / detail modes.
    color *= 1.0 - uBlackout * 0.92;

    // Film grain.
    color += (hash(vUv * uResolution + fract(uTime) * 100.0) - 0.5) * 0.045;

    gl_FragColor = vec4(mix(uBg, color, uOpacity), 1.0);
}
`
