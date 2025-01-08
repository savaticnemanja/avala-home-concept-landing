import { phoneIcon, viberIcon, emailIcon, whatsappIcon } from "../../assets";
import "./Contact.scss";

export const Contact = () => {
  return (
    <div className="contact">
      <div className="contact__left">
        <h1>Imaš pitanje?</h1>
        <p>
          Klikom na dugme ispod kontaktiraj nas putem željenog kanala, a mi ćemo
          odgovoriti u najkraćem roku.
        </p>
        <div className="contact__icons">
          <div className="contact__icon">
            <img src={phoneIcon} alt="Phone" />
            <p>+381 11 123 456</p>
          </div>
          <div className="contact__icon">
            <img src={viberIcon} alt="Phone" />
            <p>avalahomeconcept@gmail.com</p>
          </div>
          <div className="contact__icon">
            <img src={whatsappIcon} alt="Phone" />
            <p>avalahomeconcept@gmail.com</p>
          </div>
          <div className="contact__icon">
            <img src={emailIcon} alt="Phone" />
            <p>avalahomeconcept@gmail.com</p>
          </div>
        </div>
      </div>
      <div className="contact__right">
        <input type="text" placeholder="Ime i prezime" />
        <select>
          <option value="" disabled selected>
            Razlog kontaktiranja
          </option>
          <option value="general">Generalno</option>
          <option value="partnership">Partnerstvo</option>
          <option value="support">Podrška</option>
        </select>
        <input type="email" placeholder="Email adresa" />
        <textarea placeholder="Poruka" />
        <button>Pošalji</button>
      </div>
    </div>
  );
};
