import { useEffect, useCallback } from "react";
import "./Lightbox.scss";

export const Lightbox = ({ images, activeIndex, onClose, onSetIndex }) => {
  const prev = useCallback(() =>
    onSetIndex((i) => (i - 1 + images.length) % images.length), [images.length, onSetIndex]);

  const next = useCallback(() =>
    onSetIndex((i) => (i + 1) % images.length), [images.length, onSetIndex]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, prev, next]);

  if (activeIndex === null) return null;

  const { src, alt } = images[activeIndex];

  return (
    <div className="lightbox" onClick={onClose}>
      <button className="lightbox__close" onClick={onClose} aria-label="Zatvori">&#x2715;</button>
      <button
        className="lightbox__nav lightbox__nav--prev"
        onClick={(e) => { e.stopPropagation(); prev(); }}
        aria-label="Prethodna"
      >&#8249;</button>
      <img
        src={src}
        alt={alt}
        className="lightbox__img"
        onClick={(e) => e.stopPropagation()}
      />
      <button
        className="lightbox__nav lightbox__nav--next"
        onClick={(e) => { e.stopPropagation(); next(); }}
        aria-label="Sledeća"
      >&#8250;</button>
    </div>
  );
};
