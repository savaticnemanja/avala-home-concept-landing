import logo from "../../assets/logo.png";
import footer1 from "../../assets/1.webp";
import footer2 from "../../assets/2.webp";
import footer3 from "../../assets/3.webp";
import "./Footer.scss";

export const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__images">
        <img src={footer2} alt="" />
        <img src={footer3} alt="" />
        <img src={footer1} alt="" />
        <img src={footer2} alt="" />
        <img src={footer3} alt="" />
      </div>
      <div className="footer__sections">
        <div className="footer__section">
          <img src={logo} alt="" />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus architecto labore reiciendis, animi saepe vel ab numquam? Sunt rerum ex aliquid, natus dicta
            reprehenderit, aliquam illum officia vitae consequatur at.
          </p>
        </div>
        <div className="footer__section">
          <h3>Useful Links</h3>
          <ul>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Services</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
        </div>
        <div className="footer__section">
          <h3>Follow Us</h3>
        </div>
      </div>
      <div className="footer__copyright">Copyright &#169; Nemanja Savatic</div>
    </div>
  );
};
