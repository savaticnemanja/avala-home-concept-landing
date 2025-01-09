import {
  project1Main,
  project1Spec1,
  project1Spec3,
  project1Spec2,
  project1Render,
} from "../../assets";

import "./Projects.scss";

const ProjectDescription = () => (
  <div className="projects__main-description">
    Prostrana prizemna kuća od 139 metara kvadratnih. Ova moderno dizajnirana
    kuća ima i dva parking mesta i odvojenu namensku prostoriju pokraj bazena u
    koju možete smestiti letnju kuhinju. Čak tri prozračne i komforne sobe
    prozicionirane su tako da primaju dosta sunčeve svetlosti što će Vam svakog
    jutra uliti dodatno raspoloženje. Vrata velikog dnevnog boravka otvaraju se
    na terasu koja pruža veličanstven pogled na Avalaski toranj. Sa terase se
    stepenicama spuštate na uređenu stazu koja Vas vodi do bazena i plaže.
  </div>
);

const ShowcaseImages = () => (
  <div className="projects__showcase-images">
    {[project1Spec1, project1Spec2, project1Spec3].map((src, index) => (
      <div key={index} className="projects__showcase-image">
        <img src={src} alt="" />
      </div>
    ))}
  </div>
);

const SurfaceInfo = () => (
  <div className="projects__surface">
    <div className="projects__surface-title">Površina</div>
    <div className="projects__surface-value">139m²</div>
  </div>
);

export const ProjectOverview = () => {
  return (
    <div className="projects">
      <div className="projects__hero-image">
        <img src={project1Render} alt="" />
      </div>
      <div className="projects__main">
        <img className="projects__main-image" src={project1Main} alt="" />
        <ProjectDescription />
      </div>
      <ShowcaseImages />
      <SurfaceInfo />
    </div>
  );
};
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const Project1 = () => (
  <div className="projects">
    <div className="projects__hero-image">
      <img src={project1Render} alt="" />
    </div>
    <div className="projects__main">
      <img className="projects__main-image" src={project1Main} alt="" />
      <ProjectDescription />
    </div>
    <ShowcaseImages />
    <SurfaceInfo />
  </div>
);

const Project2 = () => (
  <div className="projects">{/* Add Project2 specific content here */}</div>
);

export const ProjectsPage = () => {
  return (
    <Routes>
      <Route path="/projects/project1" element={<Project1 />} />
      <Route path="/projects/project2" element={<Project2 />} />
      <Route path="/projects" element={<ProjectOverview />} />
    </Routes>
  );
};
