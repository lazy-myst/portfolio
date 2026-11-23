import { notFound } from "next/navigation"
import { projects, getProject } from "../../data/projects"
import SlideView from "../../components/slides/SlideView"

export function generateStaticParams() {
    return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }) {
    const { slug } = await params
    const project = getProject(slug)
    return { title: project ? `${project.title} — Ammad` : "Project — Ammad" }
}

export default async function ProjectPage({ params }) {
    const { slug } = await params
    const project = getProject(slug)
    if (!project) notFound()
    return <SlideView index={project.index + 1} />
}
