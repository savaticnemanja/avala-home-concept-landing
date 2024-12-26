import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./Slider.scss";

export const Slider = ({ slides }) => {
  Slider.propTypes = {
    slides: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        highlightedWord: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
      })
    ).isRequired,
  };

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoSliding, setIsAutoSliding] = useState(true);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoSliding(false);
  };

  const handleMouseEnter = () => {
    setIsAutoSliding(false);
  };

  const handleMouseLeave = () => {
    setIsAutoSliding(true);
  };

  useEffect(() => {
    let intervalId;
    if (isAutoSliding) {
      intervalId = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 4000);
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isAutoSliding, slides.length]);

  return (
    <div
      className="slider"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="slider__content">
        <div className="slider__left">
          <div className="slider__indicators">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`slider__indicator ${
                  currentSlide === index ? "slider__indicator--active" : ""
                }`}
              >
                <span className="slider__indicator-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="slider__indicator-line" />
              </div>
            ))}
          </div>

          <h1 className="slider__title">
            {slides[currentSlide].title}{" "}
            <span className="slider__highlight">
              {slides[currentSlide].highlightedWord}
            </span>
          </h1>

          <p className="slider__description">
            {slides[currentSlide].description}
          </p>

          <button className="slider__button">ZAKAŽI POSETU</button>
        </div>

        <div className="slider__image-container">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`slider__image ${
                currentSlide === index ? "slider__image--active" : ""
              }`}
            >
              <img src={slide.image} alt="Property" />
            </div>
          ))}
          <div className="slider__overlay" />
        </div>
      </div>

      <div className="slider__nav">
        <button className="slider__nav-button" onClick={prevSlide}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          </svg>
        </button>
        <button className="slider__nav-button" onClick={nextSlide}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
          </svg>
        </button>
      </div>
    </div>
  );
};
