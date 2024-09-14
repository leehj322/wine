import { InputHTMLAttributes, useState } from "react";
import Image from "next/image";
import Input from "./Input";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  isErrored?: boolean;
}

export default function InputPassword({ isErrored = false, ...props }: Props) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const eyeImageSrc = isPasswordVisible
    ? "/images/EyeIcon.png"
    : "/images/EyeIconSlashed.png";

  const toggleVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="relative w-full">
      <Input
        type={isPasswordVisible ? "text" : "password"}
        isErrored={isErrored}
        {...props}
      />
      <Image
        width={24}
        height={24}
        className="absolute right-5 top-3 cursor-pointer"
        src={eyeImageSrc}
        alt="비밀번호 보이기"
        onClick={toggleVisibility}
      />
    </div>
  );
}
