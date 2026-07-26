import { generateSearchIndex } from '@/scripts/generateSearchIndex';

/**
 * Cron API Handler: GET /api/cron/generate-search-index
 *
 * Triggered automatically by Cron providers (e.g. Vercel Cron, GitHub Actions, Linux Crontab)
 * to regenerate search_index.json periodically (e.g. daily at 2:00 AM UTC `0 2 * * *`).
 */
export default async function handler(req, res) {
  // Optional security check for CRON_SECRET if configured in environment
  const authHeader = req.headers.authorization;
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized cron trigger' });
  }

  try {
    const items = await generateSearchIndex();
    return res.status(200).json({
      success: true,
      message: `Search index generated successfully with ${items.length} items`,
      totalEntries: items.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('[Cron API Error]:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to generate search index'
    });
  }
}
