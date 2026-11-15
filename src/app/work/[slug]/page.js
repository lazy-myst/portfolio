import { notFound } from "next/navigation"
import { projects, getProject } from "../../data/projects"
import SlideView from "../../components/slides/SlideView"

export function generateStaticParams() {
    return projects.map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }) {
    const project = getProject(params.slug)
    return { title: project ? `${project.title} — Ammad` : "Project — Ammad" }
}

export default function ProjectPage({ params }) {
    const project = getProject(params.slug)
    if (!project) notFound()
    return <SlideView index={project.index + 1} />
}
