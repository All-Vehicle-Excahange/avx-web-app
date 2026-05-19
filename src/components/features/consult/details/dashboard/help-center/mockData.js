export const CATEGORIES = [
  { id: "storefront", title: "Storefront & Profile", icon: "Store", count: 6 },
  { id: "inventory", title: "Inventory & Listings", icon: "Box", count: 7 },
  { id: "inspection", title: "Inspection & Trust", icon: "ClipboardCheck", count: 4 },
  { id: "inquiries", title: "Inquiries & Chats", icon: "MessageSquare", count: 3 },
  { id: "ppc", title: "PPC & Boost", icon: "Zap", count: 2 },
  { id: "billing", title: "Billing & Wallet", icon: "CreditCard", count: 2 }
];

export const ARTICLES = [
  {
    id: "storefront-verify",
    categoryId: "storefront",
    categoryName: "Storefront & Profile",
    title: "How do I verify my storefront and get the Verified badge?",
    readTime: "2 min read",
    updatedDate: "12 May 2026",
    content: "Complete your KYC by uploading Aadhaar, PAN, and GST documents in Profile > KYC Documents. Once admin reviews and approves them, your Verified badge is activated within 24–48 hours. Verified storefronts get higher conversion rates and increased visibility on the search page.",
    relatedIds: ["trust-score"]
  },
  {
    id: "ppc-billing",
    categoryId: "ppc",
    categoryName: "PPC & Boost",
    title: "How does PPC billing work — CPC vs CPI?",
    readTime: "4 min read",
    updatedDate: "15 May 2026",
    content: "CPC (Cost Per Click) charges you per click on your ad. CPI (Cost Per Inquiry) charges only when a buyer submits an inquiry. Funds are deducted from your Reecomm Wallet. You can set daily budgets and pause campaigns anytime. Auto-recharge settings are also available in your Billing tab.",
    relatedIds: ["wallet-topup"]
  },
  {
    id: "low-performance",
    categoryId: "inventory",
    categoryName: "Inventory & Listings",
    title: 'My listing shows "Low Performance" — how do I fix it?',
    readTime: "3 min read",
    updatedDate: "08 May 2026",
    content: "Low Performance usually means low visibility or zero inquiries. Try: 1) Add more high-quality photos, 2) Get a Reecomm Inspection to boost trust score, 3) Enable a Boost campaign for weekend traffic, 4) Review your price against market comps in Analytics.",
    relatedIds: ["inspection-ranking"]
  },
  {
    id: "expired-inspection",
    categoryId: "inspection",
    categoryName: "Inspection & Trust",
    title: "What happens when my inspection expires (60+ days)?",
    readTime: "2 min read",
    updatedDate: "14 May 2026",
    content: "Expired inspections reduce listing visibility by up to 18% and lower your trust score. Schedule a re-inspection from the Inspection tab to restore visibility. Listings with fresh inspections convert 2.3× better.",
    relatedIds: ["inspection-ranking", "re-inspection-request"]
  },
  {
    id: "inspection-ranking",
    categoryId: "inspection",
    categoryName: "Inspection & Trust",
    title: "How inspection affects your ranking & visibility",
    readTime: "3 min read",
    updatedDate: "10 May 2026",
    content: `Reecomm uses a Trust Score (IQI) to determine how prominently your listings appear in search results and on the homepage. Vehicle inspections are the single biggest factor that improves this score.

How inspection boosts visibility:
1. Fresh inspection (0–30 days) — full visibility boost, shown as a verified badge on listing.
2. Aging inspection (31–60 days) — moderate visibility. Schedule re-inspection to stay fresh.
3. Expired inspection (60+ days) — visibility drops ~18%. Buyers see an "unverified" indicator.

Inspected vehicles receive on average +31% more inquiries and close 22% faster than non-inspected listings.

Re-inspection requests from buyers: Buyers can request a re-inspection via the listing page. You must approve the slot in the Inspection tab, then payment is collected before scheduling.`,
    relatedIds: ["re-inspection-request", "dispute-center", "trust-score"]
  },
  {
    id: "re-inspection-request",
    categoryId: "inspection",
    categoryName: "Inspection & Trust",
    title: "How to request a re-inspection",
    readTime: "2 min read",
    updatedDate: "11 May 2026",
    content: "You can request a re-inspection easily from the Inspection tab. Select your vehicle, choose a preferred slot, and complete the booking. An inspector will visit your location within 24 hours to re-inspect and update the trust score.",
    relatedIds: ["inspection-ranking", "expired-inspection"]
  },
  {
    id: "dispute-center",
    categoryId: "inspection",
    categoryName: "Inspection & Trust",
    title: "Understanding the Dispute & Issue Center",
    readTime: "3 min read",
    updatedDate: "05 May 2026",
    content: "If you disagree with an inspection report, you can file a dispute in the Dispute Center within 7 days. Provide details of the item in question (e.g. body panels, electricals) and supporting photos. Our moderation team will review and resolve the issue.",
    relatedIds: ["inspection-ranking", "re-inspection-request"]
  },
  {
    id: "trust-score",
    categoryId: "inspection",
    categoryName: "Inspection & Trust",
    title: "What is the Reecomm Trust Score (IQI)?",
    readTime: "3 min read",
    updatedDate: "01 May 2026",
    content: "The IQI (Inspection Quality Index) is a score between 0 and 100 calculated based on your vehicle's mechanical, electrical, and cosmetic condition. A higher score translates to a better search ranking and higher buyer confidence.",
    relatedIds: ["inspection-ranking", "dispute-center"]
  }
];

