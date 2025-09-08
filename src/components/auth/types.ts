import type { OTPRequest } from '@/api';

export interface VerifyOTPParams extends Omit<OTPRequest, 'otp'> {
  phoneNumber: string;
}
