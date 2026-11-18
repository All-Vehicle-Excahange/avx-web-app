/**
 * Reecomm Press & Media Newsroom Data Layer
 * 
 * Structured CMS-ready model to power https://www.reecomm.com/press-media
 * New stories, interviews, videos, and podcasts can be added here without modifying UI components.
 */

export const PRESS_CATEGORIES = [
  "All",
  "Founder Stories",
  "Brand Features",
  "Interviews",
  "Press Releases",
  "Videos & Podcasts",
];

export const INITIAL_MEDIA_ENTRIES = [
  {
    id: "startup-times-anas-loriya",
    title:
      "Anas Loriya's Entrepreneurial Journey: Building Reecomm Around Real Problems in the Used Vehicle Market",
    slug: "anas-loriyas-entrepreneurial-journey-building-reecomm-around-real-problems-in-the-used-vehicle-market",
    category: "Founder Stories",
    publicationName: "Startup Times",
    publicationLogo: "/logos/startup-times.svg",
    coverImage: "/images/press/startup-times-feature.webp",
    shortDescription:
      "What started with recognising the everyday challenges of buying and selling pre-owned vehicles became the foundation of Reecomm. Explore Anas Loriya's entrepreneurial journey, the problems that inspired the platform and his vision for bringing technology, trust and digital opportunities to India's used-vehicle market.",
    publicationDate: "2026-04-12",
    readTime: "6 min read",
    externalUrl:
      "https://startuptimes.net/anas-loriyas-entrepreneurial-journey-building-reecomm-around-real-problems-in-the-used-vehicle-market",
    featured: true,
    displayOrder: 1,
    status: "published",
    badgeColor: "from-blue-500 to-indigo-600",
  },
  {
    id: "inc91-reecomm-digital-marketplace",
    title:
      "Reecomm Is Building a Digital Marketplace Around India's Independent Automobile Consultants",
    slug: "reecomm-is-building-a-digital-marketplace-around-indias-independent-automobile-consultants",
    category: "Brand Features",
    publicationName: "INC91",
    publicationLogo: "/logos/inc91.svg",
    coverImage: "/images/press/inc91-feature.webp",
    shortDescription:
      "Independent automobile consultants play an important role in India's pre-owned vehicle market. Discover how Reecomm is building a digital marketplace that helps consultants showcase inventory, connect with buyers and access tools such as vehicle inspections and enquiry management.",
    publicationDate: "2026-05-02",
    readTime: "5 min read",
    externalUrl:
      "https://www.inc91.com/reecomm-is-building-a-digital-marketplace-around-indias-independent-automobile-consultants",
    featured: false,
    displayOrder: 2,
    status: "published",
    badgeColor: "from-cyan-500 to-blue-600",
  },
];

export const RECOGNISED_PUBLICATIONS = [
  {
    id: "startup-times",
    name: "Startup Times",
    tagline: "India's Leading Startup & Entrepreneurship Media",
    badge: "Founder Story Feature",
    url: "https://startuptimes.net/anas-loriyas-entrepreneurial-journey-building-reecomm-around-real-problems-in-the-used-vehicle-market",
    highlight: "Anas Loriya's Journey",
    image: "/images/press/startup-times-feature.webp",
  },
  {
    id: "inc91",
    name: "INC91",
    tagline: "Spotlight on Emerging Business & Market Innovation",
    badge: "Marketplace Innovation",
    url: "https://www.inc91.com/reecomm-is-building-a-digital-marketplace-around-indias-independent-automobile-consultants",
    highlight: "Consultant Digital Storefronts",
    image: "/images/press/inc91-feature.webp",
  },
];

export const SOCIAL_UPDATES = [
  {
    id: "linkedin-official",
    platform: "LinkedIn",
    type: "Company Update",
    title: "Company news and founder updates",
    description:
      "Stay connected with Reecomm's business milestones, product launches, hiring, and leadership insights.",
    actionText: "Follow on LinkedIn",
    url: "https://www.linkedin.com/company/reecomm",
    accent: "bg-[#0A66C2]/15 text-[#0A66C2] border-[#0A66C2]/30",
  },
  {
    id: "instagram-community",
    platform: "Instagram",
    type: "Community & Brand",
    title: "Brand stories and community updates",
    description:
      "Visual behind-the-scenes, consultant spotlights, vehicle inspection journeys, and community highlights.",
    actionText: "Follow on Instagram",
    url: "https://www.instagram.com/reecommindia",
    accent: "bg-[#E4405F]/15 text-[#E4405F] border-[#E4405F]/30",
  },
  {
    id: "founder-note",
    platform: "Leadership",
    type: "Founder Update",
    title: "A Note from Our Founder",
    description:
      "Reflections on building trust, solving market friction, and scaling India's verified vehicle ecosystem.",
    actionText: "Read Story",
    url: "https://startuptimes.net/anas-loriyas-entrepreneurial-journey-building-reecomm-around-real-problems-in-the-used-vehicle-market",
    accent: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  },
  {
    id: "product-discovery",
    platform: "Product",
    type: "Product Update",
    title: "Building Better Vehicle Discovery",
    description:
      "How multi-point inspections, transparent specifications, and verified consultants change the buying experience.",
    actionText: "Explore Features",
    url: "/introducing-reecomm",
    accent: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  },
];

/**
 * Filter and sorting utilities
 */
export function getPublishedArticles(articles = INITIAL_MEDIA_ENTRIES) {
  return articles
    .filter((item) => item.status === "published")
    .sort((a, b) => (a.displayOrder || 99) - (b.displayOrder || 99));
}

export function getFeaturedArticle(articles = INITIAL_MEDIA_ENTRIES) {
  const published = getPublishedArticles(articles);
  const featured = published.find((item) => item.featured);
  return featured || published[0] || null;
}

export function getRegularArticles(articles = INITIAL_MEDIA_ENTRIES, featuredId = null) {
  const published = getPublishedArticles(articles);
  if (!featuredId) return published;
  return published.filter((item) => item.id !== featuredId);
}
