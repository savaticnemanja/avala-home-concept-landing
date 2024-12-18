import "./Hero.scss";

export const Hero = () => {
  return (
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
  );
};
