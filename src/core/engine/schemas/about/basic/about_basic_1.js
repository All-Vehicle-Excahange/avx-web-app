import { Cpu, Globe, ShieldCheck, TrendingUp } from "lucide-react";

export const ABOUT_BASIC_1 = [
  {
    id: "about_basic_1",
    type: "about_us_theme_basic_1",
    data: {
      heroTitle: "Our Story Built for",
      heroDescription: ` Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.
              Sapien platea nec urna ut est sed. Lorem ipsum dolor sit amet
              consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est
              sed. Lorem ipsum dolor sit amet consectetur. Odio at dolor ut
              donec. Sapien platea nec urna ut est sed. Lorem ipsum dolor sit
              amet consectetur. Odio at dolor ut donec. Sapien platea nec urna
              ut est sed.`,

      missionTitle: "Our Mission",
      missionDesc: `
      <p>
      Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.Lorem ipsum dolor sit amet consectetur. 
      </p>
    `,
      visionTitle: "Our Vision",
      visionDesc: `
      <p>
       Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.Lorem ipsum dolor sit amet consectetur.
      </p>
    `,
      aboutUsDescription: `
      <p>
        Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.
        Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.
        Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.
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
            Enterprise-grade digital products designed to scale globally with security,
            speed and reliability.
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
