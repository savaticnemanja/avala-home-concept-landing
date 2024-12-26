import "./Location.scss";

export const Location = () => {
  return (
    <section id="location" className="location">
      <h1 className="location__title">Lokacija</h1>
      <div className="safe-zone">
        <div className="location-map">
          <div className="map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d22637.46524404968!2d20.5027894!3d44.6674757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475a757990daaf55%3A0xd4539abf0b202101!2sAvala%20Home%20Concept!5e0!3m2!1sen!2s!4v1698367563790!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Avala Home Concept Map"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};
