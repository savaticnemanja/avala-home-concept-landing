import "./Neighborhood.scss";

export const Neighborhood = () => {
  return (
    <section className="neighborhood full-width">
      <div className="safe-zone">
        <h2>Lokacija Avala Home Concepta</h2>
        <div className="neighborhood-map">
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
          <div className="details">
            <h3>Shopping Center</h3>
            <p>Everything you need within walking distance.</p>
          </div>
        </div>
        <div className="neighborhood-features">
          <div className="feature-row">
            <div className="feature">
              <img src="/icons/quiet-neighborhood.svg" alt="Quiet Neighborhood" />
              <h4>Zdravo prirodno okruženje</h4>
              <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
            </div>
            <div className="feature">
              <img src="/icons/local-community.svg" alt="Great Local Community" />
              <h4>Nadomak Beograda</h4>
              <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
            </div>
            <div className="feature">
              <img src="/icons/schools.svg" alt="Schools in Walking Distance" />
              <h4>Dvorište, bazen i plaža</h4>
              <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
            </div>
          </div>
          <div className="feature-row">
            <div className="feature">
              <img src="/icons/parking.svg" alt="Free Parking Place" />
              <h4>Maksimalna bezbednost</h4>
              <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
            </div>
            <div className="feature">
              <img src="/icons/play-center.svg" alt="Large Play Center" />
              <h4>Parking</h4>
              <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
            </div>
            <div className="feature">
              <img src="/icons/security.svg" alt="24/7 Security" />
              <h4>24/7 security</h4>
              <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
