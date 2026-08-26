const fs = require('fs');
const path = require('path');

const SITEMAP_URL = process.env.SITEMAP_URL || 'https://www.reecomm.com/sitemap.xml';
const API_BASE_URL =
  process.env.BACKEND_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  'https://api.reecomm.online/api/v1/website';
const PUBLIC_DIR = path.join(process.cwd(), 'public');
const DATA_DIR = path.join(process.cwd(), 'src', 'data');
const OUTPUT_FILE = path.join(PUBLIC_DIR, 'search_index.json');

function normalizeApiBase(url) {
  const clean = String(url || '').replace(/\/$/, '');
  if (clean.endsWith('/api/v1/website')) return clean;
  return `${clean}/api/v1/website`;
}

// List of known car & bike makers for accurate brand & model extraction
const KNOWN_MAKERS = [
  'ashok leyland', 'aston martin', 'audi', 'bentley', 'bmw', 'bugatti', 'chevrolet',
  'datsun', 'ferrari', 'fiat', 'force motors', 'ford', 'hindustan motors', 'honda',
  'hyundai', 'icml', 'jaguar', 'lamborghini', 'land rover', 'mahindra', 'maruti suzuki',
  'maserati', 'maybach', 'mercedes benz', 'mitsubishi', 'nissan', 'porsche', 'premier',
  'renault', 'rolls royce', 'san', 'skoda', 'ssangyong', 'tata', 'toyota', 'volkswagen',
  'volvo', 'opel', 'daewoo', 'jeep', 'isuzu', 'dc', 'subaru', 'chrysler', 'mg', 'kia',
  'bajaj', 'eicher', 'cadillac', 'citroen', 'byd', 'hero', 'tvs', 'royal enfield', 'yamaha', 'ola', 'suzuki', 'ktm', 'ather'
].sort((a, b) => b.length - a.length); // sort longest first for exact matching

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

  // 1. Consultant / Storefront Pages — skip URL-only rows (API supplies titles)
  if ((parts[0] === 'auto-consultant' || parts[0] === 'storefront') && parts[1]) {
    return null;
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

    // Brand and City extraction from buy-used-{brand/model}-cars-{city}
    const matchGeoBrand = searchSlug.match(/^buy-used-(.+?)-(cars|two-wheelers)(?:-(.+))?$/);
    if (matchGeoBrand) {
      const rawBrandModel = matchGeoBrand[1].replace(/-/g, ' ');
      const cityOrStateRaw = matchGeoBrand[3];

      // Match against known maker list
      const matchedMaker = KNOWN_MAKERS.find(m => rawBrandModel.startsWith(m));

      if (matchedMaker) {
        params.makerName = toTitleCase(matchedMaker);
        const remainingModel = rawBrandModel.slice(matchedMaker.length).trim();
        if (remainingModel) {
          params.modelName = toTitleCase(remainingModel);
        }

        title = `Used ${params.makerName}${params.modelName ? ' ' + params.modelName : ''} ${isTwoWheeler ? 'Two-Wheelers' : 'Cars'}`;
        keywords.push(matchedMaker);
        if (params.modelName) keywords.push(params.modelName.toLowerCase());
      } else if (!['suv', 'sedan', 'hatchback', 'luxury', 'electric', 'petrol', 'diesel', 'cng'].includes(matchGeoBrand[1])) {
        params.makerName = toTitleCase(matchGeoBrand[1]);
        title = `Used ${params.makerName} ${isTwoWheeler ? 'Two-Wheelers' : 'Cars'}`;
        keywords.push(matchGeoBrand[1].replace(/-/g, ' '));
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
      keywords: Array.from(new Set(keywords.map(k => String(k).toLowerCase()))),
      type: 'vehicle_filter',
      params: { ...params, slug: searchSlug }
    };
  }

  return null;
}

/**
 * Generate synthetic Brand + Location & Brand + Model + Location combinations
 */
