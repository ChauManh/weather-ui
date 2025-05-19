export interface ApiResponse<T = unknown> {
  statusCode: number;
  message: string;
  result?: T;
}
