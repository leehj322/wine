import Image from "next/image";
import { useEffect } from "react";
import { Wine } from "@/types/wines";
import Link from "next/link";
import Rating from "../@shared/Rating";

interface WinesProps {
  wines: Wine[];
}

interface WineProps {
  wine: Wine;
}

function WineItemCard({ wine }: WineProps) {
  return (
    <div className="flex h-[375px] w-full flex-col rounded-2xl border border-light-gray-300 bg-light-white">
      <div className="flex h-2/3 flex-row border-b px-12 max-md:px-3">
        <div className="flex w-1/6 items-end pr-5 max-md:w-1/3">
          <div className="relative h-4/5 w-4/5">
            {wine.image && <Image src={wine.image} alt="와인이미지" fill />}
          </div>
        </div>
        <div className="flex w-4/5 flex-row justify-between py-9 max-md:w-2/3 max-md:flex-col max-md:py-6">
          <div className="flex flex-col gap-2">
            <p className="text-3xl-32px-semibold text-light-gray-800 max-md:text-xl-20px-semibold">
              {wine.name}
            </p>
            <p className="text-lg-16px-regular text-light-gray-500">
              {wine.region}
            </p>
            <div className="flex h-[42px] w-[114px] items-center justify-center rounded-xl bg-light-purple-10">
              <p className="text-2lg-18px-bold text-light-purple-100">
                ₩ {wine.price.toLocaleString()}
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-between max-md:flex-row">
            <div className="flex flex-col gap-2 max-md:flex max-md:flex-row max-md:gap-5">
              <p className="text-[54px] font-extrabold text-light-gray-800 max-md:text-[28px] max-md:font-extrabold">
                {wine.avgRating ? wine.avgRating.toFixed(1) : 0}
              </p>
              <div className="flex flex-col justify-center gap-2 max-md:gap-1">
                <Rating
                  rating={wine.avgRating}
                  width={112}
                  height={24}
                  className="hidden cursor-default md:inline-block"
                />
                <Rating
                  rating={wine.avgRating}
                  width={70}
                  height={14}
                  className="inline-block cursor-default md:hidden"
                />
                <p className="text-lg-16px-regular text-light-gray-500 max-md:text-xs-12px-regular">
                  {wine.reviewCount ? `${wine.reviewCount}` : 0}
                  개의 후기
                </p>
              </div>
            </div>
            <div className="flex justify-end">
              <Image
                src="/images/ic_arrow_right.svg"
                alt="arrowIcon"
                width={36}
                height={37}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1 p-5 max-md:pt-2">
        <p className="text-lg-16px-semibold text-light-gray-800">최신후기</p>
        <p className="text-lg-16px-regular text-light-gray-500">
          {wine.recentReview?.content
            ? `${wine.recentReview?.content}`
            : "작성된 후기가 없습니다."}
        </p>
      </div>
    </div>
  );
}

export default function WineItemList({ wines }: WinesProps) {
  return (
    <div className="flex w-[800px] flex-col gap-16 max-xl:w-full">
      {wines.map((wine) => (
        <Link key={wine.id} href={`/wines/${wine.id.toString()}`}>
          <WineItemCard wine={wine} />
        </Link>
      ))}
    </div>
  );
}
