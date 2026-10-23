import { Navbar } from './components/navigation/Navbar';
import { Hero } from './components/hero/Hero';
import { About } from './components/sections/About';
import { Skills } from './components/sections/Skills';
import { Experience } from './components/sections/Experience';
import { Education } from './components/sections/Education';
import { Achievements } from './components/sections/Achievements';
import { Projects } from './components/projects/Projects';
import { Contact } from './components/sections/Contact';
import { Footer } from './components/Footer';
import { ScrollProgress } from './components/ui/ScrollProgress';
import { sectionVisibility } from './data/data';

function App() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        {sectionVisibility.hero && <Hero />}
        {sectionVisibility.about && <About />}
        {sectionVisibility.skills && <Skills />}
        {sectionVisibility.projects && <Projects />}
        <Experience />
        <Education />
        <Achievements />
        {sectionVisibility.contact && <Contact />}
      </main>
      <Footer />
    </>
  );
}

export default App;
