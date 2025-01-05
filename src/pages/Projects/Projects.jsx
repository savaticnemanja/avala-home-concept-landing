import { useState, useEffect } from "react";
import { plan1, plan2, plan3 } from "../../assets";
import "./Projects.scss";

const slides = [
  {
    highlightedWord: "Vila 1",
    rooms: [
      { name: "Predprostor", size: "10,00 m2" },
      { name: "Tehnička prostorija", size: "3,50 m2" },
      { name: "Toalet", size: "4,50 m2" },
      { name: "Hodnik", size: "11,00 m2" },
      { name: "Terasa", size: "12,00 m2" },
      { name: "Soba", size: "16,00 m2" },
      { name: "Soba", size: "13,00 m2" },
      { name: "Soba", size: "14,00 m2" },
      { name: "Kupatilo", size: "7,00 m2" },
      { name: "Vešernica", size: "6,00 m2" },
      { name: "Dnevni boravak", size: "23,00 m2" },
      { name: "Kuhinja i trpezarija", size: "28,00 m2" },
      { name: "Ostava", size: "3 m2" },
    ],
    image: plan1,
  },
  {
    highlightedWord: "Vila 2",
    rooms: [
      { name: "Predprostor", size: "11,00 m2" },
      { name: "Tehnička prostorija", size: "4,00 m2" },
      { name: "Toalet", size: "5,00 m2" },
      { name: "Hodnik", size: "12,00 m2" },
      { name: "Terasa", size: "13,00 m2" },
      { name: "Soba", size: "17,00 m2" },
      { name: "Soba", size: "14,00 m2" },
      { name: "Soba", size: "15,00 m2" },
      { name: "Kupatilo", size: "8,00 m2" },
      { name: "Vešernica", size: "7,00 m2" },
      { name: "Dnevni boravak", size: "24,00 m2" },
      { name: "Kuhinja i trpezarija", size: "29,00 m2" },
      { name: "Ostava", size: "4 m2" },
    ],
    image: plan2,
  },
  {
    highlightedWord: "Vila 3",
    rooms: [
      { name: "Predprostor", size: "12,00 m2" },
      { name: "Tehnička prostorija", size: "4,50 m2" },
      { name: "Toalet", size: "5,50 m2" },
      { name: "Hodnik", size: "13,00 m2" },
      { name: "Terasa", size: "14,00 m2" },
      { name: "Soba", size: "18,00 m2" },
      { name: "Soba", size: "15,00 m2" },
      { name: "Soba", size: "16,00 m2" },
      { name: "Kupatilo", size: "9,00 m2" },
      { name: "Vešernica", size: "8,00 m2" },
      { name: "Dnevni boravak", size: "25,00 m2" },
      { name: "Kuhinja i trpezarija", size: "30,00 m2" },
      { name: "Ostava", size: "5 m2" },
    ],
    image: plan3,
  },
];

export const Projects = () => {
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
      id="projects"
      className="projects"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <h1 className="projects__title">Projekti</h1>
      <div className="projects__content">
        <div className="projects__left">
          <h1 className="projects__title">
            {slides[currentSlide].title}{" "}
            <span className="projects__highlight">
              {slides[currentSlide].highlightedWord}
            </span>
          </h1>

          <table className="projects__table">
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
        <div className="projects__image-container">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`projects__image ${
                currentSlide === index ? "projects__image--active" : ""
              }`}
            >
              <img src={slide.image} alt="Property" />
            </div>
          ))}
        </div>
      </div>

      <div className="projects__nav">
        <button className="projects__nav-button" onClick={prevSlide}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          </svg>
        </button>
        <button className="projects__nav-button" onClick={nextSlide}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
          </svg>
        </button>
      </div>
    </div>
  );
};
