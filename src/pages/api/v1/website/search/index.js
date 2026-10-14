import fs from 'fs';
import path from 'path';
import { generateSearchIndex } from '@/scripts/generateSearchIndex';

const SEARCH_INDEX_PATH = path.join(process.cwd(), 'public', 'search_index.json');

let cachedIndexItems = null;
let cachedMtimeMs = 0;

function getCachedIndex() {
  if (!fs.existsSync(SEARCH_INDEX_PATH)) return null;
  const stat = fs.statSync(SEARCH_INDEX_PATH);
  const mtimeMs = Math.floor(stat.mtimeMs);
  if (!cachedIndexItems || cachedMtimeMs !== mtimeMs) {
    const fileData = fs.readFileSync(SEARCH_INDEX_PATH, 'utf8');
    cachedIndexItems = JSON.parse(fileData);
    cachedMtimeMs = mtimeMs;
  }
  return { items: cachedIndexItems, mtimeMs };
}

function searchIndexItems(indexItems, queryStr, limit = 10) {
  if (!queryStr || typeof queryStr !== 'string') return [];
  const q = queryStr.toLowerCase().trim();
  if (q.length < 2) return [];

  const stopWords = new Set(['in', 'at', 'near', 'by', 'for', 'of', 'and', 'the', 'to', 'a', 'an']);
  const words = q.split(/\s+/).filter((w) => w && !stopWords.has(w));
  if (words.length === 0) return [];

  const isAskingBikes = /\b(bike|bikes|two[- ]?wheeler|two[- ]?wheelers|motorcycle|scooter)\b/i.test(q);
  const isAskingCars = /\b(car|cars|four[- ]?wheeler|four[- ]?wheelers|suv|sedan|hatchback)\b/i.test(q);

  const scored = [];

  for (const item of indexItems) {
    if (!item) continue;
    let score = 0;
    const title = (item.title || '').toLowerCase();
    const keywords = (item.keywords || []).map((k) => String(k).toLowerCase());
    const maker = (item.params?.makerName || '').toLowerCase();
    const model = (item.params?.modelName || '').toLowerCase();
    const city = (item.params?.city || '').toLowerCase();
    const slug = (item.params?.slug || '').toLowerCase();
    const isTwoWheeler = item.params?.vehicleType === 'TWO_WHEELER';

    // Vehicle type penalty / boost
    if (isAskingBikes) {
      if (isTwoWheeler) score += 300;
      else score -= 300;
    } else if (isAskingCars) {
      if (!isTwoWheeler) score += 300;
      else score -= 300;
    }

    // 1. Direct exact keyword match
    if (keywords.includes(q)) {
      score += 1500;
    } else if (keywords.some((k) => k === q || k.startsWith(q))) {
      score += 1000;
    } else if (keywords.some((k) => k.includes(q))) {
      score += 700;
    }

    // 2. Direct title match
    if (title === q) {
      score += 1200;
    } else if (title.startsWith(q)) {
      score += 800;
    } else if (title.includes(q)) {
      score += 600;
    }

    // 3. Maker and City combination
    if (maker && city) {
      const hasMaker = q.includes(maker);
      const hasCity = q.includes(city);
      if (hasMaker && hasCity) {
        score += 800;
        if (model && q.includes(model)) {
          score += 600;
        }
      }
    } else if (city && q.includes(city)) {
      if (!maker && !model) {
        score += 700;
      }
    }

    // 4. Token match across fields
    const allWordsMatched = words.every(
      (w) =>
        title.includes(w) ||
        keywords.some((k) => k.includes(w)) ||
        maker.includes(w) ||
        model.includes(w) ||
        city.includes(w) ||
        slug.includes(w)
    );
    if (allWordsMatched) {
      score += 400;
    }

    if (score > 200) {
      scored.push({ item, score });
    }
  }

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.item);
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }

  try {
    let indexData = getCachedIndex();
    let indexItems = indexData ? indexData.items : null;
    let mtimeMs = indexData ? indexData.mtimeMs : Date.now();

    if (!indexItems) {
      indexItems = await generateSearchIndex();
      cachedIndexItems = indexItems;
      cachedMtimeMs = Date.now();
      mtimeMs = cachedMtimeMs;
    }

    const rawQuery = req.query.query || req.query.q;
    const query = typeof rawQuery === 'string' ? rawQuery.trim() : '';

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

    // If query is provided, perform scored search and return formatted suggestions
    if (query) {
      const matchedItems = searchIndexItems(indexItems, query, 10);
      const formattedItems = matchedItems.map((item) => {
        const slug = item.params?.slug;
        const link = slug ? `/search/${slug}` : (item.link || '/search/buy-used-cars');
        const city = item.params?.city;
        return {
          id: item.id || slug || item.title,
          title: item.title,
          subtitle: city ? `${city} • Verified Vehicles` : 'Verified Vehicles',
          type: item.type === 'consultant' ? 'CONSULTATION' : 'VEHICLE',
          link,
          params: item.params,
        };
      });

      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.setHeader('Cache-Control', 'public, max-age=3600');
      return res.status(200).json({
        query,
        sections: formattedItems.length > 0 ? [
          {
            sectionTitle: 'Popular Searches',
            icon: 'search',
            items: formattedItems,
          },
        ] : [],
        items: formattedItems,
      });
    }

    // Default: Return full search index with ETag
    const etag = `"v1.0.0-${mtimeMs}"`;
    if (req.headers['if-none-match'] === etag) {
      return res.status(304).end();
    }

    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.setHeader('ETag', etag);

    return res.status(200).json(indexItems);
  } catch (error) {
    console.error('[API /api/v1/website/search/index] Error:', error);
    return res.status(500).json({ error: 'Failed to retrieve search index' });
  }
}

