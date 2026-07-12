export function generateSeoSlug({ brandName, modelName, cityName, budget, vehicleType, fuelType, transmission, bodyType }) {
  const sanitize = (str) =>
    str ? str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") : "";

  const brand = sanitize(brandName);
  const model = sanitize(modelName);
  const city = sanitize(cityName);
  const isTwoWheeler = vehicleType && (vehicleType.toLowerCase().includes("2") || vehicleType.toLowerCase().includes("two"));
  const vehicleWord = isTwoWheeler ? "two-wheelers" : "cars";

  let brandModelPart = "";
  if (brand && model) {
    brandModelPart = `${brand}-${model}-`;
  } else if (brand) {
    brandModelPart = `${brand}-`;
  }

  let typePart = "";
  const typeWord = fuelType || transmission || bodyType || "";
  if (typeWord) {
    const normalizedWord = typeWord.replace(/_/g, "-");
    typePart = `${sanitize(normalizedWord)}-`;
  }

  let budgetPart = "";
  if (budget) {
    const [min, max] = budget.split("-");
    if (min === "0") {
      budgetPart = `-under-${max}-lakhs`;
    } else {
      budgetPart = `-above-${min}-lakhs`;
    }
  }

  const cityPart = city ? `-${city}` : "";
  return `buy-used-${typePart}${brandModelPart}${vehicleWord}${budgetPart}${cityPart}`;
}
