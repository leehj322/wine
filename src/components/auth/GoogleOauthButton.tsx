import { useAuth } from "@/contexts/AuthProvider";
import Image from "next/image";
import { MutableRefObject, useEffect, useRef } from "react";

interface CredentialResponse {
  credential: string;
  select_by: unknown;
  state: unknown;
}

declare global {
  interface Window {
    handleCredentialResponse: (response: CredentialResponse) => void;
  }
}

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

export default function GoogleOauthButton() {
  const googleWrapperRef: MutableRefObject<HTMLButtonElement | null> =
    useRef(null);
  const { oAuthLogin } = useAuth();

  const handleGoogleClick = () => {
    googleWrapperRef.current?.click();
  };

  const handleGoogleWrapperClick = () => {
    const wrapperContent: HTMLButtonElement | undefined | null =
      googleWrapperRef.current?.querySelector("div[role=button]");
    if (!wrapperContent) return;
    wrapperContent.click();
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    document.body.appendChild(script);

    window.handleCredentialResponse = async (response: CredentialResponse) => {
      const token = response.credential;
      const oAuthRes = await oAuthLogin({ token }, "GOOGLE");
      if (!oAuthRes) alert("oAuth 로그인 실패");
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <button
        className="flex h-[50px] w-full cursor-pointer items-center justify-center gap-3 rounded-2xl border border-solid border-gray-300"
        type="button"
        onClick={handleGoogleClick}
      >
        <Image
          src="/images/google_icon.png"
          width={24}
          height={24}
          alt="구글"
        />
        <p className="text-lg-16px-medium text-gray-800">Google로 시작하기</p>
      </button>
      <button
        className="hidden"
        ref={googleWrapperRef}
        onClick={handleGoogleWrapperClick}
        type="button"
      >
        This button is hidden.
        <div
          id="g_id_onload"
          className="hidden"
          data-client_id={GOOGLE_CLIENT_ID}
          data-context="signin"
          data-ux_mode="popup"
          data-auto_prompt="false"
          data-callback="handleCredentialResponse"
        />
        <div
          className="g_id_signin"
          data-type="standard"
          data-shape="pill"
          data-theme="outline"
          data-text="signin_with"
          data-size="large"
          data-logo_alignment="center"
        />
      </button>
    </>
  );
}
