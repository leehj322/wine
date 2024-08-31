import useToggle from "@/hooks/useToggle";
import React, { useEffect, useRef, ReactNode, ReactElement } from "react";

interface Props {
  children: ReactNode;
  width: string;
  buttonChildren: ReactNode;
}

export default function Dropdown({ buttonChildren, children, width }: Props) {
  const [isVisible, setIsVisible] = useToggle(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (!isVisible) {
        return;
      }
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsVisible();
      }
    }
    if (isVisible) {
      window.addEventListener("click", handleClickOutside);
    } else {
      window.removeEventListener("click", handleClickOutside);
    }

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [isVisible]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => {
          setIsVisible();
        }}
      >
        {React.cloneElement(buttonChildren as ReactElement)}
      </button>
      {isVisible && (
        <ul
          className={`absolute right-0 z-50 flex h-[104px] flex-col items-center justify-center gap-1 ${width} rounded-2xl border border-light-gray-300 bg-light-white`}
        >
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child as ReactElement, {
                className: `w-11/12 h-[46px] rounded-xl bg-light-white text-light-black text-lg-16px-medium flex items-center justify-center text-center rounded-md hover:bg-light-purple-10 hover:text-light-purple-100`, // li 배경색과 스타일 적용
              });
            }
            return child;
          })}
        </ul>
      )}
    </div>
  );
}
