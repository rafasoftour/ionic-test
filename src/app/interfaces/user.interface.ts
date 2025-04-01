export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse {
  name: string;
  email: string;
  accessToken: string;
  refreshToken: string;
}

export interface Usuario {
  name: string;
  email: string;
  role: string;
  mfaSecret?: string;
}
