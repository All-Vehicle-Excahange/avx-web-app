import { useState, Suspense } from "react";
import Head from "next/head";
import Layout from "@/components/layout/Layout";
import SearchHeader from "@/components/features/search/SearchHeader";
import SearchWithCard from "@/components/features/search/SearchWithCard";
import DownloadAppSection from "@/components/features/home/DownloadAppSection";
import Footer from "@/components/layout/Footer";
import FooterLink from "@/components/layout/FooterLink";
import ReletedToSearch from "@/components/features/search/ReletedToSearch";
import AutoConsualt from "@/components/features/search/AutoConsualt";
import ScrollDownArrow from "@/components/ui/ScrollDownArrow";
import ZeroInventoryFallback from "@/components/features/search/ZeroInventoryFallback";
import { MAKER_NAME_MAPPING } from "@/data/makers";

function SlugSearchPage({ seo, initialFilters }) {
  const [pageResponse, setPageResponse] = useState({
    totalElements: 0,
    totalPages: 0,
    currentPage: 1,
    currentElements: 0,
  });
  const [activeFilters, setActiveFilters] = useState([]);
  const [relatedVehicles, setRelatedVehicles] = useState([]);
  const [consultants, setConsultants] = useState([]);
  const [consultPayload, setConsultPayload] = useState(null);

  return (
    <>
      <Head>
        <title>{seo?.title || "Used Cars | Reecomm"}</title>
        <meta
          name="description"
          content={seo?.description || "Browse verified used vehicles for sale."}
        />
        {/* Dynamic Robots Tag (Tier A & B: index, follow | Tier C: noindex, follow) */}
        <meta name="robots" content={seo?.robots || "index, follow"} />

        {/* Canonical — each slug page gets its own unique canonical */}
        {seo?.canonical && (
          <link key="canonical" rel="canonical" href={seo.canonical} />
        )}

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Reecomm" />
        {seo?.canonical && <meta property="og:url" content={seo.canonical} />}
        <meta property="og:title" content={seo?.title || "Used Cars | Reecomm"} />
        <meta
          property="og:description"
          content={seo?.description || "Browse verified used vehicles for sale on Reecomm."}
        />
        <meta property="og:image" content="https://www.reecomm.com/logo/logo1.webp" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@reecomm" />
        <meta name="twitter:title" content={seo?.title || "Used Cars | Reecomm"} />
        <meta
          name="twitter:description"
          content={seo?.description || "Browse verified used vehicles for sale on Reecomm."}
        />
        <meta name="twitter:image" content="https://www.reecomm.com/logo/logo1.webp" />

        {/* Schema.org ItemList JSON-LD */}
        {seo?.schemaJsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(seo.schemaJsonLd) }}
          />
        )}
      </Head>
      <Suspense fallback={null}>
        <SearchContent
          seo={seo}
          initialFilters={initialFilters}
          pageResponse={pageResponse}
          setPageResponse={setPageResponse}
          activeFilters={activeFilters}
          setActiveFilters={setActiveFilters}
          relatedVehicles={relatedVehicles}
          setRelatedVehicles={setRelatedVehicles}
          consultants={consultants}
          setConsultants={setConsultants}
          consultPayload={consultPayload}
          setConsultPayload={setConsultPayload}
        />
      </Suspense>
    </>
  );
}

