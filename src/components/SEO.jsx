export const SEO = ({ title, description, canonical }) => <>
    <title>{title}</title>
    <meta name="description" content={description} />
    {canonical && <link rel="canonical" href={canonical} />}
  </>;
