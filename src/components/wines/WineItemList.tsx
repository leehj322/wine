import Image from "next/image";
import { Wine } from "@/types/wines";
import Link from "next/link";

interface WinesProps {
  wines: Wine[];
}

interface WineProps {
  wine: Wine;
}

function WineItemCard({ wine }: WineProps) {
  return (
    <div className="flex h-[375px] w-full flex-col rounded-2xl border border-light-gray-300 bg-light-white">
      <div className="flex h-2/3 flex-row border-b px-12 max-[375px]:px-3">
        <div className="flex w-1/6 items-end pr-5 max-[375px]:w-1/3">
          <div className="h-4/5"> 이미지 영역 </div>
          {/* {wine.image && <Image src={wine.image} alt="와인이미지" />} */}
        </div>
        <div className="flex w-4/5 flex-row justify-between py-9 max-[375px]:w-2/3 max-[375px]:flex-col max-[375px]:gap-5 max-[375px]:py-6">
          <div className="flex flex-col gap-2">
            <p className="text-3xl-32px-semibold text-light-gray-800 max-[375px]:text-xl-20px-semibold">
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
          <div className="flex flex-col justify-between max-[375px]:flex-row">
            <div className="max-[375px]:flex max-[375px]:gap-5">
              <p className="text-3xl-32px-semibold text-light-gray-800">4.8</p>
              <p className="text-lg-16px-regular text-light-gray-500">
                {wine.reviewerCount ? `${wine.reviewerCount}` : 0}개의 후기
              </p>
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

      <div className="flex flex-col gap-1 p-5 max-[375px]:pt-2">
        <p className="text-lg-16px-semibold text-light-gray-800">최신후기</p>
        <p className="text-lg-16px-regular text-light-gray-500">
          Cherry, cocoa, vanilla and clove - beautiful red fruit driven Low
          acidity and medium tannins. Nice long velvety finish.
          {wine.recentReview?.content}
        </p>
      </div>
    </div>
  );
}

export default function WineItemList({ wines }: WinesProps) {
  return (
    <div className="flex w-full flex-col gap-16">
      {wines.map((wine) => (
        <Link key={wine.id} href={`/wines/${wine.id.toString()}`}>
          <WineItemCard wine={wine} />
        </Link>
      ))}
    </div>
  );
}
