import "./Gallery.scss";
import {
  galleryImage1,
  galleryImage2,
  galleryImage3,
  galleryImage4,
  galleryImage5,
  galleryImage6,
  galleryImage7,
  galleryImage8,
  galleryImage9,
  galleryImage10,
  galleryImage11,
  galleryImage12,
  galleryImage13,
  galleryImage14,
  galleryImage15,
  galleryImage16,
  galleryImage17,
  galleryImage18,
  galleryImage19,
  galleryImage20,
  galleryImage21,
  galleryImage23,
  galleryImage24,
  galleryImage25,
  galleryImage26,
} from "../../assets";

export const Gallery = () => {
  return (
    <div className="gallery">
      <h1 className="gallery__title">Galerija</h1>
      <div className="gallery__images">
        <img src={galleryImage1} alt="Gallery 1" className="gallery__image" />
        <img src={galleryImage2} alt="Gallery 2" className="gallery__image" />
        <img src={galleryImage3} alt="Gallery 3" className="gallery__image" />
        <img src={galleryImage4} alt="Gallery 4" className="gallery__image" />
        <img src={galleryImage5} alt="Gallery 5" className="gallery__image" />
        <img src={galleryImage6} alt="Gallery 6" className="gallery__image" />
        <img src={galleryImage7} alt="Gallery 7" className="gallery__image" />
        <img src={galleryImage8} alt="Gallery 8" className="gallery__image" />
        <img src={galleryImage9} alt="Gallery 9" className="gallery__image" />
        <img src={galleryImage10} alt="Gallery 10" className="gallery__image" />
        <img src={galleryImage11} alt="Gallery 11" className="gallery__image" />
        <img src={galleryImage12} alt="Gallery 12" className="gallery__image" />
        <img src={galleryImage13} alt="Gallery 13" className="gallery__image" />
        <img src={galleryImage14} alt="Gallery 14" className="gallery__image" />
        <img src={galleryImage15} alt="Gallery 15" className="gallery__image" />
        <img src={galleryImage16} alt="Gallery 16" className="gallery__image" />
        <img src={galleryImage17} alt="Gallery 17" className="gallery__image" />
        <img src={galleryImage18} alt="Gallery 18" className="gallery__image" />
        <img src={galleryImage19} alt="Gallery 19" className="gallery__image" />
        <img src={galleryImage20} alt="Gallery 20" className="gallery__image" />
        <img src={galleryImage21} alt="Gallery 21" className="gallery__image" />
        <img src={galleryImage23} alt="Gallery 23" className="gallery__image" />
        <img src={galleryImage24} alt="Gallery 24" className="gallery__image" />
        <img src={galleryImage25} alt="Gallery 25" className="gallery__image" />
        <img src={galleryImage26} alt="Gallery 26" className="gallery__image" />
      </div>
    </div>
  );
};
