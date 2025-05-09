import LazyLoad from 'react-lazyload';
import { smallHousesVideo, smallHousesMain, smallHousesInfo1, smallHousesInfo2, smallHousesGallery1, smallHousesGallery2, smallHousesGallery3, smallHousesGallery4, smallHousesGallery5, smallHousesGallery6 } from "@/assets/index";
import "./SmallHouses.scss";

export const SmallHouses = () => {
  return (
    <div className="small-houses">
      <div className="small-houses__hero-image">
        <img src={smallHousesMain} alt="Hero" />
      </div>
      <div className="small-houses__main">
        <img className="small-houses__main-image" src={smallHousesInfo1} alt="Main" />
        <img className="small-houses__main-image" src={smallHousesInfo2} alt="Main" />
      </div>
      <LazyLoad height={300} offset={100}>
        <video controls poster={smallHousesMain} preload="none" width="100%">
          <source src={smallHousesVideo} type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>
      </LazyLoad>
      <div className="small-houses__showcase-images">
        <div className="small-houses__showcase-image">
          <img src={smallHousesGallery1} alt="Showcase 1" />
        </div>
        <div className="small-houses__showcase-image">
          <img src={smallHousesGallery2} alt="Showcase 2" />
        </div>
        <div className="small-houses__showcase-image">
          <img src={smallHousesGallery3} alt="Showcase 3" />
        </div>
        <div className="small-houses__showcase-image">
          <img src={smallHousesGallery4} alt="Showcase 4" />
        </div>
        <div className="small-houses__showcase-image">
          <img src={smallHousesGallery5} alt="Showcase 5" />
        </div>
        <div className="small-houses__showcase-image">
          <img src={smallHousesGallery6} alt="Showcase 6" />
        </div>
      </div>
    </div>
  );
};
