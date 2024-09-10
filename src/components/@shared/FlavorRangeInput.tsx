import { ChangeEvent, useEffect, useState } from "react";

interface FlavorRangeInputProps {
  min: number;
  max: number;
  value?: number; // 슬라이더의 초기값
  onChange?: (value: number) => void; // 슬라이더 값 변화 시 호출되는 콜백 함수
}

/**
 * FlavorRangeInput 컴포넌트는 주어진 최소, 최대 값 사이에서 선택할 수 있는 슬라이더
 *
 * // (주의사항) 페이지 또는 모달에 사용할 때 width, height를 지정해준 div 태그로 감싸서 사용해주세요.
 *
 * // 사용법
 * <FlavorRangeInput min={0} max={10} value={5} onChange={(value) => console.log(value)} />
 */
export default function FlavorRangeInput({
  min,
  max,
  value = min,
  onChange,
}: FlavorRangeInputProps) {
  const [rangeValue, setRangeValue] = useState<number>(min);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setRangeValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  useEffect(() => {
    setRangeValue(value);
  }, [value]);

  return (
    <>
      <div className="h-[6px] rounded-[50px] border border-solid border-light-gray-300 bg-light-gray-100" />
      <div className="range-input relative">
        <input
          type="range"
          min={min}
          max={max}
          value={rangeValue}
          onChange={handleChange}
        />
      </div>
      <style jsx>
        {`
          .range-input input {
            position: absolute;
            top: -6px;
            height: 6px;
            width: 100%;
            background: none;
            -webkit-appearance: none;
          }

          input[type="range"]::-webkit-slider-thumb {
            height: 16px;
            width: 16px;
            border-radius: 9999px;
            pointer-events: auto;
            -webkit-appearance: none;
            background: #6a42db;
          }
        `}
      </style>
    </>
  );
}