function SearchContent({
  seo,
  initialFilters,
  pageResponse,
  setPageResponse,
  activeFilters,
  setActiveFilters,
  relatedVehicles,
  setRelatedVehicles,
  consultants,
  setConsultants,
  consultPayload,
  setConsultPayload,
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [removeFilterHandler, setRemoveFilterHandler] = useState(null);

  return (
    <>
      <SearchHeader
        h1Title={seo?.h1Title}
        pageResponse={pageResponse}
        activeFilters={activeFilters}
        onRemoveFilter={removeFilterHandler}
      />

      <Layout>
        {!isLoading && pageResponse.totalElements === 0 && (
          <ZeroInventoryFallback
            brandName={initialFilters.brandName}
            modelName={initialFilters.model}
            cityName={initialFilters.cityName}
            stateName={initialFilters.stateName}
            vehicleType={initialFilters.vehicleType}
            fuelType={initialFilters.fuelType}
            bodyType={initialFilters.bodyType}
          />
        )}

        <SearchWithCard
          initialFilters={initialFilters}
          onPageResponseChange={setPageResponse}
          onFilterChange={setActiveFilters}
          onRemoveFilterHandlerChange={setRemoveFilterHandler}
          onRelatedChange={setRelatedVehicles}
          onConsultChange={setConsultants}
          onConsultPayloadChange={setConsultPayload}
          onLoadingChange={setIsLoading}
        />
      </Layout>

      <Layout>
        <ReletedToSearch data={relatedVehicles} loading={isLoading} />
      </Layout>
      <Layout>
        <AutoConsualt
          limit={4}
          data={consultants}
          filterPayload={consultPayload}
          loading={isLoading}
        />
      </Layout>

      <DownloadAppSection />
      <FooterLink />
      <Footer />
      <ScrollDownArrow />
    </>
  );
}

export async function getServerSideProps(context) {
  const { slug } = context.params;
  const initialFilters = {};

  const cleanSlug = Array.isArray(slug) ? slug.join("/") : slug;

  let vehicleType = "";
  let city = "";
  let details = cleanSlug;

  if (details.startsWith("buy-used-")) {
    details = details.slice("buy-used-".length);
  }

  if (details.includes("-two-wheelers")) {
    vehicleType = "two-wheelers";
    const parts = details.split("-two-wheelers");
    details = parts[0];
    city = parts[1] ? parts[1].replace(/^-/, "") : "";
  } else if (details.includes("-cars")) {
    vehicleType = "cars";
    const parts = details.split("-cars");
    details = parts[0];
    city = parts[1] ? parts[1].replace(/^-/, "") : "";
  } else if (details.endsWith("-two-wheelers")) {
    vehicleType = "two-wheelers";
    details = details.slice(0, -"-two-wheelers".length);
  } else if (details.endsWith("-cars")) {
    vehicleType = "cars";
    details = details.slice(0, -"-cars".length);
  }

  initialFilters.vehicleType = vehicleType === "two-wheelers" ? "two-wheelers" : "cars";

  let budgetFilter = null;
  let fuelTypeFilter = null;
  let transmissionFilter = null;
  let bodyTypeFilter = null;

  if (details.includes("under-3-lakhs")) {
    budgetFilter = "0-300000";
    details = details.replace("under-3-lakhs", "").replace(/^-+|-+$/g, "");
  } else if (details.includes("under-5-lakhs")) {
    budgetFilter = "0-500000";
    details = details.replace("under-5-lakhs", "").replace(/^-+|-+$/g, "");
  } else if (details.includes("under-10-lakhs")) {
    budgetFilter = "0-1000000";
    details = details.replace("under-10-lakhs", "").replace(/^-+|-+$/g, "");
  } else if (details.includes("under-15-lakhs")) {
    budgetFilter = "0-1500000";
    details = details.replace("under-15-lakhs", "").replace(/^-+|-+$/g, "");
  } else if (details.includes("under-50k")) {
    budgetFilter = "0-50000";
    details = details.replace("under-50k", "").replace(/^-+|-+$/g, "");
  } else if (details.includes("under-1-lakh")) {
    budgetFilter = "0-100000";
    details = details.replace("under-1-lakh", "").replace(/^-+|-+$/g, "");
  } else if (details.includes("under-2-lakh")) {
    budgetFilter = "0-200000";
    details = details.replace("under-2-lakh", "").replace(/^-+|-+$/g, "");
  }

  if (budgetFilter) {
    const [min, max] = budgetFilter.split("-");
    initialFilters.minBudget = parseInt(min);
    initialFilters.maxBudget = parseInt(max);
  }

  const detailsRaw = details.toLowerCase();
  if (detailsRaw.includes("petrol")) {
    fuelTypeFilter = "Petrol";
    details = details.replace("petrol", "").replace(/^-+|-+$/g, "");
  } else if (detailsRaw.includes("diesel")) {
    fuelTypeFilter = "Diesel";
    details = details.replace("diesel", "").replace(/^-+|-+$/g, "");
  } else if (detailsRaw.includes("cng")) {
    fuelTypeFilter = "CNG";
    details = details.replace("cng", "").replace(/^-+|-+$/g, "");
  } else if (detailsRaw.includes("electric")) {
    fuelTypeFilter = "Electric";
    details = details.replace("electric", "").replace(/^-+|-+$/g, "");
  }

  if (detailsRaw.includes("automatic")) {
    transmissionFilter = "Automatic";
    details = details.replace("automatic", "").replace(/^-+|-+$/g, "");
  } else if (detailsRaw.includes("manual")) {
    transmissionFilter = "Manual";
    details = details.replace("manual", "").replace(/^-+|-+$/g, "");
  }

  if (detailsRaw.includes("hatchback")) {
    bodyTypeFilter = "Hatchback";
    details = details.replace("hatchback", "").replace(/^-+|-+$/g, "");
  } else if (detailsRaw.includes("sedan")) {
    bodyTypeFilter = "Sedan";
    details = details.replace("sedan", "").replace(/^-+|-+$/g, "");
  } else if (detailsRaw.includes("suv")) {
    bodyTypeFilter = "SUV";
    details = details.replace("suv", "").replace(/^-+|-+$/g, "");
  } else if (detailsRaw.includes("muv")) {
    bodyTypeFilter = "MUV";
    details = details.replace("muv", "").replace(/^-+|-+$/g, "");
  } else if (detailsRaw.includes("luxury")) {
    bodyTypeFilter = "Luxury";
    details = details.replace("luxury", "").replace(/^-+|-+$/g, "");
  } else if (detailsRaw.includes("scooter")) {
    bodyTypeFilter = "scooter";
    details = details.replace("scooter", "").replace(/^-+|-+$/g, "");
  } else if (detailsRaw.includes("commuter-bikes")) {
    bodyTypeFilter = "commuter_bikes";
    details = details.replace("commuter-bikes", "").replace(/^-+|-+$/g, "");
  } else if (detailsRaw.includes("sports-bikes")) {
    bodyTypeFilter = "sports_bikes";
    details = details.replace("sports-bikes", "").replace(/^-+|-+$/g, "");
  } else if (detailsRaw.includes("cruiser-retro")) {
    bodyTypeFilter = "cruiser_retro";
    details = details.replace("cruiser-retro", "").replace(/^-+|-+$/g, "");
  } else if (detailsRaw.includes("adventure-touring")) {
    bodyTypeFilter = "adventure_touring";
    details = details.replace("adventure-touring", "").replace(/^-+|-+$/g, "");
  } else if (detailsRaw.includes("electric-2w")) {
    bodyTypeFilter = "electric_2w";
    details = details.replace("electric-2w", "").replace(/^-+|-+$/g, "");
  }

  if (fuelTypeFilter) {
    initialFilters.fuelType = fuelTypeFilter;
  }
  if (transmissionFilter) {
    initialFilters.transmission = transmissionFilter;
  }
  if (bodyTypeFilter) {
    initialFilters.bodyType = bodyTypeFilter;
  }

  let rawApiUrl = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_URL || "https://api.reecomm.online/api/v1/website";
  if (!rawApiUrl.startsWith("http")) {
    const backendHost = process.env.BACKEND_URL || "https://api.reecomm.online";
    rawApiUrl = `${backendHost.replace(/\/$/, "")}${rawApiUrl.startsWith("/") ? "" : "/"}${rawApiUrl}`;
  }
  const apiUrl = rawApiUrl.replace(/\/$/, "");

  // 1. Resolve City ID / State ID
  if (city) {
    const searchLocation = city.replace(/-/g, " ");
    initialFilters.cityName = searchLocation.charAt(0).toUpperCase() + searchLocation.slice(1);
    initialFilters.location = initialFilters.cityName;

    try {
      const cityRes = await fetch(`${apiUrl}/util/address/search-cities-states?searchText=${encodeURIComponent(searchLocation)}`);
      if (cityRes.ok) {
        const cityJson = await cityRes.json();
        const foundCity = cityJson?.data?.find(c => c.cityName.toLowerCase() === searchLocation.toLowerCase());
        if (foundCity) {
          initialFilters.cityId = foundCity.cityId;
          initialFilters.stateId = foundCity.stateId;
          initialFilters.cityName = foundCity.cityName;
          initialFilters.location = foundCity.cityName;
        } else {
          const foundState = cityJson?.data?.find(c => c.stateName.toLowerCase() === searchLocation.toLowerCase());
          if (foundState) {
            initialFilters.stateId = foundState.stateId;
            initialFilters.stateName = foundState.stateName;
            initialFilters.location = foundState.stateName;
            initialFilters.cityName = "";
          }
        }
      }
    } catch (e) {
      console.error("City/State resolution failed:", e);
    }
  }

  let brandName = "";
  let modelName = "";

  if (details) {
    const normalize = (s) => s.toLowerCase().replace(/[\s-]/g, "");
    const detailsNormalized = normalize(details);

    const TWO_WHEELER_MAKERS = {
      15005: "Bajaj",
      15010: "Hero",
      15017: "OLA",
      15019: "Royal Enfield",
      15021: "TVS",
      15024: "Yamaha",
    };
    const allMakers = { ...MAKER_NAME_MAPPING, ...TWO_WHEELER_MAKERS };
    const brandEntries = Object.entries(allMakers).sort((a, b) => b[1].length - a[1].length);
    const brandEntry = brandEntries.find(([id, name]) => {
      const nameNorm = normalize(name);
      return detailsNormalized === nameNorm || detailsNormalized.startsWith(nameNorm);
    });

    if (brandEntry) {
      const [id, name] = brandEntry;
      initialFilters.makerId = id;
      initialFilters.brandName = name;
      brandName = name;

      const nameNorm = normalize(name);
      if (detailsNormalized.length > nameNorm.length) {
        const slugPrefix = name.toLowerCase().replace(/\s+/g, "-");
        if (details.startsWith(slugPrefix + "-")) {
          modelName = details.slice(slugPrefix.length + 1);
        } else if (details.startsWith(slugPrefix)) {
          modelName = details.slice(slugPrefix.length);
        } else {
          modelName = details.replace(new RegExp(name.split(" ").join("|"), "gi"), "").replace(/^-+|-+$/g, "");
        }

        if (modelName) {
          const rawModelName = modelName.replace(/-/g, " ");
          initialFilters.model = rawModelName.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
        }
      }
    } else {
      brandName = details.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
      initialFilters.brandName = brandName;
    }
  }

  // 2. Fetch inventory count to determine SEO Tier (A, B, or C)
  let totalCount = 0;
  try {
    const filterPayload = {
      makerId: initialFilters.makerId ? parseInt(initialFilters.makerId) : undefined,
      cityId: initialFilters.cityId ? parseInt(initialFilters.cityId) : undefined,
      stateId: initialFilters.stateId ? parseInt(initialFilters.stateId) : undefined,
      fuelType: initialFilters.fuelType,
      minBudget: initialFilters.minBudget,
      maxBudget: initialFilters.maxBudget
    };
    const vtParam = initialFilters.vehicleType === "two-wheelers" ? "TWO_WHEELER" : "FOUR_WHEELER";
    const res = await fetch(`${apiUrl}/vehicle/filter/sections?pageNo=1&size=1&vehicleType=${vtParam}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(filterPayload)
    });
    if (res.ok) {
      const data = await res.json();
      totalCount = data?.pageResponse?.totalElements || (data?.data ? data.data.length : 0);
    }
  } catch (e) {
    console.error("SSR count check failed:", e.message);
  }

  const MAJOR_CITIES = ["ahmedabad", "mumbai", "delhi", "bangalore", "hyderabad", "chennai", "kolkata", "pune", "jaipur", "surat", "vadodara", "rajkot", "lucknow", "indore", "chandigarh", "nagpur", "palanpur"];
  const MAJOR_BRANDS = ["hyundai", "maruti suzuki", "honda", "toyota", "mahindra", "tata", "kia", "bmw", "audi", "mercedes benz", "mg", "skoda", "volkswagen", "bajaj", "hero", "royal enfield", "tvs", "yamaha"];

  const isStrategicCity = city && MAJOR_CITIES.includes(city.toLowerCase());
  const isStrategicBrand = brandName && MAJOR_BRANDS.includes(brandName.toLowerCase());
  const isCategoryLanding = !city && !brandName;

  let robots = "index, follow";
  let tier = "Tier A";

  if (totalCount === 0) {
    if (isStrategicCity || isStrategicBrand || isCategoryLanding) {
      robots = "index, follow";
      tier = "Tier B";
    } else {
      robots = "noindex, follow";
      tier = "Tier C";
    }
  }

  const brandPart = brandName ? `${brandName} ` : "";
  const resolvedModel = initialFilters.model || (modelName ? modelName.replace(/-/g, " ").split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ") : "");
  const modelPart = resolvedModel ? `${resolvedModel} ` : "";
  const cityPart = initialFilters.cityName ? ` in ${initialFilters.cityName}` : (initialFilters.stateName ? ` in ${initialFilters.stateName}` : "");

  let budgetPart = "";
  if (budgetFilter) {
    const [min, max] = budgetFilter.split("-");
    if (min === "0") {
      budgetPart = ` under ₹${parseInt(max) >= 100000 ? parseInt(max)/100000 + ' Lakhs' : max}`;
    } else {
      budgetPart = ` ₹${parseInt(min)/100000} - ₹${parseInt(max)/100000} Lakhs`;
    }
  }

  const vehicleWord = initialFilters.vehicleType === "two-wheelers" ? "Two Wheelers" : "Cars";
  const typeParts = [fuelTypeFilter, transmissionFilter, bodyTypeFilter ? bodyTypeFilter.charAt(0).toUpperCase() + bodyTypeFilter.slice(1) : ""].filter(Boolean);
  const typePart = typeParts.length > 0 ? `${typeParts.join(" ")} ` : "";

  const h1Title = `Used ${typePart}${brandPart}${modelPart}${vehicleWord} for Sale${cityPart}${budgetPart}`;
  const dynamicTitle = `Used ${typePart}${brandPart}${modelPart}${vehicleWord}${cityPart}${budgetPart} - Certified & Inspected | Reecomm`;
  const dynamicDescription = `Find verified used ${typePart.toLowerCase()}${brandPart}${modelPart}${vehicleWord.toLowerCase()} for sale${cityPart}${budgetPart}. 100% certified with multi-point inspection, warranty options, and direct seller deals on Reecomm.`;

  const schemaJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": h1Title,
    "url": `https://www.reecomm.com/search/${cleanSlug}`,
    "description": dynamicDescription
  };

  return {
    props: {
      seo: {
        title: dynamicTitle,
        description: dynamicDescription,
        h1Title: h1Title,
        canonical: `https://www.reecomm.com/search/${cleanSlug}`,
        schemaJsonLd: schemaJsonLd,
        robots: robots,
        tier: tier
      },
      initialFilters,
    },
  };
}

SlugSearchPage.fullWidth = true;
export default SlugSearchPage;
