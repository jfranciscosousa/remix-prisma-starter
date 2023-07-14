export type GenericDataError = Record<string, string>;

export type DataResult<DataType> =
  | { data: DataType; errors?: undefined }
  | { data?: undefined; errors: GenericDataError };
