import "./Plans.scss";

export const Plans = () => {
  return (
    <section className="plans">
      <div className="safe-zone">
        <h2>Discover house plans and blueprints</h2>
        <div className="plans-content">
          <img src="src/assets/plan1.jpg" className="blueprints" />
          <img src="src/assets/plan2.jpg" className="blueprints" />
          <img src="src/assets/plan3.jpg" className="blueprints" />
        </div>
      </div>
      <div className="features">
        <div className="feature-row">
          <div className="feature">
            <img src="/icons/quiet-neighborhood.svg" alt="Quiet Environment" />
            <h4>Zdravo prirodno okruženje</h4>
            <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
          </div>
          <div className="feature">
            <img src="/icons/local-community.svg" alt="Great Local Community" />
            <h4>Nadomak Beograda</h4>
            <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
          </div>
          <div className="feature">
            <img src="/icons/schools.svg" alt="Schools in Walking Distance" />
            <h4>Dvorište, bazen i plaža</h4>
            <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
          </div>
        </div>
        <div className="feature-row">
          <div className="feature">
            <img src="/icons/parking.svg" alt="Free Parking Place" />
            <h4>Maksimalna bezbednost</h4>
            <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
          </div>
          <div className="feature">
            <img src="/icons/play-center.svg" alt="Large Play Center" />
            <h4>Parking</h4>
            <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
          </div>
          <div className="feature">
            <img src="/icons/security.svg" alt="24/7 Security" />
            <h4>24/7 security</h4>
            <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
