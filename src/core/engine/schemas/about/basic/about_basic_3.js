export const ABOUT_BASIC_3 = [
  {
    id: "about_basic_2",
    type: "about_us_theme_basic_3",
    data: {
      // ====== Hero Section Data ========
      heroTitle: "Our Story Built for Buy & Selling a Vehicle",
      heroDescription: `
      Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.
      Sapien platea nec urna ut est sed. Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.
      Sapien platea nec urna ut est sed. Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.
      Sapien platea nec urna ut est sed. Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.
      Sapien platea nec urna ut est sed. Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.
      Sapien platea nec urna ut est sed.
    `,
      // ====== Mission & Vision Section Data ========
      missionTitle: "Our Mission",
      missionDesc: `Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.`,
      visionTitle: "Our Vision",
      visionDesc: `Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.`,
      // ====== Stats Section Data ========
      statsDesc: `Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed. Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed. Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.`,
      stats: [
        { number: "150K+", label: "Active Users Worldwide" },
        { number: "$2B+", label: "Transactions Processed" },
        { number: "98%", label: "Customer Satisfaction" },
        { number: "100+", label: "Team Members" },
      ],
      // ====== Services Section Data ========
      servicesTitle: "What We Do",
      servicesDesc: `Enterprise-grade digital products designed to scale globally with security, speed and reliability.`,
      services: [
        {
          icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`,
          title: "Secure Payments",
          desc: "PCI-DSS compliant global payment systems.",
        },
        {
          icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>`,
          title: "Global Infrastructure",
          desc: "99.99% uptime cloud deployment in 12 regions.",
        },
        {
          icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>`,
          title: "Growth Tools",
          desc: "Smart CRM, analytics and automation funnels.",
        },
        {
          icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="15" x2="23" y2="15"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="15" x2="4" y2="15"></line></svg>`,
          title: "AI Optimization",
          desc: "AI powered performance & conversion engines.",
        },
      ],
    },
    rules: {
      heroTitle: { min: 10, max: 100 },
      heroDescription: { min: 50, max: 2000 },
      missionTitle: { min: 10, max: 100 },
      missionDesc: { min: 50, max: 2000 },
      visionTitle: { min: 10, max: 100 },
      visionDesc: { min: 50, max: 2000 },
      aboutUsDescription: { min: 50, max: 2000 },
      servicesTitle: { min: 10, max: 100 },
      servicesDesc: { min: 50, max: 2000 },
    },
    arrayRules: {
      stats: {
        number: { min: 1, max: 10 },
        label: { min: 5, max: 100 },
      },
      services: {
        title: { min: 5, max: 100 },
        desc: { min: 10, max: 300 },
      },
    },
  },
];
