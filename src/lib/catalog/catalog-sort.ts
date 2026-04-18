import { CatalogItem } from "@/lib/catalog/catalog-types";

export type CatalogSortField = "name" | "quantity" | "price";
export type CatalogSortDirection = "asc" | "desc";

export type CatalogSortOption = {
  field: CatalogSortField;
  direction: CatalogSortDirection;
};

const parsePrice = (rawPrice: string): number => {
  const numeric = rawPrice.replace(/[^\d.]/g, "");
  return Number.parseFloat(numeric || "0");
};

export const sortCatalogItems = (
  items: CatalogItem[],
  sortOption: CatalogSortOption
): CatalogItem[] => {
  const { field, direction } = sortOption;
  const directionFactor = direction === "asc" ? 1 : -1;

  return [...items].sort((a, b) => {
    if (field === "name") {
      return a.name.localeCompare(b.name, undefined, { sensitivity: "base" }) * directionFactor;
    }

    if (field === "quantity") {
      return (a.stock - b.stock) * directionFactor;
    }

    return (parsePrice(a.price) - parsePrice(b.price)) * directionFactor;
  });
};
