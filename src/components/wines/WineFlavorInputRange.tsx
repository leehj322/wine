import FlavorRangeInput from "@/components/@shared/FlavorRangeInput";
import { WineFlavorInputRangeProps, WineFlavorRangeProps } from "@/types/wines";

export function WineFlavorInputRange({
  flavor,
  typeOne,
  typeTwo,
  value,
  onChange,
}: WineFlavorInputRangeProps) {
  return (
    <div className="flex items-center gap-4 whitespace-nowrap">
      <p className="min-w-12 rounded-[6px] bg-light-gray-100 px-2 py-[2px] text-center text-xs-12px-semibold text-light-gray-500 md:min-w-14 md:text-md-14px-semibold">
        {flavor}
      </p>
      <div className="flex w-full items-center justify-between gap-4">
        <p className="min-w-[62px] text-md-14px-medium text-light-gray-800 md:min-w-[70px] md:text-lg-16px-medium">
          {typeOne}
        </p>
        <div className="w-full">
          <FlavorRangeInput
            min={0}
            max={10}
            value={value}
            onChange={onChange}
          />
        </div>
        <p className="min-w-[50px] text-right text-md-14px-medium text-light-gray-800 md:min-w-[56px] md:text-lg-16px-medium">
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
      <p className="min-w-12 rounded-[6px] bg-light-gray-100 px-2 py-[2px] text-center text-xs-12px-semibold text-light-gray-500 md:min-w-14 md:text-md-14px-semibold">
        {flavor}
      </p>
      <div className="flex w-full items-center justify-between gap-4">
        <p className="min-w-[62px] text-md-14px-medium text-light-gray-800 md:min-w-[70px] md:text-lg-16px-medium">
          {typeOne}
        </p>
        <div className="relative w-full">
          <div className="h-[6px] rounded-[50px] border border-solid border-light-gray-300 bg-light-gray-100" />
          <div
            className="absolute left-0 top-[-5px] h-4 w-4 rounded-full bg-light-purple-100"
            style={{ left: `calc(${(value / 10) * 100}% - 8px)` }}
          />
        </div>
        <p className="min-w-[50px] text-right text-md-14px-medium text-light-gray-800 md:min-w-[56px] md:text-lg-16px-medium">
          {typeTwo}
        </p>
      </div>
    </div>
  );
}
