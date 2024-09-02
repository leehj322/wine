import Image from "next/image";
import { InputHTMLAttributes } from "react";
import Input from "./Input";

export default function InputSelect({
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="relative w-full">
      <Input readOnly {...props} />
      <Image
        width={24}
        height={24}
        className="absolute right-5 top-3"
        src="/images/dropdownArrow.svg"
        alt="펼치기"
      />
    </div>
  );
}
