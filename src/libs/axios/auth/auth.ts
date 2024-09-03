import { AuthTokens, SignInForm, SignUpForm } from "@/types/auth";
import { saveTokens } from "@/utils/authTokenStorage";
import { AxiosError, AxiosResponse } from "axios";
import axios from "../axiosInstance";

export async function signIn(formData: SignInForm) {
  let res: AxiosResponse;
  try {
    res = await axios.post("auth/signin", formData);
  } catch (error: unknown) {
    const e = error as AxiosError;
    alert(`${e.response?.status} error from signIn: ${e.message}`);
    return;
  }

  const { accessToken, refreshToken }: AuthTokens = res.data as AuthTokens;
  saveTokens({ accessToken, refreshToken });
}

export async function signUp(formData: SignUpForm) {
  try {
    await axios.post("auth/signup", formData);
  } catch (error: unknown) {
    const e = error as AxiosError;
    alert(`${e.response?.status} error from signUp: ${e.message}`);
  }
}
