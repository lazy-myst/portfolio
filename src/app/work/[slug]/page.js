import { notFound } from "next/navigation"
import { projects, getProject } from "../../data/projects"
import ProjectDetail from "../../components/work/ProjectDetail"

export function generateStaticParams() {
    return projects.map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }) {
    const project = getProject(params.slug)
    return { title: project ? `${project.title} — Ammad` : "Project — Ammad" }
}

export default function ProjectPage({ params }) {
    if (!getProject(params.slug)) notFound()
    return <ProjectDetail slug={params.slug} />
}
