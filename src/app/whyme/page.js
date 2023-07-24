import HeroSection from "../components/WhyMePage/HeroSection"
import AboutMeSection from "../components/WhyMePage/AboutMeSection"
import DevelopmentSection from "../components/WhyMePage/DevelopmentSection"

const page = () => {
    return (
        <main className="text-black flex items-center flex-col justify-center min-h-screen bg-white">
            <HeroSection />
            <section className="container pb-20">
                <AboutMeSection />
            </section>
            <section className="container py-20">
                <DevelopmentSection />
            </section>
        </main>
    )
}

export default page