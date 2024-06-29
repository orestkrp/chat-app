export type AuthType = "login" | "register";

export interface AuthData {
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
  userId: string;
}
