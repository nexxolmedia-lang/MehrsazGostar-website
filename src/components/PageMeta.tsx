interface PageMetaProps {
  title: string;
  description: string;
}

const SITE_NAME = 'مهرساز گستر';

/** React 19 hoists these elements into <head>. */
export function PageMeta({ title, description }: PageMetaProps) {
  const fullTitle = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`;
  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
    </>
  );
}
