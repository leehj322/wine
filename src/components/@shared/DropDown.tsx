import React, { useEffect, useState, ReactNode, ReactElement } from "react";

interface Props {
  visibility: boolean;
  children: ReactNode;
}

export default function Dropdown({ visibility, children }: Props) {
  const [visibilityAnimation, setVisibilityAnimation] =
    useState<boolean>(false);
  const [repeat, setRepeat] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (visibility) {
      clearTimeout(repeat!);
      setRepeat(null);
      setVisibilityAnimation(true);
    } else {
      setRepeat(
        setTimeout(() => {
          setVisibilityAnimation(false);
        }, 400),
      );
    }
  }, [visibility]);

  return (
    <div className="h-[92px] w-[101px] rounded-2xl border border-light-gray-300 bg-light-white">
      {visibilityAnimation && (
        <ul>
          {React.Children.map(children, (child, index) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child as ReactElement, {
                className: `w-[93px] h-[40px] rounded-[10px] bg-light-purple-10 p-2 rounded-md py-2.5`, // li 배경색과 스타일 적용
              });
            }
            return child;
          })}
        </ul>
      )}
    </div>
  );
}
