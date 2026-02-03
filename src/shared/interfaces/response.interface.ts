export interface IResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: any;
}

export interface IPaginatedResponse<T> extends IResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}
