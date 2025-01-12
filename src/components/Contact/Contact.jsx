import { emailIcon, phoneIcon, viberIcon, whatsappIcon } from "@/assets";
import emailjs from "@emailjs/browser";
import { useRef } from "react";
import "./Contact.scss";

const ContactIcon = ({ icon, text }) => (
  <div className="contact__icon">
    <img src={icon} alt="Contact Icon" />
    <p>{text}</p>
  </div>
);

export const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_479xn4w",
        "template_f65leyq",
        form.current,
        "yXqwmaxm-PpofwIqK"
      )
      .then(
        () => {
          console.log("Email sent successfully!");
          alert("Your message has been sent.");
        },
        (error) => {
          console.error("Error sending email:", error.text);
          alert("Failed to send message. Please try again later.");
        }
      );
  };

  return (
    <div className="contact">
      <div className="contact__left">
        <h1>Imaš pitanje?</h1>
        <p>
          Klikom na dugme ispod kontaktiraj nas putem željenog kanala, a mi ćemo
          odgovoriti u najkraćem roku.
        </p>
        <div className="contact__icons">
          <ContactIcon
            icon={phoneIcon}
            text="+381 11 123 456"
            onClick={() => (window.location.href = "tel:+38111123456")}
          />
          <ContactIcon
            icon={viberIcon}
            text="avalahomeconcept@gmail.com"
            onClick={() =>
              window.open("viber://add?number=+38111123456", "_blank")
            }
          />
          <ContactIcon
            icon={whatsappIcon}
            text="avalahomeconcept@gmail.com"
            onClick={() => window.open("https://wa.me/38111123456", "_blank")}
          />
          <ContactIcon
            icon={emailIcon}
            text="avalahomeconcept@gmail.com"
            onClick={() =>
              (window.location.href = "mailto:avalahomeconcept@gmail.com")
            }
          />
        </div>
      </div>
      <div className="contact__right">
        <form ref={form} onSubmit={sendEmail}>
          <input type="text" name="firstName" placeholder="Ime" required />
          <input type="text" name="lastName" placeholder="Prezime" required />
          <input
            type="tel"
            name="contactNumber"
            placeholder="Broj telefona"
            required
          />
          <input
            type="email"
            name="contactEmail"
            placeholder="Email adresa"
            required
          />
          <textarea
            name="message"
            placeholder="Vaša poruka"
            rows="4"
            required
          ></textarea>
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};
