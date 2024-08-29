import { AuthTokens } from "@/types/auth";

/** accessToken과 refreshToken을 localStorage에 저장하는 함수 */
export function saveTokens(tokens: AuthTokens) {
  localStorage.setItem("accessToken", tokens.accessToken);
  localStorage.setItem("refreshToken", tokens.refreshToken);
}

/** refreshToken을 통해 재발급 받은 accessToken을 localStorage에 저장하는 함수 */
export function saveRefreshedAccessToken(accessToken: string) {
  localStorage.setItem("accessToken", accessToken);
}

/** 저장된 accessToken과 refreshToken을 localStorage에서 제거하는 함수 */
export function removeTokens() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
}
