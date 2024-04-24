import { formatDistance } from "date-fns";
import { useMemo } from "react";
import { useRootLoaderData } from "./useRootLoaderData";

function formatDateLocale(timestamp: string | Date, locale: string) {
  return new Date(timestamp).toLocaleString(locale);
}

function formatRelativeTime(timestamp: string | Date, rootTime: string) {
  return formatDistance(new Date(timestamp), new Date(rootTime));
}

export default function useDates() {
  const { locale, rootTime } = useRootLoaderData();

  return useMemo(
    () => ({
      formatDateLocale: (timestamp: string | Date) =>
        formatDateLocale(timestamp, locale),
      formatRelativeTime: (timestamp: string | Date) =>
        formatRelativeTime(timestamp, rootTime),
    }),
    [locale, rootTime],
  );
}
