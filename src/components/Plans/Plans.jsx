import { useState, useEffect } from "react";
import "./Plans.scss";

const slides = [
  {
    title: "Avala Home Concept",
    highlightedWord: "Vila 1",
    rooms: [
      { name: "Predprostor", size: "10,00 m2" },
      { name: "Tehnička prostorija", size: "3,00 m2" },
      { name: "Toalet", size: "4,00 m2" },
      { name: "Hodnik", size: "10,00 m2" },
      { name: "Terasa", size: "11,00 m2" },
      { name: "Soba", size: "15,00 m2" },
      { name: "Soba", size: "12,00 m2" },
      { name: "Soba", size: "12,00 m2" },
      { name: "Kupatilo", size: "6,00 m2" },
      { name: "Vešernica", size: "5,00 m2" },
      { name: "Dnevni boravak", size: "22,00 m2" },
      { name: "Kuhinja i trpezarija", size: "27,00 m2" },
      { name: "Ostava", size: "2 m2" },
    ],
    image: "src/assets/plans/plan1.webp",
  },
  {
    title: "Kompleks modernih kuća sa bazenom na",
    highlightedWord: "Avali",
    rooms: [
      { name: "Predprostor", size: "10,00 m2" },
      { name: "Tehnička prostorija", size: "3,00 m2" },
      { name: "Toalet", size: "4,00 m2" },
      { name: "Hodnik", size: "10,00 m2" },
      { name: "Terasa", size: "11,00 m2" },
      { name: "Soba", size: "15,00 m2" },
      { name: "Soba", size: "12,00 m2" },
      { name: "Soba", size: "12,00 m2" },
      { name: "Kupatilo", size: "6,00 m2" },
      { name: "Vešernica", size: "5,00 m2" },
      { name: "Dnevni boravak", size: "22,00 m2" },
      { name: "Kuhinja i trpezarija", size: "27,00 m2" },
      { name: "Ostava", size: "2 m2" },
    ],
    image: "src/assets/plans/plan2.webp",
  },
  {
    title: "Kompleks modernih kuća sa bazenom na",
    highlightedWord: "Avali",
    rooms: [
      { name: "Predprostor", size: "10,00 m2" },
      { name: "Tehnička prostorija", size: "3,00 m2" },
      { name: "Toalet", size: "4,00 m2" },
      { name: "Hodnik", size: "10,00 m2" },
      { name: "Terasa", size: "11,00 m2" },
      { name: "Soba", size: "15,00 m2" },
      { name: "Soba", size: "12,00 m2" },
      { name: "Soba", size: "12,00 m2" },
      { name: "Kupatilo", size: "6,00 m2" },
      { name: "Vešernica", size: "5,00 m2" },
      { name: "Dnevni boravak", size: "22,00 m2" },
      { name: "Kuhinja i trpezarija", size: "27,00 m2" },
      { name: "Ostava", size: "2 m2" },
    ],
    image: "src/assets/plans/plan3.webp",
  },
];

export const Plans = () => {
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
      className="plans"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="plans__content">
        <div className="plans__left">
          <h1 className="plans__title">
            {slides[currentSlide].title}{" "}
            <span className="plans__highlight">
              {slides[currentSlide].highlightedWord}
            </span>
          </h1>

          <table className="plans__table">
            <thead>
              <tr>
                <th>Room</th>
                <th>Size</th>
              </tr>
            </thead>
            <tbody>
              {slides[currentSlide].rooms.map((room, index) => (
                <tr key={index}>
                  <td>{room.name}</td>
                  <td>{room.size}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="plans__image-container">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`plans__image ${
                currentSlide === index ? "plans__image--active" : ""
              }`}
            >
              <img src={slide.image} alt="Property" />
            </div>
          ))}
          <div className="plans__overlay" />
        </div>
      </div>

      <div className="plans__nav">
        <button className="plans__nav-button" onClick={prevSlide}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          </svg>
        </button>
        <button className="plans__nav-button" onClick={nextSlide}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
          </svg>
        </button>
      </div>
    </div>
  );
};
