import GlobalNavBar from "@/components/@shared/GlobalNavBar";
import WineDetailCard from "@/components/wines/WineDetailCard";
import WinesReviewSection from "@/components/wines/WinesReviewSection";
import WineRatingStats from "@/components/wines/WineRatingStats";
import { useRouter } from "next/router";
import { Router } from "next/dist/client/router";
import { useEffect, useState } from "react";
import { WineData } from "@/types/wines";
import getWineById from "@/libs/axios/wine/getWineById";
import { useAuth } from "@/contexts/AuthProvider";

export default function WineDetailPage() {
  const [data, setData] = useState<WineData | null>(null);
  const router = useRouter() as Router;
  const { id } = router.query;
  useAuth(true);

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
    <div className="relative mx-10 mb-40 mt-10 xl:mx-auto xl:w-[1140px]">
      <GlobalNavBar />
      <WineDetailCard router={router} data={data} />
      <WineRatingStats data={data} />
      <WinesReviewSection data={data} />
    </div>
  );
}
