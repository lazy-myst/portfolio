import HeroSection from "../components/WorkPage/HeroSection"
import ProjectsSection from "../components/WorkPage/ProjectsSection"

const page = () => {
    return (
        <main className="bg-[#EEFFC9] text-black flex items-center flex-col  min-h-screen">
            <HeroSection />
            <section className="container mt-32 mb-24">
                <ProjectsSection />
            </section>
        </main>
    )
}

export default page