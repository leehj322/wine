import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect, ReactElement } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthProvider";
import Dropdown from "./DropDown";

function ProfileImg() {
  const { user, logout } = useAuth();

  const handleLogoutBtnClick = () => {
    logout();
  };

  return (
    <Dropdown
      width="w-[101px] md:w-[126px]"
      buttonChildren={
        <div className="relative h-[30px] w-[30px] md:h-[40px] md:w-[40px]">
          <Image
            className="rounded-full object-cover"
            fill
            src={user?.image ?? "/images/img_pfp_default.svg"}
            alt="프로필 이미지"
          />
        </div>
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
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const { user, isPending } = useAuth();

  // accessToken에 따라서 user profile을 띄워줄 지 로그인/회원가입 버튼을 띄워줄지 결정
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [isLogin, user]);

  const userApiPendingCheck = (components: ReactElement) => {
    if (isPending) return null;

    return components;
  };

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
        {userApiPendingCheck(
          isLogin ? (
            <ProfileImg />
          ) : (
            <>
              <Link href="/signin">로그인</Link>
              {pathname === "/" && <Link href="/signup">회원가입</Link>}
            </>
          ),
        )}
      </div>
    </div>
  );
}
