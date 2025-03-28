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