export const INITIAL_TICKETS = [
  {
    id: "RC-1042",
    subject: "Buyer re-inspection dispute — Audi A6 scratch",
    category: "Inspection",
    priority: "High",
    status: "Open",
    lastUpdated: "2h ago",
    createdDate: "May 18, 2026 at 9:41 AM",
    assignedTo: "Support Team",
    relatedVehicle: "Audi A6 (Listing #A6-221)",
    description: "Buyer Raj P. has flagged a scratch mismatch after the inspection. The inspection report (v2.1) shows the vehicle passed with 85/100 but buyer claims there is a scratch on the rear bumper not mentioned. I would like to review the inspection photos and mediate.",
    messages: [
      {
        sender: "user",
        senderName: "You",
        text: "Buyer Raj P. has flagged a scratch mismatch after the inspection. The report (v2.1) shows the vehicle passed with 85/100 but buyer claims there is a scratch on the rear bumper not mentioned. I would like admin to review the inspection photos and mediate.",
        time: "May 18, 2026 at 9:41 AM"
      },
      {
        sender: "admin",
        senderName: "Reecomm Support",
        text: "Thank you for raising this. We have retrieved the inspection report REC-INS-2381 and will compare the photo evidence. Expect a detailed response within 4 hours. In the meantime, please do not mark the vehicle as sold.",
        time: "May 18, 2026 at 11:22 AM"
      },
      {
        sender: "user",
        senderName: "You",
        text: "Understood. I have also attached 3 photos taken at delivery showing the rear bumper condition. Please see attachments.",
        time: "May 18, 2026 at 11:35 AM",
        attachments: ["bumper_left.jpg", "bumper_center.jpg", "delivery_note.pdf"]
      }
    ]
  },
  {
    id: "RC-1038",
    subject: "PPC campaign paused unexpectedly",
    category: "PPC & Boost",
    priority: "Medium",
    status: "In Progress",
    lastUpdated: "1d ago",
    createdDate: "May 17, 2026 at 10:15 AM",
    assignedTo: "Marketing Support",
    relatedVehicle: "BMW X1 (Listing #X1-002)",
    description: "My active PPC campaign for the BMW X1 was paused. I have sufficient wallet balance (over ₹3,000) and did not exceed the daily budget limit.",
    messages: [
      {
        sender: "user",
        senderName: "You",
        text: "My active PPC campaign for the BMW X1 was paused. I have sufficient wallet balance (over ₹3,000) and did not exceed the daily budget limit.",
        time: "May 17, 2026 at 10:15 AM"
      },
      {
        sender: "admin",
        senderName: "Reecomm Support",
        text: "Hello, we are checking this issue with our ad engine. There was a temporary synchronization issue with billing. We are working to resume your campaign shortly.",
        time: "May 17, 2026 at 2:00 PM"
      }
    ]
  },
  {
    id: "RC-1035",
    subject: "Storefront verification still showing 'Requested'",
    category: "Storefront",
    priority: "Low",
    status: "Awaiting Reply",
    lastUpdated: "2d ago",
    createdDate: "May 16, 2026 at 3:10 PM",
    assignedTo: "KYC Compliance Team",
    relatedVehicle: "None",
    description: "I uploaded my GST registration and PAN card details for storefront verification two days ago, but the status is still showing requested.",
    messages: [
      {
        sender: "user",
        senderName: "You",
        text: "I uploaded my GST registration and PAN card details for storefront verification two days ago, but the status is still showing requested.",
        time: "May 16, 2026 at 3:10 PM"
      },
      {
        sender: "admin",
        senderName: "Reecomm Support",
        text: "We noticed that the GST document you uploaded is missing the signature page. Please upload a signed copy of page 3 so we can complete your verification.",
        time: "May 17, 2026 at 11:00 AM"
      }
    ]
  },
  {
    id: "RC-1029",
    subject: "Wallet top-up not reflected in balance",
    category: "Billing",
    priority: "High",
    status: "Resolved",
    lastUpdated: "5d ago",
    createdDate: "May 13, 2026 at 11:00 AM",
    assignedTo: "Billing Team",
    relatedVehicle: "None",
    description: "I topped up ₹2,000 via UPI. The amount was debited from my bank but does not show in my Reecomm Wallet balance.",
    messages: [
      {
        sender: "user",
        senderName: "You",
        text: "I topped up ₹2,000 via UPI. The amount was debited from my bank but does not show in my Reecomm Wallet balance.",
        time: "May 13, 2026 at 11:00 AM"
      },
      {
        sender: "admin",
        senderName: "Reecomm Support",
        text: "We have verified the transaction with Razorpay. The amount has been credited to your wallet balance. We apologize for the delay.",
        time: "May 13, 2026 at 12:15 PM"
      }
    ]
  }
];