function generateBrandLocationCombinations() {
  const items = [];
  const popularCities = [
    'Ahmedabad', 'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata',
    'Pune', 'Jaipur', 'Surat', 'Rajkot', 'Vadodara', 'Palanpur', 'Lucknow', 'Indore', 'Chandigarh'
  ];

  const topBrands = ['Kia', 'Hyundai', 'Maruti Suzuki', 'Honda', 'Tata', 'Toyota', 'Mahindra', 'BMW', 'Audi', 'Mercedes Benz', 'MG', 'Skoda', 'Volkswagen', 'Ford'];

  for (const brand of topBrands) {
    for (const city of popularCities) {
      const brandSlug = brand.toLowerCase().replace(/\s+/g, '-');
      const citySlug = city.toLowerCase().replace(/\s+/g, '-');
      const slug = `buy-used-${brandSlug}-cars-${citySlug}`;

      items.push({
        id: `filter_${slug.replace(/-/g, '_')}`,
        title: `Used ${brand} Cars in ${city}`,
        keywords: [brand.toLowerCase(), city.toLowerCase(), 'used car', `${brand.toLowerCase()} cars in ${city.toLowerCase()}`, `used ${brand.toLowerCase()} cars in ${city.toLowerCase()}`],
        type: 'vehicle_filter',
        params: {
          makerName: brand,
          city: city,
          vehicleType: 'FOUR_WHEELER',
          slug
        }
      });
    }
  }

  // Brand + Model + City combinations
  const popularCarModels = [
    { brand: "Hyundai", model: "Grand i10", brandSlug: "hyundai", modelSlug: "grand-i10" },
    { brand: "Hyundai", model: "Creta", brandSlug: "hyundai", modelSlug: "creta" },
    { brand: "Hyundai", model: "i20", brandSlug: "hyundai", modelSlug: "i20" },
    { brand: "Hyundai", model: "Verna", brandSlug: "hyundai", modelSlug: "verna" },
    { brand: "Maruti Suzuki", model: "Swift", brandSlug: "maruti-suzuki", modelSlug: "swift" },
    { brand: "Maruti Suzuki", model: "Baleno", brandSlug: "maruti-suzuki", modelSlug: "baleno" },
    { brand: "Maruti Suzuki", model: "Wagon R", brandSlug: "maruti-suzuki", modelSlug: "wagon-r" },
    { brand: "Maruti Suzuki", model: "Brezza", brandSlug: "maruti-suzuki", modelSlug: "brezza" },
    { brand: "Mahindra", model: "Thar", brandSlug: "mahindra", modelSlug: "thar" },
    { brand: "Mahindra", model: "Scorpio", brandSlug: "mahindra", modelSlug: "scorpio" },
    { brand: "Tata", model: "Nexon", brandSlug: "tata", modelSlug: "nexon" },
    { brand: "Tata", model: "Punch", brandSlug: "tata", modelSlug: "punch" },
    { brand: "Toyota", model: "Fortuner", brandSlug: "toyota", modelSlug: "fortuner" },
    { brand: "Toyota", model: "Innova", brandSlug: "toyota", modelSlug: "innova" },
    { brand: "Ford", model: "Ecosport", brandSlug: "ford", modelSlug: "ecosport" },
    { brand: "Honda", model: "City", brandSlug: "honda", modelSlug: "city" },
    { brand: "Honda", model: "Amaze", brandSlug: "honda", modelSlug: "amaze" },
    { brand: "Kia", model: "Seltos", brandSlug: "kia", modelSlug: "seltos" },
    { brand: "Kia", model: "Sonet", brandSlug: "kia", modelSlug: "sonet" },
  ];

  for (const { brand, model, brandSlug, modelSlug } of popularCarModels) {
    for (const city of popularCities) {
      const citySlug = city.toLowerCase().replace(/\s+/g, '-');
      const slug = `buy-used-${brandSlug}-${modelSlug}-cars-${citySlug}`;

      items.push({
        id: `filter_${slug.replace(/-/g, '_')}`,
        title: `Used ${brand} ${model} Cars in ${city}`,
        keywords: [
          brand.toLowerCase(),
          model.toLowerCase(),
          city.toLowerCase(),
          `used ${brand.toLowerCase()} ${model.toLowerCase()}`,
          `used ${brand.toLowerCase()} ${model.toLowerCase()} in ${city.toLowerCase()}`,
          `used ${brand.toLowerCase()} ${model.toLowerCase()} cars in ${city.toLowerCase()}`,
          // common misspellings for discovery
          ...(modelSlug === 'creta' ? ['creata', 'used creata', 'used creta'] : []),
        ],
        type: 'vehicle_filter',
        params: {
          makerName: brand,
          modelName: model,
          city: city,
          vehicleType: 'FOUR_WHEELER',
          slug
        }
      });
    }
  }

  return items;
}

/**
 * Fetch auto consultants / storefronts from backend API
 */
