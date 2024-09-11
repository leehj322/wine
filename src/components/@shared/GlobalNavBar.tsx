import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthProvider";
import Dropdown from "./DropDown";

function ProfileImg() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogoutBtnClick = () => {
    logout();

    // 마이 프로필 페이지인 경우 redirection 실행
    // 해당 코드는 myprofile 페이지에서 redirection 구현되면 제거 예정
    if (router.pathname === "/myprofile") {
      router.push("/");
    } else if (pathname === "/wines/[id]") {
      router.push("/");
    }
  };

  return (
    <Dropdown
      width="w-[101px] md:w-[126px]"
      buttonChildren={
        <>
          <Image
            className="inline-block rounded-full object-cover md:hidden"
            width={30}
            height={30}
            src={user?.image ?? "/images/img_pfp_default.svg"}
            alt="프로필 이미지"
          />
          <Image
            className="hidden rounded-full object-cover md:inline-block"
            width={40}
            height={40}
            src={user?.image ?? "/images/img_pfp_default.svg"}
            alt="프로필 이미지"
          />
        </>
      }
    >
      <Link href="/myprofile">마이페이지</Link>
      <button type="button" onClick={handleLogoutBtnClick}>
        로그아웃
      </button>
    </Dropdown>
  );
}

/**
 * Navigation Bar
 * width 기본 값이 full 이므로, wrapper 사용 하셔서 width 값 조절 하시면 될 것 같습니다~!
 */
export default function GlobalNavBar() {
  const { pathname } = useRouter();
  const [isLogin, setIsLogin] = useState(false);

  // 로그인 상태 관리 (accessToken 유무로 판단)
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [isLogin]);

  return (
    <div className="flex h-[50px] w-full items-center justify-between rounded-2xl bg-light-black px-5 text-md-14px-medium text-light-white md:h-[70px] md:px-[60px] md:text-lg-16px-medium">
      <Link href="/">
        <Image
          width={52}
          height={15}
          src="/images/logo_white.png"
          alt="로고 이미지"
        />
      </Link>
      <div className="flex gap-5 md:gap-10">
        {isLogin ? (
          <ProfileImg />
        ) : (
          <>
            <Link href="/signin">로그인</Link>
            {pathname === "/" && <Link href="/signup">회원가입</Link>}
          </>
        )}
      </div>
    </div>
  );
}
