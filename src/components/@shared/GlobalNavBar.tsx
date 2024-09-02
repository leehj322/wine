import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import getUserProfile from "@/libs/axios/user/getUserProfile";
import Link from "next/link";
import { removeTokens } from "@/utils/authTokenStorage";
import Dropdown from "./DropDown";

interface ProfileImgProps {
  profileImg: string | null;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

function ProfileImg({ profileImg, setIsLogin }: ProfileImgProps) {
  const handleLogoutBtnClick = () => {
    removeTokens();
    setIsLogin(false);
  };

  return (
    <Dropdown
      width="w-[101px] md:w-[126px]"
      buttonChildren={
        <>
          <Image
            className="block md:hidden"
            width={30}
            height={30}
            src={profileImg ?? "/images/img_pfp_default.svg"}
            alt="프로필 이미지"
          />
          <Image
            className="hidden md:block"
            width={40}
            height={40}
            src={profileImg ?? "/images/img_pfp_default.svg"}
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
  const [profileImg, setProfileImg] = useState<string | null>(null);

  // 로그인 상태인 경우 프로필 이미지 받아오기
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      setIsLogin(true);

      const loadUserProfileImage = async () => {
        try {
          const user = await getUserProfile();
          if (user?.image) {
            setProfileImg(user.image);
          }
        } catch (error) {
          console.error(error);
        }
      };

      // eslint-disable-next-line
      loadUserProfileImage(); // Promise must be awaited (@typescript-eslint/no-floating-promises)
    } else {
      setIsLogin(false);
    }
  }, [isLogin]);

  return (
    <header className="flex h-[50px] w-full items-center justify-between rounded-2xl bg-light-black px-5 text-md-14px-medium text-light-white md:h-[70px] md:px-[60px] md:text-lg-16px-medium">
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
          <ProfileImg profileImg={profileImg} setIsLogin={setIsLogin} />
        ) : (
          <>
            <Link href="/signin">로그인</Link>
            {pathname === "/" && <Link href="/signup">회원가입</Link>}
          </>
        )}
      </div>
    </header>
  );
}
