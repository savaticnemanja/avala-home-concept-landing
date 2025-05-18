import LazyLoad from 'react-lazyload';
import {
  Contact,
  Location,
  Partners,
  PaymentDynamic,
  ProjectShowcase,
  Showcase,
  Slider,
} from "@/components";
import "./Homepage.scss";
import { galleryImage26, galleryImage29, galleryImage4, video1, video2, video3 } from '@/assets/index';

export const Homepage = () => {
  return (
    <div className="homepage">
      <Slider />
      <div className="homepage__video-wrapper">
        <LazyLoad height={300} offset={100}>
          <video controls poster={galleryImage29} preload="none">
            <source src={video1} type="video/mp4" />
            Your browser does not support HTML5 video.
          </video>
        </LazyLoad>
      </div>
      <Showcase />
      <ProjectShowcase />
      <div className="homepage__video-wrapper">
        <LazyLoad height={300} offset={100}>
          <video controls poster={galleryImage4} preload="none">
            <source src={video2} type="video/mp4" />
            Your browser does not support HTML5 video.
          </video>
        </LazyLoad>
      </div>
      <Location />
      <PaymentDynamic />
      <div className="homepage__video-wrapper">
        <LazyLoad height={300} offset={100}>
          <video controls poster={galleryImage26} preload="none">
            <source src={video3} type="video/mp4" />
            Your browser does not support HTML5 video.
          </video>
        </LazyLoad>
        </div>
      <Contact />
      <Partners />
    </div>
  );
};
