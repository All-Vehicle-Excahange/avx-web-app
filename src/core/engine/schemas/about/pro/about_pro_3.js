export const ABOUT_PRO_3 = [
  {
    id: "about_pro_3",
    type: "about_us_theme_pro_3",
    data: {
      // ====== Hero Section Data ========
      aboutHeroTitle: "Our Story Built for Buy & Selling a Vehicle",
      aboutHeroDescription: ` Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.
        Sapien platea nec urna ut est sed. Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.
        Sapien platea nec urna ut est sed. `,
      aboutHeroTemplate1: { id: 1, imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600&q=80" },
      // ====== Mission & Vision Section Data ========
      aboutMissionTitle: "Our Mission",
      aboutMissionDescription: `Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.`,
      aboutMissionTemplate1: { id: 1, imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80" },
      aboutVisionTitle: "Our Vision",
      aboutVisionDescription: `Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.`,
      aboutVisionTemplate1: { id: 1, imageUrl: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80" },
      // ====== Stats Section Data ========
      aboutStatsDescription: `Lorem ipsum dolor sit amet consectetur.`,
      stats: [
        { number: "150K+", label: "Active Users Worldwide" },
        { number: "$2B+", label: "Transactions Processed" },
        { number: "98%", label: "Customer Satisfaction" },
        { number: "100+", label: "Team Members" },
      ],
      // ====== Services Section Data ========
      aboutServicesTitle: "What We Do",
      aboutServicesDescription: `Enterprise-grade digital products designed to scale globally with security, speed and reliability.`,
      services: [
        {
          icon: "ShieldCheck",
          title: "Secure Payments",
          desc: "PCI-DSS compliant global payment systems.",
        },
        {
          icon: "Globe",
          title: "Global Infrastructure",
          desc: "99.99% uptime cloud deployment in 12 regions.",
        },
        {
          icon: "TrendingUp",
          title: "Growth Tools",
          desc: "Smart CRM, analytics and automation funnels.",
        },
        {
          icon: "Cpu",
          title: "AI Optimization",
          desc: "AI powered performance & conversion engines.",
        },
      ],
    },
    rules: {
      aboutHeroTitle: { min: 10, max: 40 },
      aboutHeroDescription: { min: 50, max: 500 },
      aboutMissionTitle: { min: 10, max: 40 },
      aboutMissionDescription: { min: 50, max: 300 },
      aboutVisionTitle: { min: 10, max: 40 },
      aboutVisionDescription: { min: 50, max: 300 },
      aboutStatsDescription: { min: 50, max: 2000 },
      aboutServicesTitle: { min: 10, max: 40 },
      aboutServicesDescription: { min: 50, max: 600 },
      aboutHeroTemplate1: { min: 5, max: 2000 },
      aboutMissionTemplate1: { min: 5, max: 2000 },
      aboutVisionTemplate1: { min: 5, max: 2000 },
      customHeroImage1: { min: 5, max: 2000 },
      customMissionImage1: { min: 5, max: 2000 },
      customVisionImage1: { min: 5, max: 2000 },
    },
    arrayRules: {
      stats: {
        number: { min: 1, max: 3 },
        label: { min: 5, max: 25 },
      },
      services: {
        title: { min: 5, max: 30 },
        desc: { min: 10, max: 60 },
      },
    },
  },
];
