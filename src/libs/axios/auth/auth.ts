import { AuthTokens, SignInForm, SignInReturn, SignUpForm } from "@/types/auth";
import { saveTokens } from "@/utils/authTokenStorage";
import { AxiosError, AxiosResponse } from "axios";
import { saveUserEmail } from "@/utils/userEmailStorage";
import axios from "../axiosInstance";

export async function signIn(formData: SignInForm) {
  let res: AxiosResponse<SignInReturn>;
  try {
    res = await axios.post("auth/signin", formData);
  } catch (error: unknown) {
    const e = error as AxiosError;
    console.log(`${e.response?.status} error from signIn: ${e.message}`);
    return false;
  }

  const result: SignInReturn = res.data;
  const { accessToken, refreshToken }: AuthTokens = result;
  saveTokens({ accessToken, refreshToken });
  saveUserEmail(result.user.email);
  return true;
}

export async function signUp(formData: SignUpForm) {
  try {
    await axios.post("auth/signup", formData);
  } catch (error: unknown) {
    const e = error as AxiosError;
    console.log(`${e.response?.status} error from signUp: ${e.message}`);
    return false;
  }
  return true;
}
