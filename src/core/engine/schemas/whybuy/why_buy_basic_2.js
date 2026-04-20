export const WHY_BUY_BASIC_2 = [
  {
    id: "why_buy_basic_2",
    type: "why_buy_theme_basic_2",
    data: {
      /* HERO */
      whyBuyHeroTitle: "Why Choose Adarsh Auto Consultants",
      whyBuyHeroDescription:
        "Buyers trust Adarsh Auto Consultants for transparent communication, reliable vehicle options, and a smooth buying experience. Our goal is to help every buyer make confident vehicle decisions with clear information and professional support.",
      /* CONSULTANT STORY */
      storyTitle: "Our Experience",
      storyDescription:
        "For over 12 years, Adarsh Auto Consultants has been helping buyers discover reliable vehicles across Gujarat.\n\nOur goal is to maintain a diverse vehicle inventory and provide accurate information so buyers can make confident decisions when purchasing their next vehicle.",
      /* VEHICLE SELECTION APPROACH */
      vehicleSelectionTitle: "Our Approach to Vehicle Selection",
      vehicleSelectionDescription:
        "Every vehicle listed through our storefront goes through a basic internal evaluation before being presented to buyers. This helps ensure that vehicles listed are suitable for serious buyers and provides a smoother vehicle buying experience.",
      /* HOW BUYING WORKS */
      processTitle: "How Buying Works",
      processDescription:
        "Buying a vehicle through our storefront is designed to be simple, transparent, and convenient for buyers.",
      processSteps: [
        {
          title: "Discover Vehicles",
          description:
            "Browse our inventory and shortlist vehicles that match your requirements.",
          icon: `<svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="currentColor"><path d="M480-80q-139-35-229.5-159.5T160-516v-244l320-120 320 120v244q0 152-90.5 276.5T480-80Zm0-84q104-33 172-132t68-220v-189l-240-90-240 90v189q0 121 68 220t172 132Zm0-316Z"/></svg>`,
        },
        {
          title: "Connect With Our Team",
          description:
            "Use AVX chat to discuss vehicle condition, pricing, and availability.",
          icon: `<svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="currentColor"><path d="M480-80q-139-35-229.5-159.5T160-516v-244l320-120 320 120v244q0 152-90.5 276.5T480-80Zm0-84q104-33 172-132t68-220v-189l-240-90-240 90v189q0 121 68 220t172 132Zm0-316Z"/></svg>`,
        },
        {
          title: "AVX Inspection Option",
          description:
            "Buyers can request AVX inspection to receive an independent condition report.",
          icon: `<svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="currentColor"><path d="M480-80q-139-35-229.5-159.5T160-516v-244l320-120 320 120v244q0 152-90.5 276.5T480-80Zm0-84q104-33 172-132t68-220v-189l-240-90-240 90v189q0 121 68 220t172 132Zm0-316Z"/></svg>`,
        },
        {
          title: "Decision & Purchase",
          description:
            "Once satisfied with the vehicle details and inspection, finalize the purchase directly with the consultant.",
          icon: `<svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="currentColor"><path d="M480-80q-139-35-229.5-159.5T160-516v-244l320-120 320 120v244q0 152-90.5 276.5T480-80Zm0-84q104-33 172-132t68-220v-189l-240-90-240 90v189q0 121 68 220t172 132Zm0-316Z"/></svg>`,
        },
      ],
      /* AVX INSPECTION */
      inspectionTitle: "AVX Inspection Assurance",
      inspectionText:
        "AVX inspection services provide additional transparency by documenting key aspects of the vehicle's condition before purchase.",
      inspectionPoints: [
        "Exterior condition check",
        "Interior condition check",
        "Visible mechanical components",
        "Photo & video documentation",
      ],
      /* CUSTOMER COMMITMENT */
      customerCommitmentTitle: "Customer Commitment",
      customerCommitmentDescription:
        "Our goal is to maintain transparent communication and assist buyers throughout the vehicle discovery and purchase process. We aim to provide honest guidance and reliable information for every buyer.",
      /* TESTIMONIALS */
      testimonialTitle: "Customer Experience",
      testimonials: [
        {
          name: "Rahul Patel",
          review:
            "Great experience buying my car here. The team explained everything clearly and helped me through the entire process.",
        },
        {
          name: "Amit Shah",
          review:
            "Transparent communication and good vehicle options. I appreciated the AVX inspection support.",
        },
        {
          name: "Priya Mehta",
          review:
            "Very professional service. They answered all my questions patiently and helped me find the right vehicle within my budget.",
        },
        {
          name: "Suresh Joshi",
          review:
            "Honest and transparent throughout the entire process. The AVX inspection gave me confidence in my purchase.",
        },
      ],
      featuredReviews: [],
    },
    rules: {
      whyBuyHeroTitle: { min: 10, max: 100 },
      whyBuyHeroDescription: { min: 50, max: 2000 },
      storyTitle: { min: 10, max: 100 },
      storyDescription: { min: 50, max: 2000 },
      vehicleSelectionTitle: { min: 10, max: 100 },
      vehicleSelectionDescription: { min: 50, max: 2000 },
      processTitle: { min: 10, max: 100 },
      processDescription: { min: 50, max: 2000 },
      inspectionTitle: { min: 10, max: 100 },
      inspectionText: { min: 50, max: 2000 },
      customerCommitmentTitle: { min: 10, max: 100 },
      customerCommitmentDescription: { min: 50, max: 2000 },
      testimonialTitle: { min: 10, max: 100 },
    },
    arrayRules: {
      processSteps: {
        title: { min: 5, max: 100 },
        description: { min: 10, max: 300 },
      },
      testimonials: {
        name: { min: 3, max: 50 },
        review: { min: 10, max: 300 },
      },
      inspectionPoints: {
        text: { min: 10, max: 200 },
      },
    },
  },
];
