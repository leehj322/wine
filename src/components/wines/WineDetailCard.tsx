import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import getWineById from "@/libs/axios/wine/getWineById";
import { WineData } from "@/types/wines";

export default function WineDetailCard() {
  const [data, setData] = useState<WineData | null>(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const getData = async () => {
      if (typeof id === "string") {
        try {
          const wineData: WineData = await getWineById(id);
          setData(wineData);
        } catch (e) {
          console.error("데이터를 불러오는데 오류가 있습니다:", e);
        }
      }
    };

    getData();
  }, [id]);

  // 코드 리팩토링 진행 시에 로딩바 애니메이션 추가 예정
  // 시간이 몇 초 이상 걸리면 에러 페이지로 넘기는 방법도 괜찮을듯
  if (!data) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="mt-2.5 h-[302px] w-full pt-5 md:mt-5 md:pt-[42px]">
      <div className="flex h-[260px] w-full rounded-2xl border border-light-gray-300">
        <div className="flex h-full w-[244px] items-end justify-center">
          <Image
            className="h-4/5"
            src={data.image}
            alt="와인 이미지"
            width={100}
            height={260}
          />
        </div>
        <div>
          <div className="mr-5 mt-[52px] flex w-[200px] flex-col gap-5 md:h-[111px] md:w-[300px] xl:mr-0">
            <h1 className="text-xl-20px-semibold font-semibold md:text-3xl">
              {data.name}
            </h1>
            <p className="text-md-14px-regular text-light-gray-500 md:text-lg-16px-regular">
              {data.region}
            </p>
          </div>
          <div className="mt-2.5 inline-flex h-[37px] items-center rounded-xl bg-light-purple-10 px-2.5 py-1.5 text-md-14px-bold text-light-purple-100 md:mt-5 md:px-[15px] md:py-2 md:text-2lg-18px-bold">
            ₩ {data.price.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}
