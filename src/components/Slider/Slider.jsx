import { useState, useEffect } from "react";
import {
  sliderImage1,
  sliderImage2,
  sliderImage3,
  sliderImage4,
  sliderImage5,
} from "../../assets";
import "./Slider.scss";

const slides = [
  {
    id: 1,
    image: sliderImage1,
    title: "Slide One",
    subtitle: "This is the first slide",
  },
  {
    id: 2,
    image: sliderImage2,
    title: "Slide Two",
    subtitle: "This is the second slide",
  },
  {
    id: 3,
    image: sliderImage3,
    title: "Slide Two",
    subtitle: "This is the second slide",
  },
  {
    id: 4,
    image: sliderImage4,
    title: "Slide Two",
    subtitle: "This is the second slide",
  },
  {
    id: 5,
    image: sliderImage5,
    title: "Slide Two",
    subtitle: "This is the second slide",
  },
];

export const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + slides.length) % slides.length
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  return (
    <div className="hero-slider">
      <button
        className="hero-slider__arrow hero-slider__arrow--left"
        onClick={goToPrevious}
      >
        &lt;
      </button>
      <button
        className="hero-slider__arrow hero-slider__arrow--right"
        onClick={goToNext}
      >
        &gt;
      </button>
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`hero-slider__slide ${
            index === currentIndex ? "hero-slider__slide--active" : ""
          }`}
          style={{ backgroundImage: `url(${slide.image})` }}
        ></div>
      ))}
      <div className="hero-slider__content">
        <h1 className="hero-slider__title">Vaš raj u nadomku Beograda</h1>
        <p className="hero-slider__subtitle">Luksuzne vile za moderan život</p>
      </div>
    </div>
  );
};
