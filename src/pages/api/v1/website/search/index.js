import fs from 'fs';
import path from 'path';
import { generateSearchIndex } from '@/scripts/generateSearchIndex';

const SEARCH_INDEX_PATH = path.join(process.cwd(), 'public', 'search_index.json');

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }

  try {
    let indexItems = [];

    if (fs.existsSync(SEARCH_INDEX_PATH)) {
      const fileData = fs.readFileSync(SEARCH_INDEX_PATH, 'utf8');
      indexItems = JSON.parse(fileData);
    } else {
      indexItems = await generateSearchIndex();
    }

    const stat = fs.existsSync(SEARCH_INDEX_PATH) ? fs.statSync(SEARCH_INDEX_PATH) : null;
    const mtimeMs = stat ? Math.floor(stat.mtimeMs) : Date.now();
    const etag = `"v1.0.0-${mtimeMs}"`;

    // Check If-None-Match header for 304 Not Modified
    if (req.headers['if-none-match'] === etag) {
      return res.status(304).end();
    }

    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.setHeader('ETag', etag);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

    return res.status(200).json(indexItems);
  } catch (error) {
    console.error('[API /api/v1/website/search/index] Error:', error);
    return res.status(500).json({ error: 'Failed to retrieve search index' });
  }
}
