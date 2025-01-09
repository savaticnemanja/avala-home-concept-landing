import { images } from "./constants";
import "./Gallery.scss";

export const Gallery = () => {
  return (
    <div className="gallery">
      <h1 className="gallery__title">Galerija</h1>
      <div className="gallery__images">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Gallery ${index + 1}`}
            className="gallery__image"
          />
        ))}
      </div>
    </div>
  );
};
