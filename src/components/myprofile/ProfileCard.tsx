import Image from "next/image";
import User, { UpdateUserForm } from "@/types/user";
import { useEffect, useRef, useState } from "react";
import postImage from "@/libs/axios/image/postImage";
import Button from "../@shared/Button";
import Input from "../@shared/Input";

interface ProfileCardProps {
  user: User;
  updateMe: (formData: UpdateUserForm) => void;
}

export default function ProfileCard({ user, updateMe }: ProfileCardProps) {
  const [userEmail, setUserEmail] = useState("");
  const [nickname, setNickname] = useState(user.nickname);
  const [imagePreview, setImagePreview] = useState(
    user.image || "/images/img_pfp_default.svg",
  );
  const imageRef = useRef<HTMLInputElement | null>(null);

  const handleUpdate = async () => {
    const file = imageRef.current?.files?.[0];

    if (file) {
      try {
        const imageUrl = await postImage(file);
        setImagePreview(imagePreview);
        await updateMe({ nickname, image: imageUrl });
      } catch (error) {
        console.error("프로필 카드 업데이트 에러:", error);
      }
    } else {
      // 파일이 없는 경우에는 닉네임만 업데이트
      try {
        await updateMe({ nickname, image: imagePreview });
      } catch (error) {
        console.error("프로필 카드 업데이트 에러", error);
      }
    }
  };

  useEffect(() => {
    // 로컬 스토리지에서 이메일 가져오기
    const email = localStorage.getItem("userEmail");
    if (!email) return;
    setUserEmail(email);
  }, []);

  if (!user) {
    return null;
  }

  return (
    <div className="h-[241px] w-[343px] rounded-[16px] border border-solid border-light-gray-300 p-[20px] md:h-[247px] md:w-[704px] md:px-[40px] md:py-[23px] xl:h-[530px] xl:w-[280px] xl:px-[20px] xl:py-[28px]">
      <div className="flex w-full flex-col items-center gap-[20px] md:gap-[30px] xl:h-full xl:w-[240px] xl:justify-between">
        <div className="flex w-full flex-row gap-[16px] md:gap-[32px] xl:w-[164px] xl:flex-col">
          <button
            type="button"
            className="relative h-[60px] w-[60px] cursor-pointer rounded-[9999px] border border-solid border-light-gray-300 md:h-[80px] md:w-[80px] xl:h-[164px] xl:w-[164px]"
            onClick={() => imageRef.current?.click()}
          >
            <Image
              fill
              src={imagePreview}
              alt="프로필 이미지"
              className="rounded-[9999px] object-cover"
            />
            <input
              type="file"
              ref={imageRef}
              accept="image/*"
              onChange={() => {
                const file = imageRef.current?.files?.[0];
                if (file) {
                  setImagePreview(URL.createObjectURL(file));
                }
              }}
              className="hidden"
            />
          </button>
          <div className="flex w-[135px] flex-col gap-[4px] md:w-[155px] md:gap-[8px] xl:items-center xl:gap-[16px]">
            <div className="flex items-center text-xl-20px-bold text-light-gray-800 md:text-2xl-24px-bold">
              {user.nickname}
            </div>
            <div className="flex items-center justify-center text-md-14px-regular text-light-gray-500 md:text-lg-16px-regular">
              {userEmail}
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col gap-[6px] md:flex-row md:gap-[24px] xl:flex-col xl:gap-[8px]">
          <div className="flex w-full flex-col gap-[8px] md:h-[84px] md:gap-[10px]">
            <div className="flex items-center text-md-14px-medium text-light-gray-800 md:text-lg-16px-medium">
              닉네임
            </div>
            <Input
              placeholder={user.nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </div>
          <div className="flex flex-row-reverse md:h-[84px] md:flex-col-reverse xl:h-auto xl:flex-row-reverse">
            <div className="h-[42px] w-[89px] md:h-[48px] md:w-[116px] xl:h-[42px] xl:w-[96px]">
              <Button buttonStyle="purple" onClick={handleUpdate}>
                변경하기
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
