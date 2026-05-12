export async function getServerSideProps({ res, req }) {
  // Construct the base URL dynamically based on the current request
  const protocol = req.headers['x-forwarded-proto'] || 'https';
  const host = req.headers.host || 'www.reecomm.com';
  const baseUrl = `${protocol}://${host}`;

  // Define the robots.txt rules
  const robots = `User-agent: *
Allow: /

# Disallow private user dashboards and account pages
Disallow: /consult/dashboard/
Disallow: /consult/account/
Disallow: /user/details/

# Disallow utility pages that don't need SEO
Disallow: /register/

# Point search engines to the dynamically generated sitemap
Sitemap: ${baseUrl}/sitemap.xml
`;

  // Set the response headers to plain text
  res.setHeader('Content-Type', 'text/plain');
  
  // Write the text string and end the response
  res.write(robots);
  res.end();

  return {
    props: {},
  };
}

export default function Robots() {
  // getServerSideProps does all the work, so this component simply returns null.
  return null;
}
