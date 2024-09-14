import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  isErrored?: boolean;
}

export default function Input({
  className,
  isErrored = false,
  ...props
}: Props) {
  const classCombined = `w-full h-[2.625rem] border border-solid rounded-xl px-5 text-md-14px-regular text-gray-800 focus:border-light-purple-100 placeholder:text-gray-500 md:h-12 md:rounded-2xl md:text-lg-16px-regular ${isErrored ? "border-[#f74747]" : "border-gray-300"}${className ? ` ${className}` : ""}`;

  return <input className={classCombined} {...props} />;
}
