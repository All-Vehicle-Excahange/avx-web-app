export function generateSeoSlug({ brandName, modelName, cityName }) {
  const sanitize = (str) =>
    str ? str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") : "";

  const brand = sanitize(brandName);
  const model = sanitize(modelName);
  const city = sanitize(cityName);

  let brandModelPart = "";
  if (brand && model) {
    brandModelPart = `${brand}-${model}-`;
  } else if (brand) {
    brandModelPart = `${brand}-`;
  }

  const cityPart = city ? `-${city}` : "";
  return `buy-used-${brandModelPart}cars${cityPart}`;
}
