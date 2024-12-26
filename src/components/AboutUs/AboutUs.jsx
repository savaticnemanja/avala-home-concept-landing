import featuredImage from "../../assets/featured-image.jpg";
import "./AboutUs.scss";

export const AboutUs = () => {
  return (
    <section className="about-us">
      <div className="about-us__left">
        <img src={featuredImage} alt="" className="about-us__image" />
      </div>
      <div className="about-us__right">
        <h2>Dom po Vašoj meri</h2>
        <p>
          Dobrodošli u Avala Home Concept - vašu destinaciju za udobniji,
          kvalitetniji i zdraviji način života na prelepom području Avalske
          planine, nadomak Beograda. Naša misija je pružiti vam luksuzne kuće
          modernog dizajna koje će ispuniti sve vaše potrebe i omogućiti vam da
          uživate u životu okruženi predivnom prirodom.
        </p>
        <p>
          Svaka kuća iz naše Avala Home Concept ponude pažljivo je osmišljena i
          izgrađena kako bi pružila maksimalan komfor i udobnost višečlanim
          porodicama.
        </p>
      </div>
    </section>
  );
};
