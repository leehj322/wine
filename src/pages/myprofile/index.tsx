import GlobalNavBar from "@/components/@shared/GlobalNavBar";
import ProfileCard from "@/components/myprofile/ProfileCard";
import ReviewList from "@/components/myprofile/ReviewList";
import TopBar from "@/components/myprofile/TopBar";
import WineList from "@/components/myprofile/WineList";
import { useAuth } from "@/contexts/AuthProvider";
import getReviewData from "@/libs/axios/user/getReviewData";
import getWineData from "@/libs/axios/user/getWineData";
import { MyProfileReviewData } from "@/types/review";
import { MyProfileWineData } from "@/types/wines";
import { useCallback, useEffect, useRef, useState } from "react";

export default function MyProfilePage() {
  const { user, updateMe } = useAuth(true);
  const [wineData, setWineData] = useState<MyProfileWineData | undefined>(
    undefined,
  );
  const [reviewData, setReviewData] = useState<MyProfileReviewData | undefined>(
    undefined,
  );
  const [activeTab, setActiveTab] = useState<"reviews" | "wines">("reviews");
  const observer = useRef<IntersectionObserver | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async (
    type: "reviews" | "wines",
    cursor?: number,
  ): Promise<void> => {
    setLoading(true);
    try {
      if (user) {
        if (type === "wines") {
          const wines = await getWineData(cursor);
          setWineData((prev) => {
            const newList = prev ? [...prev.list, ...wines.list] : wines.list;
            const uniqueList = Array.from(
              new Map(newList.map((item) => [item.id, item])).values(),
            ); // Set을 사용하여 중복 제거
            return {
              ...wines,
              list: uniqueList,
            };
          });
        } else {
          const reviews = await getReviewData(cursor);
          setReviewData((prev) => {
            const newList = prev
              ? [...prev.list, ...reviews.list]
              : reviews.list;
            const uniqueList = Array.from(
              new Map(newList.map((item) => [item.id, item])).values(),
            ); // Set을 사용하여 중복 제거
            return {
              ...reviews,
              list: uniqueList,
            };
          });
        }
      }
    } catch (error) {
      console.error(
        `${type === "wines" ? "와인" : "리뷰"} 데이터 불러오기 실패:`,
        error,
      );
    } finally {
      setLoading(false);
    }
  };

  const loadMoreData = useCallback(
    (type: "reviews" | "wines") => {
      if (type === "reviews" && reviewData?.nextCursor) {
        fetchData("reviews", reviewData.nextCursor);
      } else if (type === "wines" && wineData?.nextCursor) {
        fetchData("wines", wineData.nextCursor);
      }
    },
    [reviewData, wineData],
  );

  useEffect(() => {
    fetchData("reviews");
    fetchData("wines");
  }, [user]);

  useEffect(() => {
    if (observer.current) observer.current.disconnect();
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          loadMoreData(activeTab);
        }
      });
    };

    observer.current = new IntersectionObserver(observerCallback);
    const target = document.getElementById("load-more-trigger");
    if (target) {
      observer.current.observe(target);
    }

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [activeTab, reviewData, wineData]);

  const renderContent = () => {
    if (activeTab === "reviews" && reviewData) {
      return (
        <>
          <ReviewList
            reviewData={reviewData}
            setReviewData={setReviewData}
            fetchData={() => fetchData("reviews")}
          />
          {loading && <div className="hidden">로딩 중...</div>}
          <div id="load-more-trigger" className="h-px" />
        </>
      );
    }
    if (activeTab === "wines" && wineData) {
      return (
        <>
          <WineList
            wineData={wineData}
            setWineData={setWineData}
            fetchData={() => fetchData("wines")}
          />
          {loading && <div className="hidden">로딩 중...</div>}
          <div id="load-more-trigger" className="h-px" />
        </>
      );
    }
    return null;
  };

  // 이미 리디렉션했으므로 아무것도 렌더링하지 않음
  if (!user) {
    return null;
  }

  return (
    <div className="mb-[20px] mt-[20px] flex flex-col items-center gap-[20px] md:mb-[30px] md:mt-[30px] md:gap-[17px] xl:mb-[40px] xl:mt-[40px] xl:gap-[37px]">
      <div className="w-[343px] md:w-[704px] xl:w-[1140px]">
        <GlobalNavBar />
      </div>
      <div className="flex w-[343px] flex-col gap-[30px] md:w-[704px] md:gap-[40px] xl:w-[1140px] xl:flex-row xl:gap-[60px]">
        {user && <ProfileCard user={user} updateMe={updateMe} />}
        <div className="flex w-[343px] flex-col md:w-[704px] xl:w-[800px]">
          <TopBar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            reviewCount={reviewData ? reviewData.totalCount : 0}
            wineCount={wineData ? wineData.totalCount : 0}
          />
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
