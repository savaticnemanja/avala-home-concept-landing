import { Helmet } from "react-helmet-async";

const BASE_URL = "https://avalahomeconcept.com";
const DEFAULT_OG_IMAGE = `${BASE_URL}/web-app-manifest-512x512.png`;

export const SEO = ({ title, description, path = "", ogImage }) => {
  const fullTitle = title ? `${title} | Avala Home Concept` : "Avala Home Concept";
  const canonical = `${BASE_URL}${path}`;
  const image = ogImage ?? DEFAULT_OG_IMAGE;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="sr_RS" />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};
