import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthProvider";
import Image from "next/image";
import Link from "next/link";
import Input from "@/components/@shared/Input";
import Button from "@/components/@shared/Button";
import AuthLabel from "@/components/auth/AuthLabel";
import InputPassword from "@/components/@shared/InputPassword";
import useAuthForm from "@/hooks/useAuthForm";
import GoogleOauthButton from "@/components/auth/GoogleOauthButton";
import KakaoOauthButton from "@/components/auth/KakaoOauthButton";

export default function SignInPage() {
  const [loginErrorMessage, setLoginErrorMessage] = useState("");
  const [redirectionPath, setRedirectionPath] = useState("/");
  const { authForm, errorMessages, handleInputChange } = useAuthForm();
  const router = useRouter();
  const { user, login } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const isLoginSuccess = await login({
      email: authForm.email,
      password: authForm.password,
    });
    if (!isLoginSuccess) {
      setLoginErrorMessage("이메일 혹은 비밀번호를 확인해주세요.");
    }
  };

  const isFormValid =
    authForm.email &&
    authForm.password &&
    !errorMessages.email &&
    !errorMessages.password;

  const buttonType = isFormValid ? "purple" : "gray";

  useEffect(() => {
    if (!localStorage.getItem("wineId")) return;
    setRedirectionPath(`/wines/${localStorage.getItem("wineId")}`);
    localStorage.removeItem("wineId");
  }, []);

  useEffect(() => {
    setLoginErrorMessage("");
  }, [authForm.email, authForm.password]);

  useEffect(() => {
    if (user) router.push(redirectionPath);
  }, [user]);

  return (
    <main className="flex h-screen w-full items-center justify-center bg-gray-100 px-4">
      <form
        className="flex w-[496px] flex-col items-center rounded-2xl border border-solid border-gray-300 bg-white px-5 py-14 md:px-12 md:py-16 xl:py-20"
        onSubmit={handleSubmit}
      >
        <Link href="/">
          <Image
            src="/images/logo_black.png"
            width={104}
            height={30}
            alt="홈으로"
          />
        </Link>
        <AuthLabel
          className="relative mb-2.5 mt-14 w-full md:mt-16"
          label="이메일"
        >
          <Input
            name="email"
            placeholder="이메일 입력"
            isErrored={
              errorMessages.email.length > 0 || loginErrorMessage.length > 0
            }
            onChange={handleInputChange}
            onBlur={handleInputChange}
            value={authForm.email}
          />
          <p className="absolute right-0 top-3 text-xs-12px-regular text-[#f74747]">
            {errorMessages.email}
          </p>
          <p className="absolute right-0 top-3 text-xs-12px-regular text-[#f74747]">
            {loginErrorMessage}
          </p>
        </AuthLabel>
        <AuthLabel className="relative mb-10 w-full md:mb-14" label="비밀번호">
          <InputPassword
            name="password"
            placeholder="비밀번호 입력"
            isErrored={
              errorMessages.password.length > 0 || loginErrorMessage.length > 0
            }
            onChange={handleInputChange}
            onBlur={handleInputChange}
            value={authForm.password}
          />
          <p className="absolute right-0 top-3 text-xs-12px-regular text-[#f74747]">
            {errorMessages.password}
          </p>
        </AuthLabel>
        <div className="relative mb-6 flex w-full flex-col gap-3.5 md:mb-8">
          <Button
            style={{ height: "50px" }}
            buttonStyle={buttonType}
            disabled={!isFormValid}
            type="submit"
          >
            로그인
          </Button>
          <GoogleOauthButton />
          <KakaoOauthButton />
        </div>
        <div className="flex gap-3.5">
          <span className="text-md-14px-regular text-gray-500 md:text-lg-16px-regular">
            계정이 없으신가요?
          </span>
          <Link href="/signup">
            <span className="text-md-14px-medium text-light-purple-100 underline md:text-lg-16px-medium">
              회원가입하기
            </span>
          </Link>
        </div>
      </form>
    </main>
  );
}
