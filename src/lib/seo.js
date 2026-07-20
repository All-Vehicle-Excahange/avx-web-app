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
    const numMax = parseFloat(max);
    if (min === "0" && !isNaN(numMax)) {
      if (numMax === 1) {
        budgetPart = `-under-1-lakh`;
      } else if (numMax < 1) {
        const valStr = Math.round(numMax * 100);
        budgetPart = `-under-${valStr}k`;
      } else {
        budgetPart = `-under-${numMax}-lakhs`;
      }
    } else if (min) {
      budgetPart = `-above-${min}-lakhs`;
    }
  }

  const cityPart = city ? `-${city}` : "";
  return `buy-used-${typePart}${brandModelPart}${vehicleWord}${budgetPart}${cityPart}`;
}
