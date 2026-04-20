export const WHY_BUY_BASIC_1 = [
  {
    id: "why_buy_basic_1",
    type: "why_buy_theme_basic_1",
    data: {
      whyBuyHeroTitle: "Why Choose Adarsh Auto Consultants",
      whyBuyHeroDescription:
        "Buyers trust Adarsh Auto Consultants for transparent communication, reliable vehicle options, and a smooth buying experience. Our goal is to help every buyer make confident vehicle decisions with clear information and professional support.",

      storyTitle: "Our Experience",
      storyDescription: `For over 12 years, Adarsh Auto Consultants has been helping buyers discover reliable vehicles across Gujarat.

Our goal is to maintain a diverse vehicle inventory and provide accurate information so buyers can make confident decisions when purchasing their next vehicle.`,

      vehicleSelectionTitle: "Our Approach to Vehicle Selection",
      vehicleSelectionDescription:
        "Every vehicle listed through our storefront goes through a basic internal evaluation before being presented to buyers. This helps ensure that vehicles listed are suitable for serious buyers and provides a smoother vehicle buying experience.",

      processTitle: "How Buying Works",
      processDescription:
        "Buying a vehicle through our storefront is designed to be simple, transparent, and convenient for buyers.",

      processSteps: [
        {
          title: "Discover Vehicles",
          description:
            "Browse our inventory and shortlist vehicles that match your requirements.",
          icon: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>`,
        },
        {
          title: "Connect With Our Team",
          description:
            "Use AVX chat to discuss vehicle condition, pricing, and availability.",
          icon: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M240-400h320v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z"/></svg>`,
        },
        {
          title: "AVX Inspection Option",
          description:
            "Buyers can request AVX inspection to receive an independent condition report.",
          icon: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-80q-139-35-229.5-159.5T160-516v-244l320-120 320 120v244q0 152-90.5 276.5T480-80Zm0-84q104-33 172-132t68-220v-189l-240-90-240 90v189q0 121 68 220t172 132Zm0-316Zm-76 112 198-198-57-56-141 142-70-71-57 56 127 127Z"/></svg>`,
        },
        {
          title: "Decision & Purchase",
          description:
            "Once satisfied with the vehicle details and inspection, finalize the purchase directly with the consultant.",
          icon: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-80q-50 0-85-35t-35-85q0-7 1-14.5t3-13.5L131-462q-16-16-16-38t16-38l68-68q16-16 38-16t38 16l113 113q14-36 43-62t67-36v-235q0-33 23.5-56.5T480-880q33 0 56.5 23.5T560-800v235q38 10 67 36t43 62l113-113q16-16 38-16t38 16l68 68q16-16 16 38t-16 38L616-228q2 6 3 13.5t1 14.5q0 50-35 85t-85 35Zm0-240q33 0 56.5-23.5T560-400q0-33-23.5-56.5T480-480q-33 0-56.5 23.5T400-400q0 33 23.5 56.5T480-320ZM237-567l113 113q5 5 7.5 11t2.5 12q0 6-2.5 12t-7.5 11q-16 16-38 16t-38-16L161-531l76-36Zm486 0-76 36-113-113q-5-5-7.5-11t-2.5-12q0-6 2.5-12t7.5-11q16-16 38-16t38 16l113 113ZM480-720v-80 80Zm0 520q17 0 28.5-11.5T520-240q0-17-11.5-28.5T480-280q-17 0-28.5 11.5T440-240q0 17 11.5 28.5T480-200Z"/></svg>`,
        },
      ],

      inspectionTitle: "AVX Inspection Assurance",
      inspectionText:
        "AVX inspection services provide additional transparency by documenting key aspects of the vehicle's condition before purchase.",
      inspectionPoints: [
        "Exterior condition check",
        "Interior condition check",
        "Visible mechanical components",
        "Photo & video documentation",
      ],

      customerCommitmentTitle: "Customer Commitment",
      customerCommitmentDescription:
        "Our goal is to maintain transparent communication and assist buyers throughout the vehicle discovery and purchase process. We aim to provide honest guidance and reliable information for every buyer.",

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
