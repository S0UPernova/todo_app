export default function FilterParams(params) {
  const asArray = Object.entries(params);
  const filtered = asArray.filter(([key, value]) => value !== null);
  const justFilledFields = Object.fromEntries(filtered);
  return justFilledFields
}