// Single source of truth for every page (Focus slider, All list, detail pages).
// Images are dummy placeholders in /public/projects/<slug>/01..05.jpg — swap them for real screenshots.

const gallery = (slug) => [2, 3, 4, 5].map((n) => `/projects/${slug}/0${n}.jpg`)

export const projects = [
    {
        slug: "hedge-play",
        title: "Hedge Play",
        category: "Fintech Platform",
        year: "2023",
        role: "Front-end Developer",
        stack: ["Next.js", "Tailwind", "Framer Motion"],
        summary: "Invest in a new way in a new world.",
        description:
            "A trading and investment platform designed to make markets feel approachable. Real-time dashboards, portfolio tracking and a calm interface that keeps complex data readable.",
    },
    {
        slug: "e-store",
        title: "E-Store",
        category: "E-commerce",
        year: "2023",
        role: "Full-stack Developer",
        stack: ["React", "Node.js", "Stripe"],
        summary: "A storefront built for speed.",
        description:
            "A modern commerce experience with instant search, a frictionless checkout and an admin panel for inventory. Placeholder copy — replace with the real story of the project.",
    },
    {
        slug: "cyltrax",
        title: "Cyltrax",
        category: "Business Software",
        year: "2022",
        role: "Software Developer",
        stack: ["React", "Express", "PostgreSQL"],
        summary: "Sales, purchases and LPG operations in one place.",
        description:
            "Software to keep track of sales, purchases and LPG cylinder logistics. Built to replace spreadsheets with clear reports, stock tracking and invoicing.",
    },
    {
        slug: "lumen-studio",
        title: "Lumen Studio",
        category: "Creative Agency",
        year: "2022",
        role: "Creative Developer",
        stack: ["Three.js", "GSAP", "GLSL"],
        summary: "Light, motion and type.",
        description:
            "An agency site where every page transition is a shader. Dummy project used as a placeholder for the portfolio layout.",
    },
    {
        slug: "north-atlas",
        title: "North Atlas",
        category: "Travel Journal",
        year: "2021",
        role: "Front-end Developer",
        stack: ["Next.js", "Mapbox", "Sanity"],
        summary: "Stories mapped across the north.",
        description:
            "An editorial travel journal combining long-form stories with interactive maps. Dummy project used as a placeholder for the portfolio layout.",
    },
    {
        slug: "echo-lab",
        title: "Echo Lab",
        category: "Audio Experiment",
        year: "2021",
        role: "Creative Developer",
        stack: ["Web Audio", "WebGL", "React"],
        summary: "Sound you can see.",
        description:
            "An experiment turning microphone input into reactive visuals. Dummy project used as a placeholder for the portfolio layout.",
    },
].map((p, i) => ({
    ...p,
    index: i,
    number: String(i + 1).padStart(2, "0"),
    cover: `/projects/${p.slug}/01.jpg`,
    images: gallery(p.slug),
}))

export const getProject = (slug) => projects.find((p) => p.slug === slug)

export const site = {
    name: "Ammad",
    role: "Developer & Creative Coder",
    email: "ammad9978@gmail.com",
    socials: [
        { label: "GitHub", href: "https://github.com/lazy-myst" },
        { label: "LinkedIn", href: "https://www.linkedin.com/in/muhammad-ammad-8193b724a/" },
    ],
}
