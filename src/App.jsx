import {
  AboutInvestor,
  AboutUs,
  ContactPage,
  Gallery,
  Homepage,
  Project,
  Specifications,
  WorkProgress,
} from "@/pages";
import { Route, Routes } from "react-router";
import "./App.scss";
import { Footer, Navigation } from "./components";
import { projects } from "./projects";

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about-us" element={<AboutUs />} />

        {/* Dynamically generate routes for projects */}
        {projects.map((project, index) => (
          <Route
            key={index}
            path={`/project${index + 1}`}
            element={
              <Project
                heroImage={project.heroImage}
                mainImage={project.mainImage}
                description={project.description}
                showcaseImages={project.showcaseImages}
                surfaceArea={project.surfaceArea}
              />
            }
          />
        ))}

        <Route path="/specifications" element={<Specifications />} />
        <Route path="/about-investor" element={<AboutInvestor />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/work-progress" element={<WorkProgress />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
