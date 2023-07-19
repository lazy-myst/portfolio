import HeroSection from "./components/HomePage/HeroSection"
import WhyMeSection from "./components/HomePage/WhyMeSection"
import WorkedForSection from "./components/HomePage/WorkedForSection"
import ProjectsSection from "./components/HomePage/ProjectsSection"
import ContactsSection from "./components/HomePage/ContactsSection"

const page = () => {
  return (
    <main className="text-white flex items-center flex-col justify-center min-h-screen bg-black">
      <HeroSection />
      <section className="container xl:px-12 px-4 flex my-20">
        <WhyMeSection />
      </section>
      <section className="container xl:px-12 px-4 flex my-20">
        <WorkedForSection />
      </section>
      <section className="container xl:px-12 px-10 flex flex-col xl:flex-row my-20">
        <ProjectsSection />
      </section>
      <section className="container xl:px-12 px-4 flex my-20">
        <ContactsSection />
      </section>
    </main>
  )
}

export default page