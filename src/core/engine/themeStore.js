import { ABOUT_BASIC_1 } from "./schemas/about/premium/about_premium_1";
import { ABOUT_PREMIUM_2 } from "./schemas/about/premium/about_premium_2";
import { ABOUT_BASIC_2 } from "./schemas/about/basic/about_basic_2";
import { ABOUT_BASIC_3 } from "./schemas/about/basic/about_basic_3";
import { ABOUT_PREMIUM_1 } from "./schemas/about/premium/about_premium_1";
import { ABOUT_PRO_1 } from "./schemas/about/pro/about_pro_1";
import { ABOUT_PRO_2 } from "./schemas/about/pro/about_pro_2";
import { ABOUT_PRO_3 } from "./schemas/about/pro/about_pro_3";
import { ABOUT_PREMIUM_3 } from "./schemas";

export const THEME_STORE = [
  {
    id: "about_basic_1",
    name: "Basic About Theme 1",
    type: "about_us_theme_basic_1",
    category: "about",
    thumbnail: "/About us-basic-1.webp",
    preview: "/About us-basic-1.webp",
    schema: ABOUT_BASIC_1,
  },
  {
    id: "about_basic_2",
    type: "about_us_theme_basic_2",
    name: "Basic About Theme 2",
    category: "about",
    thumbnail: "/About us-basic-1.webp",
    preview: "/About us-basic-1.webp",
    schema: ABOUT_BASIC_2,
  },
  {
    id: "about_basic_3",
    name: "Basic About Theme 3",
    type: "about_us_theme_basic_3",
    category: "about",
    thumbnail: "/About us-basic-1.webp",
    preview: "/About us-basic-1.webp",
    schema: ABOUT_BASIC_3,
  },

  {
    id: "about_pro_1",
    name: "Premium About Theme",
    type: "about_us_theme_pro_1",
    category: "about",
    thumbnail: "/About us-pro-1.webp",
    preview: "/About us-pro-1.webp",
    schema: ABOUT_PRO_1,
  },
  {
    id: "about_pro_2",
    name: "Premium About Theme 2",
    type: "about_us_theme_pro_2",
    category: "about",
    thumbnail: "/themes/about2/thumb.png",
    preview: "/themes/about2/full.png",
    schema: ABOUT_PRO_2,
  },
  {
    id: "about_pro_3",
    name: "Premium About Theme 3",
    type: "about_us_theme_pro_3",
    category: "about",
    thumbnail: "/themes/about2/thumb.png",
    preview: "/themes/about2/full.png",
    schema: ABOUT_PRO_3,
  },
  {
    id: "about_premium_1",
    name: "Premium About Theme",
    type: "about_us_theme_premium_1",
    category: "about",
    thumbnail: "/themes/premium/thumb.webp",
    preview: "/themes/premium/full.webp",
    schema: ABOUT_PREMIUM_1,
  },
  {
    id: "about_premium_2",
    name: "Premium About Theme",
    type: "about_us_theme_premium_2",
    category: "about",
    thumbnail: "/themes/premium/thumb.webp",
    preview: "/themes/premium/full.webp",
    schema: ABOUT_PREMIUM_2,
  },
  {
    id: "about_premium_3",
    name: "Premium About Theme",
    type: "about_us_theme_premium_3",
    category: "about",
    thumbnail: "/themes/premium/thumb.webp",
    preview: "/themes/premium/full.webp",
    schema: ABOUT_PREMIUM_3,
  },
];
