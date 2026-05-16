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
      </Head>
      <Suspense fallback={null}>
        <SearchContent
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

  return (
    <>
      <SearchHeader pageResponse={pageResponse} activeFilters={activeFilters} />

      <Layout>
        <SearchWithCard
          initialFilters={initialFilters}
          onPageResponseChange={setPageResponse}
          onFilterChange={setActiveFilters}
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

  if (!slug.startsWith("buy-used-")) {
    return { notFound: true };
  }

  const regex = /^buy-used-(?:(.+)-)?cars(?:-(.+))?$/;
  const match = slug.match(regex);

  if (!match) {
    return { notFound: true };
  }

  const details = match[1] || "";
  const city = match[2] || "";

  const initialFilters = {
    vehicleType: "cars",
  };

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.reecomm.com/api/v1";
  const nodeApiUrl = process.env.NEXT_PUBLIC_NODE_API_URL || "https://api.reecomm.com/api/v1";

  // 1. Resolve City ID
  if (city) {
    initialFilters.cityName = city.charAt(0).toUpperCase() + city.slice(1);
    initialFilters.location = initialFilters.cityName;
    
    try {
      const cityRes = await fetch(`${apiUrl}/util/address/search-cities-states?searchText=${city}`);
      if (cityRes.ok) {
        const cityJson = await cityRes.json();
        const foundCity = cityJson?.data?.find(c => c.cityName.toLowerCase() === city.toLowerCase());
        if (foundCity) {
          initialFilters.cityId = foundCity.cityId;
          initialFilters.stateId = foundCity.stateId;
          initialFilters.cityName = foundCity.cityName;
          initialFilters.location = foundCity.cityName;
        }
      }
    } catch (e) {
      console.error("City resolution failed:", e);
    }
  }

  let brandName = "";
  let modelName = "";

  if (details) {
    const normalize = (s) => s.toLowerCase().replace(/[\s-]/g, "");
    const detailsNormalized = normalize(details);

    const brandEntries = Object.entries(MAKER_NAME_MAPPING).sort((a, b) => b[1].length - a[1].length);
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
          
          // 2. Resolve Model ID
          try {
            const modelRes = await fetch(`${nodeApiUrl}/search/models?search=${rawModelName}&makerId=${id}`);
            if (modelRes.ok) {
              const modelJson = await modelRes.json();
              const foundModel = modelJson?.data?.find(m => m.model_name.toLowerCase() === rawModelName.toLowerCase());
              if (foundModel) {
                initialFilters.modelId = foundModel.model_id;
                initialFilters.model = foundModel.model_name;
              }
            }
          } catch (e) {
            console.error("Model resolution failed:", e);
          }
        }
      }
    } else {
      brandName = details.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
      initialFilters.brandName = brandName;
    }
  }

  const brandPart = brandName ? `${brandName} ` : "";
  const modelPart = initialFilters.model ? `${initialFilters.model} ` : (modelName ? `${modelName} ` : "");
  const cityPart = initialFilters.cityName ? ` in ${initialFilters.cityName}` : "";
  
  const dynamicTitle = `Used ${brandPart}${modelPart}Cars${cityPart} | Reecomm`;
  const dynamicDescription = `Browse verified used ${brandPart}${modelPart}cars${cityPart}. Every Reecomm listing is certified, inspected, and fairly priced.`;

  return {
    props: {
      seo: {
        title: dynamicTitle,
        description: dynamicDescription,
      },
      initialFilters,
    },
  };
}

SlugSearchPage.fullWidth = true;
export default SlugSearchPage;
