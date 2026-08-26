import { useState, Suspense, useEffect, useRef } from "react";
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
import { MAKER_NAME_MAPPING } from "@/data/makers";
import { event } from "@/lib/fpixel";
import {
  buildSearchLandingSeo,
  canonicalizeSearchSlug,
} from "@/lib/searchLandingSeo";

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

  const trackedSearchRef = useRef(null);

  useEffect(() => {
    const query =
      seo?.title ||
      initialFilters?.searchQuery ||
      initialFilters?.slug ||
      "Used Cars";
    if (query && trackedSearchRef.current !== query) {
      trackedSearchRef.current = query;
      event("Search", {
        search_string: query,
      });
    }
  }, [seo?.title, initialFilters]);

  return (
    <>
      <Head>
        <title>{seo?.title || "Used Cars | Reecomm"}</title>
        <meta
          name="description"
          content={seo?.description || "Browse verified used vehicles for sale."}
        />
        {seo?.canonical && (
          <link key="canonical" rel="canonical" href={seo.canonical} />
        )}

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Reecomm" />
        {seo?.canonical && <meta property="og:url" content={seo.canonical} />}
        <meta property="og:title" content={seo?.title || "Used Cars | Reecomm"} />
        <meta
          property="og:description"
          content={
            seo?.description ||
            "Browse verified used vehicles for sale on Reecomm."
          }
        />
        <meta
          property="og:image"
          content="https://www.reecomm.com/logo/logo1.webp"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@reecomm" />
        <meta
          name="twitter:title"
          content={seo?.title || "Used Cars | Reecomm"}
        />
        <meta
          name="twitter:description"
          content={
            seo?.description ||
            "Browse verified used vehicles for sale on Reecomm."
          }
        />
        <meta
          name="twitter:image"
          content="https://www.reecomm.com/logo/logo1.webp"
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://www.reecomm.com",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Used Cars",
                  item: "https://www.reecomm.com/search/buy-used-cars",
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: seo?.h1 || seo?.title || "Search Results",
                  item:
                    seo?.canonical ||
                    "https://www.reecomm.com/search/buy-used-cars",
                },
              ],
            }),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              name: seo?.title || "Used Cars for Sale on Reecomm",
              description:
                seo?.description || "Browse pre-owned cars for sale.",
              url:
                seo?.canonical || "https://www.reecomm.com/search/buy-used-cars",
            }),
          }}
        />
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
  const [clearAllHandler, setClearAllHandler] = useState(null);

  return (
    <>
      <SearchHeader
        pageResponse={pageResponse}
        activeFilters={activeFilters}
        onRemoveFilter={removeFilterHandler}
        onClearAll={clearAllHandler}
        seoH1={seo?.h1}
      />

      <Layout>
        <SearchWithCard
          initialFilters={initialFilters}
          onPageResponseChange={setPageResponse}
          onFilterChange={setActiveFilters}
          onRemoveFilterHandlerChange={setRemoveFilterHandler}
          onClearAllHandlerChange={setClearAllHandler}
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
  const { params, query } = context;
  const slug = params?.slug;

  if (!slug || typeof slug !== "string") {
    return { notFound: true };
  }

  // Additive synonym redirect (e.g. creata → creta)
  const canonicalSlug = canonicalizeSearchSlug(slug);
  if (canonicalSlug) {
    const qs = new URLSearchParams(query);
    qs.delete("slug");
    const q = qs.toString();
    return {
      redirect: {
        destination: `/search/${canonicalSlug}${q ? `?${q}` : ""}`,
        permanent: true,
      },
    };
  }

  if (!slug.startsWith("buy-used-")) {
    return { notFound: true };
  }

  let normalizedSlug = slug;
  let budgetFilter = null;

  if (slug.includes("-under-")) {
    const budgetMatch = slug.match(/-under-(\d+(?:\.\d+)?)-?(lakhs|lakh|k)/);
    if (budgetMatch) {
      let value = parseFloat(budgetMatch[1]);
      if (budgetMatch[2] === "k") {
        value = value / 100;
      }
      budgetFilter = `0-${value}`;
      normalizedSlug = slug.replace(
        /-under-\d+(?:\.\d+)?-?(?:lakhs|lakh|k)/,
        ""
      );
    }
  } else if (slug.includes("-above-")) {
    const budgetMatch = slug.match(/-above-(\d+)-lakhs/);
    if (budgetMatch) {
      budgetFilter = `${budgetMatch[1]}-200`;
      normalizedSlug = slug.replace(/-above-\d+-lakhs/, "");
    }
  }

  const regex = /^buy-used-(?:(.+)-)?(cars|two-wheelers)(?:-(.+))?$/;
  const match = normalizedSlug.match(regex);

  if (!match) {
    return { notFound: true };
  }

  const detailsRaw = match[1] || "";
  const vehicleTypeParam = match[2];
  const city = match[3] || "";

  const initialFilters = {
    vehicleType: vehicleTypeParam,
  };

  if (budgetFilter) {
    initialFilters.budget = budgetFilter;
  }

  let fuelTypeFilter = "";
  let transmissionFilter = "";
  let bodyTypeFilter = "";
  let details = detailsRaw;

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

  const backendHost = (
    process.env.BACKEND_URL || "https://api.reecomm.online"
  ).replace(/\/$/, "");
  const apiUrl = `${backendHost}/api/v1/website`;
  const nodeApiUrl = (
    process.env.NEXT_PUBLIC_NODE_API_URL &&
    process.env.NEXT_PUBLIC_NODE_API_URL.startsWith("http")
      ? process.env.NEXT_PUBLIC_NODE_API_URL
      : `${backendHost}/api/v1/vehicle-lookup/lookup`
  ).replace(/\/$/, "");

  if (city) {
    const searchLocation = city.replace(/-/g, " ");
    initialFilters.cityName =
      searchLocation.charAt(0).toUpperCase() + searchLocation.slice(1);
    initialFilters.location = initialFilters.cityName;

    try {
      const cityRes = await fetch(
        `${apiUrl}/util/address/search-cities-states?searchText=${encodeURIComponent(searchLocation)}`
      );
      if (cityRes.ok) {
        const cityJson = await cityRes.json();
        const foundCity = cityJson?.data?.find(
          (c) => c.cityName.toLowerCase() === searchLocation.toLowerCase()
        );
        if (foundCity) {
          initialFilters.cityId = foundCity.cityId;
          initialFilters.stateId = foundCity.stateId;
          initialFilters.cityName = foundCity.cityName;
          initialFilters.location = foundCity.cityName;
        } else {
          const foundState = cityJson?.data?.find(
            (c) => c.stateName.toLowerCase() === searchLocation.toLowerCase()
          );
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
    const brandEntries = Object.entries(allMakers).sort(
      (a, b) => b[1].length - a[1].length
    );
    const brandEntry = brandEntries.find(([, name]) => {
      const nameNorm = normalize(name);
      return (
        detailsNormalized === nameNorm ||
        detailsNormalized.startsWith(nameNorm)
      );
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
          modelName = details
            .replace(new RegExp(name.split(" ").join("|"), "gi"), "")
            .replace(/^-+|-+$/g, "");
        }

        if (modelName) {
          const rawModelName = modelName.replace(/-/g, " ");
          initialFilters.model = rawModelName
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");

          try {
            const bodyTypeParam =
              initialFilters.vehicleType === "two-wheelers" ? "TWO_WHEELER" : "";
            const modelRes = await fetch(
              `${nodeApiUrl}/search/models?search=${rawModelName}&makerId=${id}&bodyType=${bodyTypeParam}`
            );
            if (modelRes.ok) {
              const modelJson = await modelRes.json();
              const foundModel = modelJson?.data?.find((m) => {
                const n =
                  m.modelName || m.modelDisplayName || m.model_name || "";
                return (
                  n.toLowerCase().replace(/[\s-]/g, "") ===
                  rawModelName.toLowerCase().replace(/[\s-]/g, "")
                );
              });
              if (foundModel) {
                initialFilters.modelId =
                  foundModel.modelId || foundModel.model_id;
                initialFilters.model =
                  foundModel.modelName ||
                  foundModel.modelDisplayName ||
                  foundModel.model_name;
              }
            }
          } catch (e) {
            console.error("Model resolution failed:", e);
          }
        }
      }
    } else {
      brandName = details
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      initialFilters.brandName = brandName;
    }
  }

  let budgetPart = "";
  if (budgetFilter) {
    const [min, max] = budgetFilter.split("-");
    if (min === "0") {
      budgetPart = ` under ${max} Lakh`;
    } else {
      budgetPart = ` above ${min} Lakh`;
    }
  }

  let totalCount = 0;
  try {
    const isTwo = vehicleTypeParam === "two-wheelers";
    const filterPath = isTwo ? "two-wheeler" : "four-wheeler";
    const body = { avxInspected: false };
    if (initialFilters.cityId) body.cityId = Number(initialFilters.cityId);
    if (initialFilters.stateId) body.stateId = Number(initialFilters.stateId);
    if (initialFilters.makerId) {
      body.makerIds = [Number(initialFilters.makerId)];
    }
    if (initialFilters.modelId) {
      body.modelIds = [Number(initialFilters.modelId)];
    }
    if (fuelTypeFilter) {
      body.fuelTypes = [String(fuelTypeFilter).toUpperCase()];
    }
    if (transmissionFilter) {
      body.transmissionTypes = [String(transmissionFilter).toUpperCase()];
    }
    if (budgetFilter) {
      const [minLakh, maxLakh] = budgetFilter.split("-").map(Number);
      if (!Number.isNaN(minLakh) && minLakh > 0) {
        body.minPrice = minLakh * 100000;
      }
      if (!Number.isNaN(maxLakh) && maxLakh < 200) {
        body.maxPrice = maxLakh * 100000;
      } else if (!Number.isNaN(maxLakh) && minLakh === 0) {
        body.maxPrice = maxLakh * 100000;
      }
    }

    const countRes = await fetch(
      `${apiUrl}/vehicle/filter/${filterPath}?pageNo=1&size=1`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    if (countRes.ok) {
      const countJson = await countRes.json();
      totalCount =
        countJson?.pageResponse?.totalElements ||
        countJson?.totalElements ||
        0;
    }
  } catch (e) {
    console.error("Search count resolution failed:", e);
  }

  const vehicleWord =
    initialFilters.vehicleType === "two-wheelers" ? "Two Wheelers" : "Cars";
  const typePart =
    fuelTypeFilter || transmissionFilter
      ? `${fuelTypeFilter || transmissionFilter} `
      : "";

  const isHub =
    !details &&
    !city &&
    !budgetFilter &&
    !fuelTypeFilter &&
    !transmissionFilter &&
    !bodyTypeFilter;

  const seoBuilt = buildSearchLandingSeo({
    brand: brandName,
    model:
      initialFilters.model ||
      (modelName ? modelName.replace(/-/g, " ") : ""),
    city: initialFilters.cityName || "",
    vehicleWord,
    typePart,
    budgetPart,
    totalCount,
    isHub,
  });

  return {
    props: {
      seo: {
        title: seoBuilt.title,
        description: seoBuilt.description,
        h1: seoBuilt.h1,
        canonical: `https://www.reecomm.com/search/${slug}`,
      },
      initialFilters,
    },
  };
}

SlugSearchPage.fullWidth = true;
export default SlugSearchPage;
