import { Routes, Route } from "react-router";
import { Footer, Navigation } from "./components";
import {
  AboutInvestor,
  AboutUs,
  Gallery,
  Homepage,
  Projects,
  Specifications,
  WorkProgress,
  Contact,
} from "./pages";
import "./App.scss";

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/specifications" element={<Specifications />} />
        <Route path="/about-investor" element={<AboutInvestor />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/work-progress" element={<WorkProgress />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
