export const ABOUT_PRO_1 = [
  {
    id: "about_pro_1",
    type: "about_us_theme_pro_1",
    data: {
      heroTitle: "Our Story Built for Buy & Selling a Vehicle",
      heroDescription: `<p>Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.
         Sapien platea nec urna ut est sed. Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.
         Sapien platea nec urna ut est sed. Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.
         Sapien platea nec urna ut est sed. Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.
         Sapien platea nec urna ut est sed. </p>`,
      heroTemplate1: {
        imageUrl:
          "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=90",
        id: 1,
      },
      // Mission
      missionTitle: "Our Mission",
      missionDesc: `<p>Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.Lorem ipsum dolor sit amet consectetur.</p>`,
      missionTemplate1: {
        imageUrl:
          "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?w=1200&q=80",
        id: 2,
      },
      // Vision
      visionTitle: "Our Vision",
      visionDesc: `<p>Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.Lorem ipsum dolor sit amet consectetur.</p>`,
      visionTemplate1: {
        imageUrl:
          "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=1200&q=80",
        id: 3,
      },
      // Stats
      aboutUsDescription:
        "<p>Empowering millions through innovation and trust.</p>",
      stats: [
        { number: 150, label: "Active Users Worldwide" },
        { number: 2, label: "Transactions Processed" },
        { number: 98, label: "Customer Satisfaction" },
        { number: 100, label: "Team Members" },
      ],
      // Services
      servicesTitle: "What We Do",
      servicesDesc: `<p>Enterprise-grade digital products designed to scale globally.</p>`,
      services: [
        {
          icon: `<svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="currentColor"><path d="M480-80q-139-35-229.5-159.5T160-516v-244l320-120 320 120v244q0 152-90.5 276.5T480-80Zm0-84q104-33 172-132t68-220v-189l-240-90-240 90v189q0 121 68 220t172 132Zm0-316Z"/></svg>`,
          title: "Secure Payments",
          desc: "PCI-DSS compliant global payment systems.",
        },
        {
          icon: `<svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="currentColor"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-40-360v-240h80v207l154 154-57 57-177-178Z"/></svg>`,
          title: "Global Infrastructure",
          desc: "99.99% uptime cloud deployment.",
        },
        {
          icon: `<svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="currentColor"><path d="M320-240 80-480l240-240 57 57-184 184 183 183-56 56Zm320 0-57-57 184-184-183-183 56-56 240 240-240 240Z"/></svg>`,
          title: "Growth Tools",
          desc: "Smart CRM, analytics and automation funnels.",
        },
        {
          icon: `<svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="currentColor"><path d="M300-360q-25 0-42.5-17.5T240-420v-40h60v40h60v-180h60v180q0 25-17.5 42.5T360-360h-60Zm220 0q-17 0-28.5-11.5T480-400v-40h60v20h80v-40H520q-17 0-28.5-11.5T480-500v-60q0-17 11.5-28.5T520-600h120q17 0 28.5 11.5T680-560v40h-60v-20h-80v40h100q17 0 28.5 11.5T680-460v60q0 17-11.5 28.5T640-360H520Z"/></svg>`,
          title: "AI Optimization",
          desc: "AI powered performance engines.",
        },
      ],
    },
    rules: {
      heroTitle: { min: 10, max: 100 },
      heroDescription: { min: 50, max: 500 },
      missionTitle: { min: 10, max: 40 },
      missionDesc: { min: 50, max: 300 },
      visionTitle: { min: 10, max: 40 },
      visionDesc: { min: 50, max: 300 },
      aboutUsDescription: { min: 50, max: 600 },
      servicesTitle: { min: 10, max: 50 },
      servicesDesc: { min: 50, max: 1000 },
      heroTemplate1: { min: 5, max: 2000 },
      missionTemplate1: { min: 5, max: 2000 },
      visionTemplate1: { min: 5, max: 2000 },
      customHeroImage1: { min: 5, max: 2000 },
      customMissionImage1: { min: 5, max: 2000 },
      customVisionImage1: { min: 5, max: 2000 },
    },
    arrayRules: {
      stats: {
        number: { min: 1, max: 3 },
        label: { min: 5, max: 100 },
      },
      services: {
        title: { min: 10, max: 100 },
        desc: { min: 50, max: 300 },
      },
    },
  },
];
