import "./WorkProgress.scss";

const videoUrls = [
  "https://www.youtube.com/embed/APZNvEz0K1U?si=_huoHPFO_dfWY0o1",
  "https://www.youtube.com/embed/USzbMmEXM48?si=aTB0OQtqQH5T4vOA",
  "https://www.youtube.com/embed/wSy8XczE-IM?si=ibxFNR5POWpet43C",
  "https://www.youtube.com/embed/8wPYRIy59ac?si=tNgM9mGcVorJRDDr",
];

const VideoFrame = ({ src }) => (
  <iframe
    src={src}
    title="YouTube video player"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerPolicy="strict-origin-when-cross-origin"
    allowFullScreen
  ></iframe>
);

export const WorkProgress = () => {
  return (
    <div className="work-progress">
      {videoUrls.map((url, index) => (
        <VideoFrame key={index} src={url} />
      ))}
    </div>
  );
};
