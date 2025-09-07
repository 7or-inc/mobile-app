import type { LoginSchema, OTPSchema } from './schemas';

export interface ErrorResponse {
  error: string;
}

export interface LoginResponse {
  message: string;
  token: string;
}

export interface SignupResponse {
  message: string;
}

export interface OTPRequest extends OTPSchema {
  phoneNumber: LoginSchema['phoneNumber'];
  purpose: 'signup' | 'reset_password';
}

export interface OTPResponse {
  user: {
    id: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    is_Admin: boolean;
  };
  token: string;
}
