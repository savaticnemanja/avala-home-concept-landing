import "./Contact.scss";

export const Contact = () => {
  return (
    <section id="contact" className="contact-form">
      <div className="contact-form__container">
        <div className="contact-form__left">
          <h1 className="contact-form__title">
            Kontaktiraj za dodatne informacije
          </h1>
        </div>
        <div className="contact-form__right">
          <form className="contact-form__form">
            <div className="contact-form__field-group">
              <input
                type="text"
                className="contact-form__input"
                placeholder="Ime i prezime"
              />
              <input
                type="text"
                className="contact-form__input"
                placeholder="Broj telefona"
              />
            </div>
            <input
              type="email"
              className="contact-form__input"
              placeholder="Email adresa"
            />
            <textarea
              className="contact-form__textarea"
              placeholder="Poruka"
            ></textarea>
            <button type="submit" className="contact-form__button">
              POŠALJI UPIT
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
