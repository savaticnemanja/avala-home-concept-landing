import React from "react";
import "./App.scss";

function App() {
  return (
    <div className="app">
      {/* Navigation */}
      <nav className="navigation">
        <div className="container safe-zone">
          <div className="logo">LOGO</div>
          <ul className="nav-links">
            <li>Home</li>
            <li>About</li>
            <li>Services</li>
            <li>Contact</li>
          </ul>
          <button className="cta-button">Find a House</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="safe-zone">
          <div className="hero-content">
            <h1>
              Find your next, perfect place to <span>live</span>
            </h1>
            <p>Our mission is to bring spaces to life so that you can connect to what matters.</p>
            <button>Take a Tour</button>
          </div>
        </div>
        <div className="hero-image"></div>
      </section>

      {/* Featured Section */}
      <section className="featured">
        <div className="safe-zone">
          <div className="featured-content">
            <div className="text">
              <h2>Making living spaces affordable</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <div className="image"></div>
          </div>
        </div>
      </section>

      {/* Neighborhood Section */}
      <section className="neighborhood full-width">
        <div className="safe-zone">
          <h2>Get to know your neighborhood</h2>
          <div className="neighborhood-map">
            <div className="map"></div>
            <div className="details">
              <h3>Shopping Center</h3>
              <p>Everything you need within walking distance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section className="plans">
        <div className="safe-zone">
          <h2>Discover house plans and blueprints</h2>
          <div className="plans-content">
            <div className="table">[Table Placeholder]</div>
            <div className="blueprints">[Blueprints Image]</div>
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="facilities full-width">
        <div className="safe-zone">
          <h2>Modern and quality facilities</h2>
          <div className="facilities-content">
            <div className="image"></div>
            <div className="text">
              <ul>
                <li>High-end materials</li>
                <li>Private Gardens</li>
                <li>Modern Kitchens</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="blog safe-zone">
        <h2>Follow the latest articles & news</h2>
        <div className="blog-posts">
          <div className="post">Post 1</div>
          <div className="post">Post 2</div>
          <div className="post">Post 3</div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer full-width">
        <div className="safe-zone">
          <div className="footer-top">
            <div className="logo">LOGO</div>
            <ul>
              <li>Privacy Policy</li>
              <li>Terms of Use</li>
            </ul>
          </div>
          <div className="footer-bottom">
            <p>© 2024 Your Company</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
