import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

export default function Input({ className, ...props }: Props) {
  const classCombined = `w-full h-[2.625rem] border border-solid border-gray-300 rounded-xl px-5 text-md-14px-regular text-gray-800 placeholder:text-gray-500 md:h-12 md:rounded-2xl md:text-lg-16px-regular${className ? ` ${className}` : ""}`;

  return <input className={classCombined} {...props} />;
}
