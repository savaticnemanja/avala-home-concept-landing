import "./Neighborhood.scss";

export const Neighborhood = () => {
  return (
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
  );
};
