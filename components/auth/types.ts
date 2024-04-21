export interface LoginSchemaType {
  email: string;
  password: string;
}

export interface RegisterSchemaType {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  city: string;
  phone: string;
}
export interface ResponseType {
  status: number;
  success: boolean;
  error?: string;
  user?: unknown;
}
