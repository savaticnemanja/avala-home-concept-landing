import { Navigation, Hero, Featured, Featured2, Neighborhood, Plans, Footer, Contact, Partners } from "./components";
import "./App.scss";

function App() {
  return (
    <div className="app">
      <Navigation />
      <Hero />
      <Featured />
      <Featured2 />
      <Neighborhood />
      <Plans />
      <Contact />
      <Partners />
      <Footer />
    </div>
  );
}

export default App;
