import { ButtonHTMLAttributes, ReactNode } from "react";

interface CommonButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  additionalStyle: string;
  children: ReactNode;
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonStyle?: "gray" | "light" | "purple";
  customStyle?: string;
  shape?: "pill" | "normal";
  children: ReactNode;
}

/**
 * 기본 스타일을 적용하는 CommonButton 컴포넌트
 */
function CommonButton({
  additionalStyle,
  children,
  ...props
}: CommonButtonProps) {
  return (
    <button
      className={`flex h-full w-full items-center justify-center md:text-lg-16px-bold ${additionalStyle}`}
      {...props}
    >
      {children}
    </button>
  );
}

/**
 * 다양한 스타일을 가진 버튼을 생성하는 Button 컴포넌트
 * @param buttonStyle gray(회색), light(연보라색), purple(보라색), undefined(social login 용)
 * @param shape 버튼의 모양 pill(border 9999px), normal(border 12px)
 * @param customStyle tailwind className customStyle 용
 */
export default function Button({
  buttonStyle,
  customStyle = "",
  shape = "normal",
  children,
  ...props
}: ButtonProps) {
  const roundedStyle = shape === "pill" ? "rounded-full" : "rounded-2xl";

  let additionalStyle = "";
  switch (buttonStyle) {
    case "gray":
      additionalStyle = `border border-solid border-light-gray-300 bg-light-white text-md-14px-medium text-light-gray-500`;
      break;
    case "light":
      additionalStyle = `bg-violet-100 text-md-14px-bold text-light-purple-100`;
      break;
    case "purple":
      additionalStyle = `bg-light-purple-100 text-md-14px-bold text-light-white`;
      break;
    default:
      additionalStyle = `border border-solid border-light-gray-300 bg-light-white text-md-14px-medium text-light-gray-800`;
      break;
  }

  return (
    <CommonButton
      additionalStyle={`${additionalStyle} ${roundedStyle} ${customStyle}`}
      {...props}
    >
      {children}
    </CommonButton>
  );
}
