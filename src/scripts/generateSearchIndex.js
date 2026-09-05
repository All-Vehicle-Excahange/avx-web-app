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
    const matchGeoBrand = searchSlug.match(/^buy-used-(?:(.+)-)?(cars|two-wheelers)(?:-(.+))?$/);
    if (matchGeoBrand) {
      const rawBrandModel = matchGeoBrand[1]
        ? matchGeoBrand[1].replace(/-/g, " ")
        : "";
      const cityOrStateRaw = matchGeoBrand[3];

      if (!rawBrandModel && cityOrStateRaw && !cityOrStateRaw.startsWith("under-")) {
        params.city = toTitleCase(cityOrStateRaw);
        title = `Used ${isTwoWheeler ? "Bikes" : "Cars"} in ${params.city}`;
        keywords.push(cityOrStateRaw.replace(/-/g, " "));
      } else if (rawBrandModel) {
        const matchedMaker = KNOWN_MAKERS.find((m) => rawBrandModel.startsWith(m));

        if (matchedMaker) {
          params.makerName = toTitleCase(matchedMaker);
          const remainingModel = rawBrandModel.slice(matchedMaker.length).trim();
          if (remainingModel) {
            params.modelName = toTitleCase(remainingModel);
          }

          title = `Used ${params.makerName}${params.modelName ? " " + params.modelName : ""} ${isTwoWheeler ? "Two-Wheelers" : "Cars"}`;
          keywords.push(matchedMaker);
          if (params.modelName) keywords.push(params.modelName.toLowerCase());
        } else if (
          !["suv", "sedan", "hatchback", "luxury", "electric", "petrol", "diesel", "cng"].includes(
            matchGeoBrand[1]
          )
        ) {
          params.makerName = toTitleCase(matchGeoBrand[1].replace(/-/g, " "));
          title = `Used ${params.makerName} ${isTwoWheeler ? "Two-Wheelers" : "Cars"}`;
          keywords.push(matchGeoBrand[1].replace(/-/g, " "));
        }

        if (cityOrStateRaw && !cityOrStateRaw.startsWith("under-")) {
          params.city = toTitleCase(cityOrStateRaw);
          title += ` in ${params.city}`;
          keywords.push(cityOrStateRaw.replace(/-/g, " "));
        }
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

function slugifySegment(value) {
  return String(value || '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function titleCaseFromSlug(slug) {
  return String(slug || '')
    .split('-')
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

function shortModelKeywords(modelName) {
  const full = String(modelName || '').toLowerCase().trim();
  if (!full) return [];
  const words = full.split(/\s+/).filter(Boolean);
  const out = new Set([full, words[0]].filter(Boolean));
  if (full.includes('santro')) {
    out.add('santro');
    out.add('used santro');
  }
  if (full.includes('creta')) {
    out.add('creta');
    out.add('creata');
    out.add('create');
    out.add('used creta');
  }
  return Array.from(out);
}

function pushFilterItem(items, seen, { slug, title, keywords, params }) {
  if (!slug || seen.has(slug)) return;
  seen.add(slug);
  items.push({
    id: `filter_${slug.replace(/-/g, '_')}`,
    title,
    keywords: Array.from(new Set((keywords || []).map((k) => String(k).toLowerCase()).filter(Boolean))),
    type: 'vehicle_filter',
    params: { ...params, slug },
  });
}

const FOCUS_CITIES = [
  'Ahmedabad', 'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata',
  'Pune', 'Jaipur', 'Surat', 'Rajkot', 'Vadodara', 'Palanpur', 'Lucknow', 'Indore',
  'Chandigarh', 'Gandhinagar', 'Visnagar', 'Kanodar', 'Siddhpur', 'Mehsana',
  'Chhota Udepur', 'Nashik', 'Bhopal', 'Patna', 'Ludhiana', 'Nagpur', 'Coimbatore',
  'Latur', 'Hansi', 'Agra',
];

const FOCUS_STATES = [
  'Maharashtra', 'Karnataka', 'Telangana', 'Gujarat', 'Tamil Nadu', 'West Bengal',
  'Punjab', 'Rajasthan', 'Uttar Pradesh', 'Haryana', 'Madhya Pradesh',
  'Andhra Pradesh', 'Kerala', 'Bihar',
];

const ALL_CAR_BRANDS = [
  'Ashok Leyland', 'Aston Martin', 'Audi', 'Bentley', 'BMW', 'Bugatti', 'Chevrolet',
  'Datsun', 'Ferrari', 'Fiat', 'Force Motors', 'Ford', 'Hindustan Motors', 'Honda',
  'Hyundai', 'ICML', 'Jaguar', 'Lamborghini', 'Land Rover', 'Mahindra', 'Maruti Suzuki',
  'Maserati', 'Maybach', 'Mercedes Benz', 'Mitsubishi', 'Nissan', 'Porsche', 'Premier',
  'Renault', 'Rolls Royce', 'Skoda', 'Ssangyong', 'Tata', 'Toyota', 'Volkswagen',
  'Volvo', 'Opel', 'Jeep', 'ISUZU', 'MG', 'Kia', 'Citroen', 'BYD',
];

const TWO_WHEELER_BRANDS = [
  'Hero', 'TVS', 'Bajaj', 'Royal Enfield', 'Yamaha', 'Ola', 'Honda', 'Suzuki', 'KTM', 'Ather',
];

const POPULAR_CAR_MODELS = [
  { brand: 'Hyundai', model: 'Grand i10', brandSlug: 'hyundai', modelSlug: 'grand-i10' },
  { brand: 'Hyundai', model: 'Creta', brandSlug: 'hyundai', modelSlug: 'creta' },
  { brand: 'Hyundai', model: 'i20', brandSlug: 'hyundai', modelSlug: 'i20' },
  { brand: 'Hyundai', model: 'Verna', brandSlug: 'hyundai', modelSlug: 'verna' },
  { brand: 'Hyundai', model: 'Santro Xing', brandSlug: 'hyundai', modelSlug: 'santro-xing' },
  { brand: 'Maruti Suzuki', model: 'Swift', brandSlug: 'maruti-suzuki', modelSlug: 'swift' },
  { brand: 'Maruti Suzuki', model: 'Baleno', brandSlug: 'maruti-suzuki', modelSlug: 'baleno' },
  { brand: 'Maruti Suzuki', model: 'Wagon R', brandSlug: 'maruti-suzuki', modelSlug: 'wagon-r' },
  { brand: 'Maruti Suzuki', model: 'Brezza', brandSlug: 'maruti-suzuki', modelSlug: 'brezza' },
  { brand: 'Mahindra', model: 'Thar', brandSlug: 'mahindra', modelSlug: 'thar' },
  { brand: 'Mahindra', model: 'Scorpio', brandSlug: 'mahindra', modelSlug: 'scorpio' },
  { brand: 'Tata', model: 'Nexon', brandSlug: 'tata', modelSlug: 'nexon' },
  { brand: 'Tata', model: 'Punch', brandSlug: 'tata', modelSlug: 'punch' },
  { brand: 'Toyota', model: 'Fortuner', brandSlug: 'toyota', modelSlug: 'fortuner' },
  { brand: 'Toyota', model: 'Innova', brandSlug: 'toyota', modelSlug: 'innova' },
  { brand: 'Ford', model: 'Ecosport', brandSlug: 'ford', modelSlug: 'ecosport' },
  { brand: 'Honda', model: 'City', brandSlug: 'honda', modelSlug: 'city' },
  { brand: 'Honda', model: 'Amaze', brandSlug: 'honda', modelSlug: 'amaze' },
  { brand: 'Kia', model: 'Seltos', brandSlug: 'kia', modelSlug: 'seltos' },
  { brand: 'Kia', model: 'Sonet', brandSlug: 'kia', modelSlug: 'sonet' },
];

/**
 * Generate Brand + Location & Brand + Model + Location combinations (cars + bikes separate).
 */
function generateBrandLocationCombinations() {
  const items = [];
  const seen = new Set();

  for (const brand of ALL_CAR_BRANDS) {
    const brandSlug = slugifySegment(brand);
    const brandLower = brand.toLowerCase();

    pushFilterItem(items, seen, {
      slug: `buy-used-${brandSlug}-cars`,
      title: `Used ${brand} Cars`,
      keywords: [
        brandLower, 'used car', `used ${brandLower}`, `used ${brandLower} cars`,
      ],
      params: { makerName: brand, vehicleType: 'FOUR_WHEELER' },
    });

    for (const city of FOCUS_CITIES) {
      const citySlug = slugifySegment(city);
      const cityLower = city.toLowerCase();
      pushFilterItem(items, seen, {
        slug: `buy-used-${brandSlug}-cars-${citySlug}`,
        title: `Used ${brand} Cars in ${city}`,
        keywords: [
          brandLower, cityLower, 'used car',
          `used ${brandLower} cars`,
          `used ${brandLower} in ${cityLower}`,
          `used ${brandLower} cars in ${cityLower}`,
          `used ${brandLower} near me`,
          `used ${brandLower} near ${cityLower}`,
          `second hand ${brandLower} ${cityLower}`,
        ],
        params: { makerName: brand, city, vehicleType: 'FOUR_WHEELER' },
      });
    }

    for (const state of FOCUS_STATES) {
      const stateSlug = slugifySegment(state);
      pushFilterItem(items, seen, {
        slug: `buy-used-${brandSlug}-cars-${stateSlug}`,
        title: `Used ${brand} Cars in ${state}`,
        keywords: [
          brandLower, state.toLowerCase(), 'used car',
          `used ${brandLower} in ${state.toLowerCase()}`,
          `used ${brandLower} cars in ${state.toLowerCase()}`,
        ],
        params: { makerName: brand, state, vehicleType: 'FOUR_WHEELER' },
      });
    }
  }

  for (const brand of TWO_WHEELER_BRANDS) {
    const brandSlug = slugifySegment(brand);
    const brandLower = brand.toLowerCase();
    pushFilterItem(items, seen, {
      slug: `buy-used-${brandSlug}-two-wheelers`,
      title: `Used ${brand} Bikes`,
      keywords: [brandLower, 'used bike', `used ${brandLower} bikes`],
      params: { makerName: brand, vehicleType: 'TWO_WHEELER' },
    });
    for (const city of FOCUS_CITIES) {
      const citySlug = slugifySegment(city);
      pushFilterItem(items, seen, {
        slug: `buy-used-${brandSlug}-two-wheelers-${citySlug}`,
        title: `Used ${brand} Bikes in ${city}`,
        keywords: [
          brandLower, city.toLowerCase(), 'used bike',
          `used ${brandLower} in ${city.toLowerCase()}`,
        ],
        params: { makerName: brand, city, vehicleType: 'TWO_WHEELER' },
      });
    }
    for (const state of FOCUS_STATES) {
      const stateSlug = slugifySegment(state);
      pushFilterItem(items, seen, {
        slug: `buy-used-${brandSlug}-two-wheelers-${stateSlug}`,
        title: `Used ${brand} Bikes in ${state}`,
        keywords: [
          brandLower, state.toLowerCase(), 'used bike',
          `used ${brandLower} in ${state.toLowerCase()}`,
        ],
        params: { makerName: brand, state, vehicleType: 'TWO_WHEELER' },
      });
    }
  }

  for (const { brand, model, brandSlug, modelSlug } of POPULAR_CAR_MODELS) {
    pushFilterItem(items, seen, {
      slug: `buy-used-${brandSlug}-${modelSlug}-cars`,
      title: `Used ${brand} ${model} Cars`,
      keywords: [
        brand.toLowerCase(), model.toLowerCase(), 'used car',
        `used ${brand.toLowerCase()} ${model.toLowerCase()}`,
        ...shortModelKeywords(model),
      ],
      params: { makerName: brand, modelName: model, vehicleType: 'FOUR_WHEELER' },
    });

    for (const city of FOCUS_CITIES) {
      const citySlug = slugifySegment(city);
      const cityLower = city.toLowerCase();
      const brandLower = brand.toLowerCase();
      const modelLower = model.toLowerCase();
      pushFilterItem(items, seen, {
        slug: `buy-used-${brandSlug}-${modelSlug}-cars-${citySlug}`,
        title: `Used ${brand} ${model} Cars in ${city}`,
        keywords: [
          brandLower,
          modelLower,
          cityLower,
          `used ${brandLower} ${modelLower}`,
          `used ${modelLower} in ${cityLower}`,
          `used ${brandLower} ${modelLower} in ${cityLower}`,
          `used ${modelLower} near me`,
          `used ${brandLower} near ${cityLower}`,
          `used ${brandLower} ${modelLower} near me`,
          `second hand ${modelLower} ${cityLower}`,
          ...shortModelKeywords(model),
          ...shortModelKeywords(model).map((k) => `${k} near me`),
        ],
        params: {
          makerName: brand,
          modelName: model,
          city,
          vehicleType: 'FOUR_WHEELER',
        },
      });
    }
  }

  return items;
}

/**
 * Inventory-driven landings from live SEO vehicles (exact listing GEO).
 */
async function fetchInventoryLandingItems() {
  const items = [];
  const seen = new Set();
  /** @type {Map<string, number>} slug → listing hits for popular-link ranking */
  const comboHits = new Map();
  const bump = (slug) => {
    if (!slug) return;
    comboHits.set(slug, (comboHits.get(slug) || 0) + 1);
  };
  try {
    const cleanApiUrl = normalizeApiBase(API_BASE_URL).replace(/\/$/, '');
    const endpoint = `${cleanApiUrl}/homefeed/vehicles/seo`;
    console.log(`[Cron] Fetching inventory landings from ${endpoint}...`);

    let pageNo = 1;
    let totalPages = 1;
    // Paginate until API exhausted; safety ceiling avoids runaway jobs
    const MAX_INVENTORY_PAGES = 500;
    while (pageNo <= totalPages && pageNo <= MAX_INVENTORY_PAGES) {
      const res = await fetch(`${endpoint}?pageNo=${pageNo}&size=100`);
      if (!res.ok) break;
      const data = await res.json();
      const list = data?.data || [];
      totalPages = data?.pageResponse?.totalPages || 1;

      for (const vehicle of list) {
        const brand = (vehicle.makerName || '').trim();
        const model = (vehicle.modelName || '').trim();
        const city = String(vehicle.cityName || vehicle.address?.city || '')
          .split(',')[0]
          .trim();
        const state = String(vehicle.stateName || vehicle.address?.state || '').trim();
        const brandSlug = slugifySegment(brand);
        const modelSlug = slugifySegment(model);
        const citySlug = slugifySegment(city);
        const stateSlug = slugifySegment(state);
        const isTwoWheeler = String(vehicle.vehicleType || '')
          .toUpperCase()
          .includes('TWO');
        const kind = isTwoWheeler ? 'two-wheelers' : 'cars';
        const unit = isTwoWheeler ? 'Bikes' : 'Cars';
        const unitLower = isTwoWheeler ? 'bike' : 'car';
        const vehicleType = isTwoWheeler ? 'TWO_WHEELER' : 'FOUR_WHEELER';
        if (!brandSlug) continue;

        const brandLower = brand.toLowerCase();
        const modelLower = model.toLowerCase();
        const cityLower = city.toLowerCase();
        const stateLower = state.toLowerCase();

        pushFilterItem(items, seen, {
          slug: `buy-used-${brandSlug}-${kind}`,
          title: `Used ${brand} ${unit}`,
          keywords: [
            brandLower, `used ${unitLower}`, `used ${brandLower}`,
            `used ${brandLower} ${unitLower}s`,
          ],
          params: { makerName: brand, vehicleType },
        });

        if (modelSlug) {
          pushFilterItem(items, seen, {
            slug: `buy-used-${brandSlug}-${modelSlug}-${kind}`,
            title: `Used ${brand} ${model} ${unit}`,
            keywords: [
              brandLower, modelLower, `used ${modelLower}`,
              `used ${brandLower} ${modelLower}`,
              ...shortModelKeywords(model),
            ],
            params: { makerName: brand, modelName: model, vehicleType },
          });
        }

        if (citySlug) {
          bump(`buy-used-cars-${citySlug}`);
          pushFilterItem(items, seen, {
            slug: `buy-used-${brandSlug}-${kind}-${citySlug}`,
            title: `Used ${brand} ${unit} in ${city}`,
            keywords: [
              brandLower, cityLower,
              `used ${brandLower} in ${cityLower}`,
              `used ${brandLower} ${unitLower}s in ${cityLower}`,
              `used ${brandLower} near me`,
              `used ${brandLower} near ${cityLower}`,
              `second hand ${brandLower} ${cityLower}`,
            ],
            params: { makerName: brand, city, vehicleType },
          });

          if (modelSlug) {
            const modelCitySlug = `buy-used-${brandSlug}-${modelSlug}-${kind}-${citySlug}`;
            bump(modelCitySlug);
            pushFilterItem(items, seen, {
              slug: modelCitySlug,
              title: `Used ${brand} ${model} in ${city}`,
              keywords: [
                brandLower, modelLower, cityLower,
                `used ${modelLower} in ${cityLower}`,
                `used ${brandLower} ${modelLower} in ${cityLower}`,
                `used ${modelLower} near me`,
                `used ${modelLower} near ${cityLower}`,
                `used ${brandLower} ${modelLower} near me`,
                `second hand ${modelLower} ${cityLower}`,
                ...shortModelKeywords(model).map((k) => `${k} in ${cityLower}`),
                ...shortModelKeywords(model).map((k) => `${k} near me`),
              ],
              params: {
                makerName: brand,
                modelName: model,
                city,
                vehicleType,
              },
            });
          }
        }

        if (stateSlug) {
          pushFilterItem(items, seen, {
            slug: `buy-used-${brandSlug}-${kind}-${stateSlug}`,
            title: `Used ${brand} ${unit} in ${state}`,
            keywords: [
              brandLower, stateLower,
              `used ${brandLower} in ${stateLower}`,
            ],
            params: { makerName: brand, state, vehicleType },
          });

          if (modelSlug) {
            pushFilterItem(items, seen, {
              slug: `buy-used-${brandSlug}-${modelSlug}-${kind}-${stateSlug}`,
              title: `Used ${brand} ${model} in ${state}`,
              keywords: [
                brandLower, modelLower, stateLower,
                `used ${modelLower} in ${stateLower}`,
                `used ${brandLower} ${modelLower} in ${stateLower}`,
                ...shortModelKeywords(model),
              ],
              params: {
                makerName: brand,
                modelName: model,
                state,
                vehicleType,
              },
            });
          }
        }
      }

      pageNo += 1;
    }

    console.log(`[Cron] Inventory landings loaded: ${items.length} unique entries.`);
  } catch (err) {
    console.warn('[Cron] Warning fetching inventory landings:', err.message);
  }
  return { items, comboHits };
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
        const cityLower = store.cityName ? String(store.cityName).toLowerCase() : "";
        const keywords = new Set([
          ...(cleanSlug ? [cleanSlug] : []),
          ...(title.toLowerCase().split(/\s+/).filter((w) => w && !/^\d+$/.test(w))),
          ...(cityLower ? [cityLower] : []),
          ...(store.stateName ? [String(store.stateName).toLowerCase()] : []),
          'consultant', 'auto consultant', 'dealer', 'storefront',
          ...(cityLower
            ? [
                `auto consultant ${cityLower}`,
                `used cars ${cityLower}`,
                `${title.toLowerCase()} used cars`,
                `${title.toLowerCase()} ${cityLower}`,
              ]
            : [`${title.toLowerCase()} used cars`]),
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

  // 2b. Inventory-driven brand/model/city/state landings from live SEO vehicles
  const { items: inventoryItems, comboHits } = await fetchInventoryLandingItems();
  for (const item of inventoryItems) {
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

  // Build inventory-driven popular links for home / hubs (ranked by live listing hits)
  try {
    const popularLinks = [];
    const seenHref = new Set();
    const pushLink = (label, href) => {
      if (!href || seenHref.has(href) || popularLinks.length >= 16) return;
      seenHref.add(href);
      popularLinks.push({ label, href });
    };

    pushLink("Used Cars in India", "/search/buy-used-cars");
    pushLink("Used Bikes for Sale", "/search/buy-used-two-wheelers");

    const rankedSlugs = [...comboHits.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([slug]) => slug);

    const modelCitySlugs = rankedSlugs.filter(
      (slug) =>
        /-cars-[a-z0-9-]+$/.test(slug) &&
        !slug.startsWith("buy-used-cars-") &&
        slug.includes("-cars-"),
    );
    for (const slug of modelCitySlugs.slice(0, 8)) {
      const item = finalIndexItems.find((i) => i.params?.slug === slug);
      const brand = item?.params?.makerName || "";
      const model = item?.params?.modelName || "";
      const city = item?.params?.city || "";
      pushLink(
        item?.title ||
          (brand && model && city
            ? `Used ${brand} ${model} in ${city}`
            : slug.replace(/^buy-used-/, "Used ").replace(/-/g, " ")),
        `/search/${slug}`,
      );
    }

    const cityHubSlugs = rankedSlugs.filter((slug) =>
      /^buy-used-cars-[a-z0-9-]+$/.test(slug),
    );
    for (const slug of cityHubSlugs.slice(0, 4)) {
      const item = finalIndexItems.find((i) => i.params?.slug === slug);
      const city = item?.params?.city || slug.replace("buy-used-cars-", "");
      pushLink(
        item?.title || `Used Cars in ${String(city).replace(/-/g, " ")}`,
        `/search/${slug}`,
      );
    }

    // Fallback: curated model×city if inventory was empty
    if (popularLinks.length < 6) {
      for (const item of finalIndexItems) {
        if (popularLinks.length >= 16) break;
        const slug = item.params?.slug;
        if (
          !slug ||
          !item.params?.makerName ||
          !item.params?.modelName ||
          !item.params?.city
        ) {
          continue;
        }
        pushLink(item.title || slug, `/search/${slug}`);
      }
    }

    const popularPath = path.join(PUBLIC_DIR, "seo_popular_links.json");
    if (!fs.existsSync(PUBLIC_DIR)) {
      fs.mkdirSync(PUBLIC_DIR, { recursive: true });
    }
    fs.writeFileSync(popularPath, JSON.stringify(popularLinks, null, 2), "utf8");
    console.log(`[Cron] Wrote ${popularLinks.length} popular SEO links to ${popularPath}`);
  } catch (popErr) {
    console.warn("[Cron] popular links write skipped:", popErr.message);
  }

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
