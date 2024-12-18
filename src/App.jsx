import React from "react";
import { Navigation, Hero, Featured, Neighborhood, Plans, Facilities, Footer } from "./components";
import logo from "./assets/logo.png";
import "./App.scss";

function App() {
  return (
    <div className="app">
      <Navigation />
      <Hero />
      <Featured />
      <Neighborhood />
      <Plans />
      <Facilities />
      {/* Blog Section */}
      <section className="blog safe-zone">
        <h2>Follow the latest articles & news</h2>
        <div className="blog-posts">
          <div className="post">Post 1</div>
          <div className="post">Post 2</div>
          <div className="post">Post 3</div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default App;
