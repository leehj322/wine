import FlavorRangeInput from "@/components/@shared/FlavorRangeInput";
import { WineFlavorInputRangeProps, WineFlavorRangeProps } from "@/types/wines";

export function WineFlavorInputRange({
  flavor,
  typeOne,
  typeTwo,
  onChange,
}: WineFlavorInputRangeProps) {
  return (
    <div className="flex items-center gap-4 whitespace-nowrap">
      <p className="min-w-14 rounded-[6px] bg-light-gray-100 px-2 py-[2px] text-center text-md-14px-semibold text-light-gray-500">
        {flavor}
      </p>
      <div className="flex w-full items-center justify-between gap-4">
        <p className="min-w-[70px] text-lg-16px-medium text-light-gray-800">
          {typeOne}
        </p>
        <div className="w-full">
          <FlavorRangeInput min={0} max={10} onChange={onChange} />
        </div>
        <p className="min-w-[56px] text-right text-lg-16px-medium text-light-gray-800">
          {typeTwo}
        </p>
      </div>
    </div>
  );
}

export function WineFlavorRange({
  flavor,
  typeOne,
  typeTwo,
  value = 0,
}: WineFlavorRangeProps) {
  return (
    <div className="flex items-center gap-4 whitespace-nowrap">
      <p className="min-w-14 rounded-[6px] bg-light-gray-100 px-2 py-[2px] text-center text-md-14px-semibold text-light-gray-500">
        {flavor}
      </p>
      <div className="flex w-full items-center justify-between gap-4">
        <p className="min-w-[70px] text-lg-16px-medium text-light-gray-800">
          {typeOne}
        </p>
        <div className="relative w-full">
          <div className="h-[6px] rounded-[50px] border border-solid border-light-gray-300 bg-light-gray-100" />
          <div
            className="absolute left-0 top-[-5px] h-[16px] w-[16px] rounded-full bg-light-purple-100"
            style={{ left: `calc(${(value / 10) * 100}% - 8px)` }}
          />
        </div>
        <p className="min-w-[56px] text-right text-lg-16px-medium text-light-gray-800">
          {typeTwo}
        </p>
      </div>
    </div>
  );
}
