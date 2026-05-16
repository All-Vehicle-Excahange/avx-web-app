const fs = require('fs');
const path = require('path');

/**
 * Script to generate individual state sitemaps by fetching city data from the API.
 * Each state gets its own XML file in public/sitemaps/
 */

const statesData = {
  "data": [
    { "id": 4023, "name": "Andaman and Nicobar Islands" },
    { "id": 4017, "name": "Andhra Pradesh" },
    { "id": 4024, "name": "Arunachal Pradesh" },
    { "id": 4027, "name": "Assam" },
    { "id": 4037, "name": "Bihar" },
    { "id": 4031, "name": "Chandigarh" },
    { "id": 4040, "name": "Chhattisgarh" },
    { "id": 4033, "name": "Dadra and Nagar Haveli and Daman and Diu" },
    { "id": 4021, "name": "Delhi" },
    { "id": 4009, "name": "Goa" },
    { "id": 4030, "name": "Gujarat" },
    { "id": 4007, "name": "Haryana" },
    { "id": 4020, "name": "Himachal Pradesh" },
    { "id": 4029, "name": "Jammu and Kashmir" },
    { "id": 4025, "name": "Jharkhand" },
    { "id": 4026, "name": "Karnataka" },
    { "id": 4028, "name": "Kerala" },
    { "id": 4852, "name": "Ladakh" },
    { "id": 4019, "name": "Lakshadweep" },
    { "id": 4039, "name": "Madhya Pradesh" },
    { "id": 4008, "name": "Maharashtra" },
    { "id": 4010, "name": "Manipur" },
    { "id": 4006, "name": "Meghalaya" },
    { "id": 4036, "name": "Mizoram" },
    { "id": 4018, "name": "Nagaland" },
    { "id": 4013, "name": "Odisha" },
    { "id": 4011, "name": "Puducherry" },
    { "id": 4015, "name": "Punjab" },
    { "id": 4014, "name": "Rajasthan" },
    { "id": 4034, "name": "Sikkim" },
    { "id": 4035, "name": "Tamil Nadu" },
    { "id": 4012, "name": "Telangana" },
    { "id": 4038, "name": "Tripura" },
    { "id": 4022, "name": "Uttar Pradesh" },
    { "id": 4016, "name": "Uttarakhand" },
    { "id": 4853, "name": "West Bengal" }
  ]
};

const BASE_URL = "https://www.reecomm.com";
const CITY_API_ENDPOINT = "https://reecomm-spring-fcde06afd95d.herokuapp.com/api/v1/website/util/address/cities";
const OUTPUT_DIR = path.join(process.cwd(), 'public', 'sitemaps');

async function generateSitemaps() {
  console.log("Starting sitemap generation...");

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  for (const state of statesData.data) {
    const stateSlug = state.name.toLowerCase().replace(/\s+/g, '-');
    console.log(`Processing ${state.name}...`);
    
    try {
      const response = await fetch(`${CITY_API_ENDPOINT}/${state.id}`);
      if (!response.ok) {
        console.error(`Error: Could not fetch cities for ${state.name}`);
        continue;
      }
      
      const result = await response.json();
      const cities = result.data || [];

      if (cities.length === 0) {
        console.log(`No cities found for ${state.name}, skipping.`);
        continue;
      }

      let xmlContent = `<?xml version="1.0" encoding="UTF-8"?>\n`;
      xmlContent += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
      
      cities.forEach(city => {
        const citySlug = city.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
        xmlContent += `  <url>\n`;
        xmlContent += `    <loc>${BASE_URL}/search/buy-used-cars-${citySlug}</loc>\n`;
        xmlContent += `    <changefreq>daily</changefreq>\n`;
        xmlContent += `    <priority>0.8</priority>\n`;
        xmlContent += `  </url>\n`;
      });
      
      xmlContent += `</urlset>`;
      
      const filePath = path.join(OUTPUT_DIR, `buy-used-cars-${stateSlug}.xml`);
      fs.writeFileSync(filePath, xmlContent, 'utf8');
      console.log(`Successfully generated ${cities.length} URLs for ${state.name} -> buy-used-cars-${stateSlug}.xml`);
    } catch (err) {
      console.error(`Failed to process ${state.name}:`, err.message);
    }
  }
}

generateSitemaps()
  .then(() => console.log("Sitemap generation completed!"))
  .catch(err => console.error("Fatal error during generation:", err));
