import Image from "next/image";
import Input from "./Input";
import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

export default function InputSelect({ ...props }: Props) {
  return (
    <div className="relative w-full">
      <Input readOnly {...props} />
      <Image
        width={24}
        height={24}
        className="absolute right-5 top-3"
        src={"/images/dropdownArrow.svg"}
        alt={"펼치기"}
      />
    </div>
  );
}
