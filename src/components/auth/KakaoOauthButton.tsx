import { useAuth } from "@/contexts/AuthProvider";
import Image from "next/image";
import { useEffect } from "react";

export default function KakaoOauthButton() {
  const { oAuthLogin } = useAuth();

  const redirectUri = `${process.env.NEXT_PUBLIC_URL}/oauth/kakao`;
  const kakaoOauthUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${redirectUri}`;

  const handleKakaoClick = () => {
    window.open(
      kakaoOauthUrl,
      "Kakao로 로그인",
      "left=720,top=120,width=480,height=702",
    );
  };

  const handleSubmit = async (token: string) => {
    const oAuthRes = await oAuthLogin({ redirectUri, token }, "KAKAO");
    if (!oAuthRes) alert("oAuth 로그인 실패");
  };

  const handleAuthCode = () => {
    const token = localStorage.getItem("authCode");
    if (!token) return;
    localStorage.removeItem("authCode");
    handleSubmit(token);
  };

  useEffect(() => {
    window.addEventListener("storage", handleAuthCode);
    return () => {
      window.removeEventListener("storage", handleAuthCode);
    };
  }, []);

  return (
    <button
      className="flex h-[50px] w-full cursor-pointer items-center justify-center gap-3 rounded-2xl border border-solid border-gray-300"
      type="button"
      onClick={handleKakaoClick}
    >
      <Image src="/images/kakao_icon.png" width={24} height={24} alt="카카오" />
      <p className="text-lg-16px-medium text-gray-800">kakao로 시작하기</p>
    </button>
  );
}
