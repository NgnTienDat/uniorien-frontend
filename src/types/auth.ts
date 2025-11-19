
export interface Role {
  roleName: string;
  description: string;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: Role;
}

export interface OAuthResult {
  authenticated: boolean;
  user: User;
  token: string;
}

export interface OAuthResponse {
  code: number;
  message: string;
  result: OAuthResult;
}
