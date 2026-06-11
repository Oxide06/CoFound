export const getInitials = (name = "CF") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "CF";

export const normalizeApiData = (response) => response?.data?.data || response?.data || {};

export const toCommaString = (value) => {
  if (!value) return "";
  return Array.isArray(value) ? value.join(", ") : value;
};
