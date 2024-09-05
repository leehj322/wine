import { FormEvent, useEffect } from "react";
import { useRouter } from "next/router";
import { signUp } from "@/libs/axios/auth/auth";
import { useAuth } from "@/contexts/AuthProvider";
import AuthLabel from "@/components/auth/AuthLabel";
import Link from "next/link";
import Image from "next/image";
import Input from "@/components/@shared/Input";
import InputPassword from "@/components/@shared/InputPassword";
import Button from "@/components/@shared/Button";
import useAuthForm from "@/hooks/useAuthForm";

export default function SignUpPage() {
  const { authForm, errorMessages, handleInputChange } = useAuthForm();
  const router = useRouter();
  const { user, login } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const isSignUpSuccess = await signUp(authForm);
    if (isSignUpSuccess) {
      await login({ email: authForm.email, password: authForm.password });
      router.push("/");
      return;
    }
    alert("회원가입 실패");
  };

  const isFormValid =
    authForm.email &&
    authForm.nickname &&
    authForm.password &&
    authForm.passwordConfirmation &&
    !errorMessages.email &&
    !errorMessages.nickname &&
    !errorMessages.password &&
    !errorMessages.passwordConfirmation;

  const buttonStyle = isFormValid ? "purple" : "gray";

  useEffect(() => {
    if (user) router.push("/myprofile");
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
          className="relative mb-2.5 mt-14 w-full md:mb-6 md:mt-16"
          label="이메일"
        >
          <Input
            name="email"
            placeholder="whyne@email.com"
            isErrored={errorMessages.email.length > 0}
            onChange={handleInputChange}
            onBlur={handleInputChange}
            value={authForm.email}
          />
          <p className="absolute right-0 top-3 text-xs-12px-regular text-[#f74747]">
            {errorMessages.email}
          </p>
        </AuthLabel>
        <AuthLabel className="relative mb-2.5 w-full md:mb-6" label="닉네임">
          <Input
            name="nickname"
            placeholder="whyne"
            isErrored={errorMessages.nickname.length > 0}
            onChange={handleInputChange}
            onBlur={handleInputChange}
            value={authForm.nickname}
          />
          <p className="absolute right-0 top-3 text-xs-12px-regular text-[#f74747]">
            {errorMessages.nickname}
          </p>
        </AuthLabel>
        <AuthLabel className="relative mb-2.5 w-full md:mb-6" label="비밀번호">
          <InputPassword
            name="password"
            placeholder="영문, 숫자 포함 8자 이상"
            isErrored={errorMessages.password.length > 0}
            onChange={handleInputChange}
            onBlur={handleInputChange}
            value={authForm.password}
          />
          <p className="absolute right-0 top-3 text-xs-12px-regular text-[#f74747]">
            {errorMessages.password}
          </p>
        </AuthLabel>
        <AuthLabel
          className="relative mb-10 w-full md:mb-8"
          label="비밀번호 확인"
        >
          <InputPassword
            name="passwordConfirmation"
            placeholder="비밀번호 확인"
            isErrored={errorMessages.passwordConfirmation.length > 0}
            onChange={handleInputChange}
            value={authForm.passwordConfirmation}
          />
          <p className="absolute right-0 top-3 text-xs-12px-regular text-[#f74747]">
            {errorMessages.passwordConfirmation}
          </p>
        </AuthLabel>
        <Button
          style={{ height: "48px" }}
          buttonStyle={buttonStyle}
          type="submit"
          disabled={!isFormValid}
        >
          회원가입
        </Button>
        <div className="mt-10 flex gap-3.5">
          <span className="text-md-14px-regular text-gray-500 md:text-lg-16px-regular">
            계정이 이미 있으신가요?
          </span>
          <Link href="/signin">
            <span className="text-md-14px-medium text-light-purple-100 underline md:text-lg-16px-medium">
              로그인하기
            </span>
          </Link>
        </div>
      </form>
    </main>
  );
}
