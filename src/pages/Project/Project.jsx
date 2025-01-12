import "./Project.scss";

export const Project = ({
  heroImage,
  mainImage,
  description,
  showcaseImages,
  surfaceArea,
  netSurfaceArea,
}) => {
  return (
    <div className="project">
      <div className="project__hero-image">
        <img src={heroImage} alt="Hero" />
      </div>
      <div className="project__main">
        <img className="project__main-image" src={mainImage} alt="Main" />
        <div className="project__main-description">{description}</div>
      </div>
      <div className="project__showcase-images">
        {showcaseImages.map((image, index) => (
          <div key={index} className="project__showcase-image">
            <img src={image} alt={`Showcase ${index + 1}`} />
          </div>
        ))}
      </div>
      <div className="project__surface">
        <div className="project__surface-title">Površina</div>
        <div className="project__surface-value">{surfaceArea}m²</div>
      </div>

      {/* NETO POVRŠINA */}
      <div className="project__net-surface">
        <div className="project__net-surface-title">NETO POVRŠINA</div>
        <ul>
          {/* {netSurfaceArea.map((item, index) => (
            <li key={index} className="project__net-surface-item">
              <strong>{item.name}:</strong> {item.area}
            </li>
          ))} */}
        </ul>
      </div>
    </div>
  );
};
