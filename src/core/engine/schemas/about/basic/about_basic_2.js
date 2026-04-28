export const ABOUT_BASIC_2 = [
  {
    id: "about_basic_2",
    type: "about_us_theme_basic_2",
    data: {
      heroTitle: "Our Story Built for Buy & Selling a Vehicle",
      heroDescription: `Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.
    Sapien platea nec urna ut est sed. Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.
    Sapien platea nec urna ut est sed. Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.
    Sapien platea nec urna ut est sed. Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.
    Sapien platea nec urna ut est sed. Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.
    Sapien platea nec urna ut est sed.`,
      missionTitle: "Our Mission",
      missionDesc: `
    <p>
      Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.
      Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.
      Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.
      Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Lorem ipsum dolor sit amet consectetur.
      Odio at dolor ut donec. Sapien platea nec urna ut est sed. Lorem ipsum dolor sit amet consectetur.
      Odio at dolor ut donec. Sapien platea nec
    </p>
  `,
      visionTitle: "Our Vision",
      visionDesc: `
    <p>
      Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.
      Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.
      Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.
      Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Lorem ipsum dolor sit amet consectetur.
      Odio at dolor ut donec. Sapien platea nec urna ut est sed. Lorem ipsum dolor sit amet consectetur.
      Odio at dolor ut donec. Sapien platea nec
    </p>
  `,
      stats: [
        { number: "150K+", label: "Active Users Worldwide" },
        { number: "$2B+", label: "Transactions Processed" },
        { number: "98%", label: "Customer Satisfaction" },
        { number: "100+", label: "Team Members" },
      ],
      servicesTitle: "What We Do",
      servicesDesc: `
    <p>
      Enterprise-grade digital products designed to scale globally with security, speed and reliability.
    </p>
  `,
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
      heroTitle: { min: 10, max: 40 },
      heroDescription: { min: 50, max: 400 },
      missionTitle: { min: 10, max: 40 },
      missionDesc: { min: 50, max: 300 },
      visionTitle: { min: 10, max: 40 },
      visionDesc: { min: 50, max: 300 },
      aboutUsDescription: { min: 50, max: 500 },
      servicesTitle: { min: 10, max: 40 },
      servicesDesc: { min: 50, max: 300 },
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
