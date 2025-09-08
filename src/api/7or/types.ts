import type { OTPSchema } from './schemas';

export interface ErrorResponse {
  error: string;
}

export interface LoginResponse {
  message: string;
  token: string;
}

export interface SignupResponse {
  authId: string;
}

export type ForgotPasswordResponse = SignupResponse;

export interface OTPRequest extends OTPSchema {
  authId: string;
}

export interface SendOTPResponse {
  message: string;
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
