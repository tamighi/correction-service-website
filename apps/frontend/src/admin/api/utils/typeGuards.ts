export const hasCount = (obj: unknown): obj is { count: number } => {
  return (
    obj !== null &&
    typeof obj === "object" &&
    "count" in obj &&
    typeof obj.count === "number"
  );
};

export const hasDataObject = (obj: unknown): obj is { data: object } => {
  return (
    obj !== null &&
    typeof obj === "object" &&
    "data" in obj &&
    typeof obj.data === "object"
  );
};

export const hasDataArray = (obj: unknown): obj is { data: object[] } => {
  return (
    obj !== null &&
    typeof obj === "object" &&
    "data" in obj &&
    Array.isArray(obj.data)
  );
};
