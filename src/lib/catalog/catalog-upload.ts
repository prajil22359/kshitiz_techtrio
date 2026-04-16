import * as XLSX from "xlsx";

import { CatalogItem, CatalogStatus } from "@/lib/catalog/catalog-types";

export const REQUIRED_UPLOAD_COLUMNS = [
  "name",
  "category",
  "price",
  "stock",
  "zones",
  "eta",
  "status",
] as const;

type RequiredUploadColumn = (typeof REQUIRED_UPLOAD_COLUMNS)[number];

type ParsedUploadRow = Record<string, string>;

type UploadIssue = {
  rowNumber: number;
  missingFields: RequiredUploadColumn[];
};

export type CatalogUploadResult = {
  items: CatalogItem[];
  missingColumns: RequiredUploadColumn[];
  issues: UploadIssue[];
  skippedRows: number;
  totalRows: number;
};

const HEADER_ALIASES: Record<string, string> = {
  id: "id",
  productid: "id",
  sku: "id",
  name: "name",
  productname: "name",
  category: "category",
  productcategory: "category",
  price: "price",
  priceunit: "price",
  unitprice: "price",
  stock: "stock",
  quantity: "stock",
  qty: "stock",
  zones: "zones",
  zone: "zones",
  deliveryzones: "zones",
  eta: "eta",
  leadtime: "eta",
  status: "status",
};

const COLOR_PALETTE = [
  "bg-blue-100 text-blue-600",
  "bg-red-100 text-red-600",
  "bg-green-100 text-green-600",
  "bg-amber-100 text-amber-700",
  "bg-indigo-100 text-indigo-600",
  "bg-teal-100 text-teal-600",
  "bg-slate-100 text-slate-800",
  "bg-gray-100 text-gray-600",
];

const inrFormatter = new Intl.NumberFormat("en-IN");

function normalizeHeader(value: string): string {
  return value.toLowerCase().trim().replace(/[^a-z0-9]/g, "");
}

function parseCsvLine(line: string): string[] {
  const values: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];

    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === "," && !inQuotes) {
      values.push(current.trim());
      current = "";
      continue;
    }

    current += char;
  }

  values.push(current.trim());
  return values;
}

function parseCsvToRows(csvText: string): string[][] {
  return csvText
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map(parseCsvLine);
}

function normalizeStatus(rawValue: string): CatalogStatus {
  const value = rawValue.toLowerCase().trim();
  if (value.includes("attention") || value.includes("out of stock")) {
    return "Needs Attention";
  }
  if (value.includes("draft")) {
    return "Draft";
  }
  return "Active";
}

function normalizeStock(rawValue: string): number {
  const parsed = Number.parseInt(rawValue.replace(/[^0-9-]/g, ""), 10);
  if (Number.isNaN(parsed) || parsed < 0) {
    return 0;
  }
  return parsed;
}

function normalizePrice(rawValue: string): string {
  const stripped = rawValue.replace(/[^0-9.]/g, "");
  const parsed = Number.parseFloat(stripped);
  if (Number.isNaN(parsed)) {
    return rawValue.trim() || "₹0";
  }
  return `₹${inrFormatter.format(Math.round(parsed))}`;
}

function pickImgColor(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return COLOR_PALETTE[hash % COLOR_PALETTE.length];
}

function buildMappedRows(rows: string[][]): { mappedRows: ParsedUploadRow[]; missingColumns: RequiredUploadColumn[] } {
  if (rows.length === 0) {
    return {
      mappedRows: [],
      missingColumns: [...REQUIRED_UPLOAD_COLUMNS],
    };
  }

  const [rawHeaders, ...dataRows] = rows;
  const headers = rawHeaders.map((header) => HEADER_ALIASES[normalizeHeader(String(header))] ?? "");

  const presentColumns = new Set(headers.filter(Boolean));
  const missingColumns = REQUIRED_UPLOAD_COLUMNS.filter((col) => !presentColumns.has(col));

  const mappedRows = dataRows.map((row) => {
    const mapped: ParsedUploadRow = {};
    headers.forEach((header, index) => {
      if (!header) return;
      mapped[header] = String(row[index] ?? "").trim();
    });
    return mapped;
  });

  return { mappedRows, missingColumns };
}

function generateId(row: ParsedUploadRow, rowNumber: number): string {
  if (row.id) return row.id;
  const padded = String(rowNumber).padStart(3, "0");
  return `PRD-UPL-${padded}`;
}

export async function parseCatalogUploadFile(file: File): Promise<CatalogUploadResult> {
  const lowerName = file.name.toLowerCase();
  const buffer = await file.arrayBuffer();
  let rows: string[][] = [];

  if (lowerName.endsWith(".csv")) {
    const csvText = new TextDecoder().decode(buffer);
    rows = parseCsvToRows(csvText);
  } else if (lowerName.endsWith(".xlsx") || lowerName.endsWith(".xls")) {
    const workbook = XLSX.read(buffer, { type: "array" });
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    rows = XLSX.utils.sheet_to_json(worksheet, {
      header: 1,
      raw: false,
      defval: "",
      blankrows: false,
    }) as string[][];
  } else {
    throw new Error("Unsupported file type. Please upload CSV or XLSX.");
  }

  const { mappedRows, missingColumns } = buildMappedRows(rows);
  if (missingColumns.length > 0) {
    return {
      items: [],
      missingColumns,
      issues: [],
      skippedRows: mappedRows.length,
      totalRows: mappedRows.length,
    };
  }

  const issues: UploadIssue[] = [];
  const items: CatalogItem[] = [];

  mappedRows.forEach((row, index) => {
    const rowNumber = index + 2;
    const isEmpty = Object.values(row).every((value) => value.trim().length === 0);
    if (isEmpty) {
      return;
    }

    const missingFields = REQUIRED_UPLOAD_COLUMNS.filter((col) => {
      const value = row[col];
      return !value || value.trim().length === 0;
    });

    if (missingFields.length > 0) {
      issues.push({ rowNumber, missingFields });
      return;
    }

    const id = generateId(row, rowNumber);
    const item: CatalogItem = {
      id,
      name: row.name,
      category: row.category,
      price: normalizePrice(row.price),
      stock: normalizeStock(row.stock),
      zones: row.zones,
      eta: row.eta,
      status: normalizeStatus(row.status),
      imgColor: pickImgColor(`${id}-${row.name}`),
    };

    items.push(item);
  });

  return {
    items,
    missingColumns: [],
    issues,
    skippedRows: issues.length,
    totalRows: mappedRows.length,
  };
}

export function upsertCatalogItems(existingItems: CatalogItem[], importedItems: CatalogItem[]): CatalogItem[] {
  const byId = new Map(existingItems.map((item) => [item.id, item]));
  importedItems.forEach((item) => byId.set(item.id, item));
  return Array.from(byId.values());
}
