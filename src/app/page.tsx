import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Projects } from "@/components/Projects";
import { ScrollTrace } from "@/components/ScrollTrace";
import { Stack } from "@/components/Stack";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <div className="relative">
          <ScrollTrace />
          <Stack />
          <Experience />
          <Projects />
          <Footer />
        </div>
      </main>
    </>
  );
}
