export default function imageKitLoader({ src, width, quality }) {
  // If it's a relative/local asset (e.g. /empty2.svg, /logo.png), serve it directly
  // We append ?w=width as a dummy parameter to satisfy Next.js's check that the loader implements width.
  if (src.startsWith('/')) {
    return `${src}?w=${width}`;
  }

  // If it's a full S3 URL, extract the path key
  let path = src;
  const s3UrlPattern = /https?:\/\/[^\/]+\.s3\.[^\/]+\.amazonaws\.com\//;
  if (s3UrlPattern.test(src)) {
    path = src.replace(s3UrlPattern, '');
  } else if (src.startsWith('http://') || src.startsWith('https://')) {
    // If it's another external domain, return it as-is with a dummy parameter to satisfy Next.js's check
    return `${src}${src.includes('?') ? '&' : '?'}w=${width}`;
  }

  // Build the ImageKit transformation parameters
  const params = [`w-${width}`, `q-${quality || 75}`, 'f-auto'];
  const endpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || '/cdn-image';
  const cleanEndpoint = endpoint.replace(/\/$/, '');
  return `${cleanEndpoint}/${path}?tr=${params.join(',')}`;
}
