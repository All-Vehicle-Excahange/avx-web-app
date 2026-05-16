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

  // Regex to extract brand/model part and city part
  // Pattern: buy-used-{brand-model}-cars-{city}
  const regex = /^buy-used-(?:(.+)-)?cars(?:-(.+))?$/;
  const match = slug.match(regex);

  if (!match) {
    return { notFound: true };
  }

  const details = match[1] || ""; // e.g. "toyota" or "toyota-camry"
  const city = match[2] || ""; // e.g. "ahmedabad"

  const initialFilters = {
    vehicleType: "cars",
  };

  if (city) {
    initialFilters.cityName = city.charAt(0).toUpperCase() + city.slice(1);
    initialFilters.location = initialFilters.cityName;
  }

  let brandName = "";
  let modelName = "";

  if (details) {
    const normalize = (s) => s.toLowerCase().replace(/[\s-]/g, "");
    const detailsNormalized = normalize(details);

    // Sort brands by length (descending) to match the longest name first (e.g., "Mercedes Benz" before "Mercedes")
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
        // Extract model by removing brand prefix from the original details string
        // We need to be careful with hyphens.
        const slugPrefix = name.toLowerCase().replace(/\s+/g, "-");
        if (details.startsWith(slugPrefix + "-")) {
          modelName = details.slice(slugPrefix.length + 1);
        } else if (details.startsWith(slugPrefix)) {
          modelName = details.slice(slugPrefix.length);
        } else {
          // Fallback if formatting is weird
          modelName = details.replace(new RegExp(name.split(" ").join("|"), "gi"), "").replace(/^-+|-+$/g, "");
        }

        if (modelName) {
          modelName = modelName.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
          initialFilters.model = modelName;
        }
      }
    } else {
      brandName = details.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
      initialFilters.brandName = brandName;
    }
  }

  // SEO Logic
  const brandPart = brandName ? `${brandName} ` : "";
  const modelPart = modelName ? `${modelName} ` : "";
  const cityPart = city ? ` in ${initialFilters.cityName}` : "";
  
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
