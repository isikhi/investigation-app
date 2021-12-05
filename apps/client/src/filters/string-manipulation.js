export const camelCaseToWord = (val) => {
  const result = val.replace(/([A-Z])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1);
}
export const capitalizeFirst = (val) => {
  return val.charAt(0).toUpperCase() + val.slice(1);
}
