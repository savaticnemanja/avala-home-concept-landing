import React from "react";
import "./Contact.scss";

export const Contact = () => {
  return (
    <section className="contact-form">
      <div className="contact-form__container">
        <div className="contact-form__left">
          <h2 className="contact-form__title">Kontaktiraj za dodatne informacije</h2>
          <p className="contact-form__description">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua veniam, quis nostrud exercitation ullamco.
          </p>
          <div className="contact-form__agent">
            <img src="https://via.placeholder.com/150" alt="Agent" className="contact-form__agent-image" />
            <div className="contact-form__agent-details">
              <span className="contact-form__agent-title">Certified Agent</span>
              <h4 className="contact-form__agent-name">William J. Smith</h4>
              <p className="contact-form__agent-info">
                <span>📞 (+844) - 1875 333 469</span>
                <br />
                <span>📧 smith@example.com</span>
              </p>
            </div>
          </div>
        </div>
        <div className="contact-form__right">
          <form className="contact-form__form">
            <div className="contact-form__field-group">
              <input type="text" className="contact-form__input" placeholder="Your Name" />
              <input type="text" className="contact-form__input" placeholder="Phone Number" />
            </div>
            <input type="email" className="contact-form__input" placeholder="Email Address" />
            <textarea className="contact-form__textarea" placeholder="Message"></textarea>
            <button type="submit" className="contact-form__button">
              Send Message →
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
