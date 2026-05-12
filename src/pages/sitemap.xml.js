import searchSuggestions from "@/data/searchSuggestions.json";

function generateSiteMap(baseUrl, vehicles) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!-- Core Static Pages -->
     <url>
       <loc>${baseUrl}</loc>
       <changefreq>daily</changefreq>
       <priority>1.0</priority>
     </url>
     <url>
       <loc>${baseUrl}/search</loc>
       <changefreq>hourly</changefreq>
       <priority>0.9</priority>
     </url>
     <url>
       <loc>${baseUrl}/aboutus</loc>
       <changefreq>monthly</changefreq>
       <priority>0.5</priority>
     </url>
     <url>
       <loc>${baseUrl}/avx-works</loc>
       <changefreq>monthly</changefreq>
       <priority>0.5</priority>
     </url>
     <url>
       <loc>${baseUrl}/became-seller</loc>
       <changefreq>monthly</changefreq>
       <priority>0.8</priority>
     </url>
     <url>
       <loc>${baseUrl}/consult</loc>
       <changefreq>monthly</changefreq>
       <priority>0.8</priority>
     </url>
     <url>
       <loc>${baseUrl}/inspection-process</loc>
       <changefreq>monthly</changefreq>
       <priority>0.5</priority>
     </url>
     <url>
       <loc>${baseUrl}/privacy-policy</loc>
       <changefreq>yearly</changefreq>
       <priority>0.3</priority>
     </url>
     <url>
       <loc>${baseUrl}/safety-transparency</loc>
       <changefreq>monthly</changefreq>
       <priority>0.5</priority>
     </url>
     <url>
       <loc>${baseUrl}/why-chose-us</loc>
       <changefreq>monthly</changefreq>
       <priority>0.5</priority>
     </url>

     <!-- Pre-generated Search & Category Permutations (Massive SEO Boost) -->
     ${searchSuggestions
       .filter((item) => item.link)
       .map((item) => {
         // XML requires ampersands in URLs to be escaped
         const escapedLink = item.link.replace(/&/g, "&amp;");
         return `
       <url>
           <loc>${baseUrl}${escapedLink}</loc>
           <changefreq>weekly</changefreq>
           <priority>0.6</priority>
       </url>
     `;
       })
       .join('')}

     <!-- Dynamic Vehicle Pages -->
     ${vehicles
       .map(({ id, title }) => {
         // Create a slug out of the vehicle title, e.g. "Honda City" -> "honda-city"
         const slug = title ? title.replace(/\s+/g, '-').toLowerCase() : 'vehicle-details';
         return `
       <url>
           <loc>${baseUrl}/vehicle/details/${slug}/${id}</loc>
           <changefreq>daily</changefreq>
           <priority>0.7</priority>
       </url>
     `;
       })
       .join('')}
   </urlset>
 `;
}

export async function getServerSideProps({ res, req }) {
  // Construct the base URL dynamically based on the current request
  const protocol = req.headers['x-forwarded-proto'] || 'https';
  const host = req.headers.host || 'www.reecomm.com';
  const baseUrl = `${protocol}://${host}`;

  // --------------------------------------------------------------------------
  // TODO: Fetch dynamic vehicle data from your API here to populate the sitemap
  // --------------------------------------------------------------------------
  let vehicles = [];
  try {
    // UNCOMMENT and UPDATE this with your actual API endpoint to get all vehicles.
    // Example:
    // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/vehicles/all`);
    // const data = await response.json();
    // vehicles = data.vehicles || []; // Make sure this matches your API response
    
    // For demonstration, here is a mock structure of what the API should return:
    // vehicles = [
    //   { id: '123', title: 'Honda City' },
    //   { id: '456', title: 'Hyundai Creta' }
    // ];
  } catch (e) {
    console.error("Failed to fetch vehicles for sitemap", e);
  }

  // Generate the XML sitemap with the dynamic vehicle data
  const sitemap = generateSiteMap(baseUrl, vehicles);

  // Set the response headers to XML
  res.setHeader('Content-Type', 'text/xml');
  
  // Write the XML string and end the response
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default function SiteMap() {
  // getServerSideProps will do the heavy lifting to return the XML file directly,
  // so this component simply returns null.
  return null;
}
