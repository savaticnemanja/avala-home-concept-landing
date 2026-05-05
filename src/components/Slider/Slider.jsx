import { arrowDown } from "@/assets";
import { useEffect, useState } from "react";
import { slides } from "./constants";
import "./Slider.scss";

export const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const changeSlide = (direction) => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + direction + slides.length) % slides.length
    );
  };

  return (
    <div className="hero-slider">
      <button
        className="hero-slider__arrow hero-slider__arrow--left"
        onClick={() => changeSlide(-1)}
      >
        <img
          src={arrowDown}
          alt="Previous slide"
          className="hero-slider__arrow-icon hero-slider__arrow-icon--left"
        />
      </button>
      <button
        className="hero-slider__arrow hero-slider__arrow--right"
        onClick={() => changeSlide(1)}
      >
        <img
          src={arrowDown}
          alt="Next slide"
          className="hero-slider__arrow-icon hero-slider__arrow-icon--right"
        />
      </button>
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`hero-slider__slide ${
            index === currentIndex ? "hero-slider__slide--active" : ""
          }`}
        >
          <img
            src={slide.image}
            alt=""
            className="hero-slider__slide-img"
            fetchpriority={index === 0 ? "high" : undefined}
            loading={index === 0 ? "eager" : "lazy"}
            decoding={index === 0 ? "sync" : "async"}
          />
        </div>
      ))}
      <div className="hero-slider__content">
        <h1 className="hero-slider__title">
          Plac, kuća, bazen, uređeno dvorište
        </h1>
        <p className="hero-slider__subtitle">
          20 minuta od Beograda, 10 minuta od Ikee
        </p>
        <a href="tel:+38163383393" className="hero-slider__cta">
          <svg className="hero-slider__cta-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24 11.36 11.36 0 0 0 3.57.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2z"/>
          </svg>
          Pozovi nas
        </a>
      </div>
      <img
        src={arrowDown}
        alt="Arrow down"
        className="hero-slider__arrow-down"
      />
    </div>
  );
};
