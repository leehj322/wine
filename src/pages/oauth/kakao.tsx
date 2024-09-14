import { useRouter } from "next/router";
import { useEffect } from "react";

export default function KakaoSimpleSignUpPage() {
  const router = useRouter();
  const { code } = router.query;

  useEffect(() => {
    if (!code || typeof code !== "string") return;
    localStorage.setItem("authCode", code);
    window.close();
  });
}
