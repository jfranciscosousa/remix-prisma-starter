export type DataResult<DataType> =
  | { data: DataType; errors?: undefined }
  | { data?: undefined; errors: Record<string, string> };
