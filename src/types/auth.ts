export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface SignInForm {
  email: string;
  password: string;
}

export interface SignUpForm {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
}
