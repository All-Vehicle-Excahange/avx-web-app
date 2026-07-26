const fs = require('fs');
const path = require('path');

const SITEMAP_URL = process.env.SITEMAP_URL || 'https://www.reecomm.com/sitemap.xml';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.reecomm.online/api/v1/website';
const PUBLIC_DIR = path.join(process.cwd(), 'public');
const DATA_DIR = path.join(process.cwd(), 'src', 'data');
const OUTPUT_FILE = path.join(PUBLIC_DIR, 'search_index.json');

/**
 * Format string into Title Case
 */
function toTitleCase(str) {
  if (!str) return '';
  return str
    .replace(/-/g, ' ')
    .replace(/_/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
}

/**
 * Parse a URL path and extract search index item if it represents a search page or consultant.
 * Excludes generic static pages (terms, privacy, login, etc.).
 */
function parseUrlPath(urlStr) {
  let pathname = '';
  try {
    const parsedUrl = new URL(urlStr.startsWith('http') ? urlStr : `https://www.reecomm.com${urlStr}`);
    pathname = parsedUrl.pathname;
  } catch (e) {
    pathname = urlStr;
  }

  const cleanPath = pathname.replace(/^\/+|\/+$/g, '');
  if (!cleanPath) return null;

  const parts = cleanPath.split('/').filter(Boolean);

  // 1. Consultant / Storefront Pages: /auto-consultant/{username} or /storefront/{username}
  if ((parts[0] === 'auto-consultant' || parts[0] === 'storefront') && parts[1]) {
    const username = parts[1];
    const cleanName = toTitleCase(username);
    return {
      id: `consultant_${username}`,
      title: cleanName,
      keywords: cleanName.toLowerCase().split(' ').concat([username.toLowerCase(), 'consultant', 'dealer', 'storefront']),
      type: 'consultant',
      params: {
        username: username
      }
    };
  }

  // 2. Used Vehicle Filters: /used-cars/{maker}/{model}/{city}
  if (parts[0] === 'used-cars') {
    const maker = parts[1] ? toTitleCase(parts[1]) : null;
    const model = parts[2] ? toTitleCase(parts[2]) : null;
    const city = parts[3] ? toTitleCase(parts[3]) : null;

    let title = 'Used Cars';
    if (maker) title = `${maker} Cars`;
    if (model) title = `${maker} ${model}`;
    if (city) title += ` in ${city}`;

    const keywords = [maker, model, city, 'used car', 'four wheeler'].filter(Boolean).map(s => s.toLowerCase());

    const params = {
      vehicleType: 'FOUR_WHEELER'
    };
    if (maker) params.makerName = maker;
    if (model) params.modelName = model;
    if (city) params.city = city;

    return {
      id: `filter_${parts.join('_')}`,
      title: title,
      keywords: keywords,
      type: 'vehicle_filter',
      params: params
    };
  }

  // 3. Category / Search Landing Pages: /search/buy-used-... or /buy-used-...
  if (parts[0] === 'search' || parts[0].startsWith('buy-used-')) {
    const searchSlug = parts[0] === 'search' && parts[1] ? parts[1] : parts[0];

    const isTwoWheeler = searchSlug.includes('two-wheelers');
    const vehicleType = isTwoWheeler ? 'TWO_WHEELER' : 'FOUR_WHEELER';

    let title = isTwoWheeler ? 'Used Two-Wheelers' : 'Used Cars';
    const keywords = [isTwoWheeler ? 'two wheeler' : 'used car', isTwoWheeler ? 'bike' : 'car'];
    const params = { vehicleType };

    // Price filters
    if (searchSlug.includes('under-3-lakhs')) {
      params.maxPrice = 300000;
      title = `${isTwoWheeler ? 'Bikes' : 'Cars'} Under ₹3 Lakhs`;
      keywords.push('budget', 'under 3 lakh');
    } else if (searchSlug.includes('under-5-lakhs')) {
      params.maxPrice = 500000;
      title = `${isTwoWheeler ? 'Bikes' : 'Cars'} Under ₹5 Lakhs`;
      keywords.push('budget', 'under 5 lakh');
    } else if (searchSlug.includes('under-10-lakhs')) {
      params.maxPrice = 1000000;
      title = `${isTwoWheeler ? 'Bikes' : 'Cars'} Under ₹10 Lakhs`;
      keywords.push('budget', 'under 10 lakh');
    } else if (searchSlug.includes('under-15-lakhs')) {
      params.maxPrice = 1500000;
      title = `${isTwoWheeler ? 'Bikes' : 'Cars'} Under ₹15 Lakhs`;
      keywords.push('budget', 'under 15 lakh');
    } else if (searchSlug.includes('under-50k')) {
      params.maxPrice = 50000;
      title = 'Bikes Under ₹50,000';
      keywords.push('budget', 'under 50k');
    } else if (searchSlug.includes('under-1-lakh')) {
      params.maxPrice = 100000;
      title = 'Bikes Under ₹1 Lakh';
      keywords.push('budget', 'under 1 lakh');
    } else if (searchSlug.includes('under-2-lakh')) {
      params.maxPrice = 200000;
      title = 'Bikes Under ₹2 Lakhs';
      keywords.push('budget', 'under 2 lakh');
    }

    // Body type / Vehicle sub-type filters
    if (searchSlug.includes('suv')) {
      params.vehicleSubType = 'SUV';
      title = title.replace('Cars', 'SUVs');
      keywords.push('suv');
    } else if (searchSlug.includes('sedan')) {
      params.vehicleSubType = 'SEDAN';
      title = title.replace('Cars', 'Sedans');
      keywords.push('sedan');
    } else if (searchSlug.includes('hatchback')) {
      params.vehicleSubType = 'HATCHBACK';
      title = title.replace('Cars', 'Hatchbacks');
      keywords.push('hatchback');
    } else if (searchSlug.includes('scooter')) {
      params.vehicleSubType = 'SCOOTER';
      title = 'Scooters';
      keywords.push('scooter');
    } else if (searchSlug.includes('sports-bikes')) {
      params.vehicleSubType = 'SPORTS_BIKE';
      title = 'Sports Bikes';
      keywords.push('sports bike');
    } else if (searchSlug.includes('luxury')) {
      params.vehicleSubType = 'LUXURY';
      title = title.replace('Cars', 'Luxury Cars');
      keywords.push('luxury');
    }

    // Fuel type filters
    if (searchSlug.includes('electric')) {
      params.fuelType = 'ELECTRIC';
      keywords.push('electric', 'ev');
    } else if (searchSlug.includes('petrol')) {
      params.fuelType = 'PETROL';
      keywords.push('petrol');
    } else if (searchSlug.includes('diesel')) {
      params.fuelType = 'DIESEL';
      keywords.push('diesel');
    } else if (searchSlug.includes('cng')) {
      params.fuelType = 'CNG';
      keywords.push('cng');
    }

    // Inspection status
    if (searchSlug.includes('inspected') || searchSlug.includes('verified')) {
      params.avxInspected = true;
      title = `Reecomm Inspected ${isTwoWheeler ? 'Two-Wheelers' : 'Cars'}`;
      keywords.push('inspected', 'verified', 'quality checked');
    }

    // Brand and City extraction from buy-used-{brand}-cars-{city}
    const matchGeoBrand = searchSlug.match(/^buy-used-(.+?)-(cars|two-wheelers)(?:-(.+))?$/);
    if (matchGeoBrand) {
      const brandRaw = matchGeoBrand[1];
      const cityOrStateRaw = matchGeoBrand[3];

      if (brandRaw && !['suv', 'sedan', 'hatchback', 'luxury', 'electric', 'petrol', 'diesel', 'cng'].includes(brandRaw)) {
        params.makerName = toTitleCase(brandRaw);
        title = `${params.makerName} ${isTwoWheeler ? 'Two-Wheelers' : 'Cars'}`;
        keywords.push(brandRaw.replace(/-/g, ' '));
      }
      if (cityOrStateRaw && !cityOrStateRaw.startsWith('under-')) {
        params.city = toTitleCase(cityOrStateRaw);
        title += ` in ${params.city}`;
        keywords.push(cityOrStateRaw.replace(/-/g, ' '));
      }
    }

    return {
      id: `filter_${searchSlug.replace(/-/g, '_')}`,
      title: title,
      keywords: Array.from(new Set(keywords)),
      type: 'vehicle_filter',
      params: params
    };
  }

  return null;
}

/**
 * Fetch auto consultants / storefronts from backend API
 */
async function fetchAutoConsultants() {
  const consultants = [];
  try {
    const cleanApiUrl = API_BASE_URL.replace(/\/$/, '');
    let pageNo = 1;
    let totalPages = 1;

    console.log(`[Cron] Fetching auto consultants from ${cleanApiUrl}/homefeed/consultations/seo...`);

    while (pageNo <= totalPages) {
      const res = await fetch(`${cleanApiUrl}/homefeed/consultations/seo?pageNo=${pageNo}&size=100`);
      if (!res.ok) break;

      const data = await res.json();
      const list = data?.data || [];

      for (const store of list) {
        if (!store.username) continue;
        const title = store.consultationName || toTitleCase(store.username);

        const keywords = new Set([
          store.username.toLowerCase(),
          ...(title.toLowerCase().split(' ')),
          ...(store.cityName ? [store.cityName.toLowerCase()] : []),
          ...(store.stateName ? [store.stateName.toLowerCase()] : []),
          'consultant', 'auto consultant', 'dealer', 'storefront'
        ]);

        consultants.push({
          id: `consultant_${store.username}`,
          title: title,
          keywords: Array.from(keywords).filter(Boolean),
          type: 'consultant',
          params: {
            username: store.username
          }
        });
      }

      totalPages = data?.pageResponse?.totalPages || 1;
      pageNo++;
    }
    console.log(`[Cron] Successfully loaded ${consultants.length} auto-consultants.`);
  } catch (err) {
    console.warn('[Cron] Warning fetching auto consultants:', err.message);
  }
  return consultants;
}

/**
 * Fetch and extract <loc> URLs from a sitemap (local path or remote HTTP URL)
 */
async function fetchSitemapLocs(sitemapUrlOrPath) {
  const locs = [];
  try {
    let xmlContent = '';
    if (sitemapUrlOrPath.startsWith('http://') || sitemapUrlOrPath.startsWith('https://')) {
      const res = await fetch(sitemapUrlOrPath);
      if (!res.ok) return locs;
      xmlContent = await res.text();
    } else if (fs.existsSync(sitemapUrlOrPath)) {
      xmlContent = fs.readFileSync(sitemapUrlOrPath, 'utf8');
    } else {
      return locs;
    }

    const matches = xmlContent.match(/<loc>(.*?)<\/loc>/g) || [];
    for (const m of matches) {
      const u = m.replace(/<\/?loc>/g, '').trim();
      if (u) locs.push(u);
    }
  } catch (err) {
    console.warn(`[Cron] Warning reading ${sitemapUrlOrPath}:`, err.message);
  }
  return locs;
}

/**
 * Main sitemap index generator function
 */
async function generateSearchIndex() {
  console.log('[Cron] Generating search index from sitemaps, auto-consultants, and GEO + Brand suggestions...');

  const itemsMap = new Map();

  // 1. Pre-populate essential curated search filter items matching schema spec
  const defaultItems = [
    {
      id: 'used_cars_honda_city_ahmedabad',
      title: 'Honda City in Ahmedabad',
      keywords: ['honda', 'city', 'ahmedabad', 'sedan', 'used car'],
      type: 'vehicle_filter',
      params: {
        makerName: 'Honda',
        modelName: 'City',
        city: 'Ahmedabad',
        vehicleType: 'FOUR_WHEELER'
      }
    },
    {
      id: 'used_cars_suv_under_5_lakh',
      title: 'SUVs Under ₹5 Lakhs',
      keywords: ['suv', 'under 5 lakh', 'budget cars'],
      type: 'vehicle_filter',
      params: {
        vehicleSubType: 'SUV',
        maxPrice: 500000,
        vehicleType: 'FOUR_WHEELER'
      }
    },
    {
      id: 'reecomm_inspected_four_wheeler',
      title: 'Reecomm Inspected Cars',
      keywords: ['inspected', 'verified', 'quality checked'],
      type: 'vehicle_filter',
      params: {
        avxInspected: true,
        vehicleType: 'FOUR_WHEELER'
      }
    },
    {
      id: 'consultant_hannans_consultant',
      title: 'Hannans Consultant',
      keywords: ['hannan', 'consultant', 'dealer', 'storefront'],
      type: 'consultant',
      params: {
        username: 'hannans-consultant'
      }
    }
  ];

  for (const item of defaultItems) {
    itemsMap.set(item.id, item);
  }

  // 2. Fetch all registered Auto Consultants / Storefronts from Backend API
  const consultantItems = await fetchAutoConsultants();
  for (const item of consultantItems) {
    itemsMap.set(item.id, item);
  }

  // 3. Load GEO + Brand + Model search combinations from searchSuggestions.json
  try {
    const suggestionsPath = path.join(DATA_DIR, 'searchSuggestions.json');
    if (fs.existsSync(suggestionsPath)) {
      console.log('[Cron] Processing GEO and Brand suggestions from searchSuggestions.json...');
      const rawData = fs.readFileSync(suggestionsPath, 'utf8');
      const suggestions = JSON.parse(rawData);

      for (const item of suggestions) {
        if (!item.link) continue;
        const parsed = parseUrlPath(item.link);
        if (parsed) {
          if (item.brand) parsed.params.makerName = item.brand;
          if (item.model) parsed.params.modelName = item.model;
          if (item.label) parsed.title = item.label;

          const titleWords = parsed.title.toLowerCase().split(' ').filter(w => w.length > 1);
          parsed.keywords = Array.from(new Set([...(parsed.keywords || []), ...titleWords]));

          if (!itemsMap.has(parsed.id)) {
            itemsMap.set(parsed.id, parsed);
          }
        }
      }
    }
  } catch (err) {
    console.warn('[Cron] Warning processing searchSuggestions.json:', err.message);
  }

  // 4. Parse main public/sitemap.xml and all state XML files in public/sitemaps
  const sitemapsToProcess = [];

  const mainSitemapPath = path.join(PUBLIC_DIR, 'sitemap.xml');
  if (fs.existsSync(mainSitemapPath)) {
    sitemapsToProcess.push(mainSitemapPath);
  }

  const sitemapsDir = path.join(PUBLIC_DIR, 'sitemaps');
  if (fs.existsSync(sitemapsDir)) {
    const stateFiles = fs.readdirSync(sitemapsDir);
    for (const file of stateFiles) {
      if (file.endsWith('.xml')) {
        sitemapsToProcess.push(path.join(sitemapsDir, file));
      }
    }
  }

  for (const target of sitemapsToProcess) {
    const urls = await fetchSitemapLocs(target);
    for (const urlTag of urls) {
      if (urlTag.endsWith('.xml')) {
        const subUrls = await fetchSitemapLocs(urlTag);
        for (const subUrl of subUrls) {
          const item = parseUrlPath(subUrl);
          if (item && !itemsMap.has(item.id)) {
            itemsMap.set(item.id, item);
          }
        }
      } else {
        const item = parseUrlPath(urlTag);
        if (item && !itemsMap.has(item.id)) {
          itemsMap.set(item.id, item);
        }
      }
    }
  }

  const finalIndexItems = Array.from(itemsMap.values());

  if (!fs.existsSync(PUBLIC_DIR)) {
    fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(finalIndexItems, null, 2), 'utf8');
  console.log(`[Cron] Successfully generated search index with ${finalIndexItems.length} entries at ${OUTPUT_FILE}`);
  return finalIndexItems;
}

if (require.main === module) {
  generateSearchIndex()
    .catch(err => {
      console.error('[Cron] Error generating search index:', err);
      process.exit(1);
    });
}

module.exports = { generateSearchIndex, parseUrlPath };
