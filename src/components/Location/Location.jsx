import { map } from "@/assets";
import { FaMapMarkerAlt } from "react-icons/fa";
import "./Location.scss";

const locations = [
  { name: "Autoput", time: "10min" },
  { name: "Ikea", time: "10min" },
  { name: "Marketi", time: "2min" },
  { name: "TC Ava", time: "10min" },
  { name: "Skola", time: "5min" },
  { name: "Autokomanda", time: "20min" },
  { name: "Vracar", time: "20min" },
  { name: "Ambulanta", time: "5min" },
  { name: "Gradski prevoz", time: "2min" },
];

export const Location = () => {
  return (
    <div className="location">
      <div className="location-map">
        <img src={map} alt="Map" />
      </div>
      <div className="location-list">
        <ul>
          {locations.map((location, index) => (
            <li key={index}>
              <FaMapMarkerAlt className="location-icon" />
              <span>{location.name}</span>
              <span className="underscore"></span>
              <span>{location.time}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
