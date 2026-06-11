import { formatDistanceToNow, format } from "date-fns";

export const formatDate = (date) => {
  if (!date) return "";
  return format(new Date(date), "MMM d, yyyy");
};

export const timeAgo = (date) => {
  if (!date) return "";
  return formatDistanceToNow(new Date(date), { addSuffix: true });
};