async function fetchAutoConsultants() {
  const consultants = [];
  const processedIds = [];
  try {
    const cleanApiUrl = normalizeApiBase(API_BASE_URL).replace(/\/$/, '');
    let pageNo = 1;
    let totalPages = 1;

    // Prefer full SEO list so titles/usernames stay complete (not only unsynced delta)
    let endpoint = `${cleanApiUrl}/homefeed/consultations/seo`;
    console.log(`[Cron] Fetching all auto consultants from ${endpoint}...`);

    let res = await fetch(`${endpoint}?pageNo=1&size=100`);
    if (!res.ok) {
      endpoint = `${cleanApiUrl}/homefeed/consultations/seo/unsynced`;
      console.log(`[Cron] Fallback unsynced consultants from ${endpoint}...`);
      res = await fetch(`${endpoint}?pageNo=1&size=100`);
    }

    while (pageNo <= totalPages) {
      if (pageNo > 1) {
        res = await fetch(`${endpoint}?pageNo=${pageNo}&size=100`);
      }
      if (!res.ok) break;

      const data = await res.json();
      const list = data?.data || [];

      for (const store of list) {
        if (!store.username) continue;
        if (store.id) processedIds.push(store.id);

        const title = StringUtilsHasText(store.consultationName)
          ? store.consultationName.trim()
          : humanizeConsultationTitle(store.username);

        // Search keywords: clean slug + name words only — never raw digit usernames
        const cleanSlug = stripTrailingDigits(store.username).toLowerCase();
        const keywords = new Set([
          ...(cleanSlug ? [cleanSlug] : []),
          ...(title.toLowerCase().split(/\s+/).filter((w) => w && !/^\d+$/.test(w))),
          ...(store.cityName ? [store.cityName.toLowerCase()] : []),
          ...(store.stateName ? [store.stateName.toLowerCase()] : []),
          'consultant', 'auto consultant', 'dealer', 'storefront'
        ]);

        const uniqueId = store.id ? `consultant_${store.id}` : `consultant_${store.username}`;

        consultants.push({
          id: uniqueId,
          title: title,
          keywords: Array.from(keywords).filter(Boolean),
          type: 'consultant',
          params: {
            username: store.username,
            ...(store.previousUsername ? { previousUsername: store.previousUsername } : {}),
            ...(store.id ? { consultationId: store.id } : {})
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

function StringUtilsHasText(s) {
  return typeof s === 'string' && s.trim().length > 0;
}

/** Strip trailing digit suffix from username (e.g. naammotors663505 → naammotors). */
function stripTrailingDigits(username) {
  return String(username || '').replace(/\d+$/, '').trim();
}

/** Display title from username without showing raw digit slug. */
function humanizeConsultationTitle(username) {
  if (!username) return 'Auto Consultant';
  const stripped = stripTrailingDigits(username).replace(/[-_]+/g, ' ').trim();
  return toTitleCase(stripped || username);
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
  console.log('[Cron] Generating search index from sitemaps, auto-consultants, Brand + Location combinations, and GEO suggestions...');

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
        vehicleType: 'FOUR_WHEELER',
        slug: 'buy-used-inspected-cars'
      }
    }
  ];

  for (const item of defaultItems) {
    itemsMap.set(item.id, item);
  }

  // 2. Add Brand + Location (e.g. Used Kia Cars in Ahmedabad)
  const brandGeoItems = generateBrandLocationCombinations();
  for (const item of brandGeoItems) {
    itemsMap.set(item.id, item);
  }

  // 3. Fetch all registered Auto Consultants / Storefronts from Backend API
  const consultantItems = await fetchAutoConsultants();
  const activeConsultantUsernames = new Set();
  const activeConsultantIds = new Set();

  for (const item of consultantItems) {
    if (item.params?.username) activeConsultantUsernames.add(item.params.username.toLowerCase());
    if (item.params?.consultationId) activeConsultantIds.add(item.params.consultationId);
  }

  // Remove any obsolete consultant entries from itemsMap (e.g. defaultItems or old username keys)
  for (const [key, val] of itemsMap.entries()) {
    if (val.type === 'consultant') {
      const u = val.params?.username ? val.params.username.toLowerCase() : '';
      const cId = val.params?.consultationId;
      if (key.startsWith('consultant_') || u) {
        if ((cId && !activeConsultantIds.has(cId)) || (u && !activeConsultantUsernames.has(u))) {
          itemsMap.delete(key);
        }
      }
    }
  }

  for (const item of consultantItems) {
    itemsMap.set(item.id, item);
  }

  // 4. Load GEO + Brand + Model search combinations from searchSuggestions.json
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
          // Skip obsolete consultant URLs if username isn't active in API
          if (parsed.type === 'consultant') {
            const u = parsed.params?.username?.toLowerCase();
            if (u && activeConsultantUsernames.size > 0 && !activeConsultantUsernames.has(u)) {
              continue;
            }
          }
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

  // 5. Parse main public/sitemap.xml and all state XML files in public/sitemaps
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
          if (item && item.type === 'consultant') {
            const u = item.params?.username?.toLowerCase();
            if (u && activeConsultantUsernames.size > 0 && !activeConsultantUsernames.has(u)) continue;
          }
          if (item && !itemsMap.has(item.id)) {
            itemsMap.set(item.id, item);
          }
        }
      } else {
        const item = parseUrlPath(urlTag);
        if (item && item.type === 'consultant') {
          const u = item.params?.username?.toLowerCase();
          if (u && activeConsultantUsernames.size > 0 && !activeConsultantUsernames.has(u)) continue;
        }
        if (item && !itemsMap.has(item.id)) {
          itemsMap.set(item.id, item);
        }
      }
    }
  }

  const finalIndexItems = Array.from(itemsMap.values());

  try {
    if (!fs.existsSync(PUBLIC_DIR)) {
      fs.mkdirSync(PUBLIC_DIR, { recursive: true });
    }
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(finalIndexItems, null, 2), 'utf8');
    console.log(`[Cron] Successfully generated search index with ${finalIndexItems.length} entries at ${OUTPUT_FILE}`);
  } catch (err) {
    console.warn(`[Cron] File write skipped (read-only filesystem): ${err.message}`);
  }
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
