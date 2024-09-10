import GlobalNavBar from "@/components/@shared/GlobalNavBar";
import ProfileCard from "@/components/myprofile/ProfileCard";
import ReviewList from "@/components/myprofile/ReviewList";
import TopBar from "@/components/myprofile/TopBar";
import WineList from "@/components/myprofile/WineList";
import { useAuth } from "@/contexts/AuthProvider";
import getReviewData from "@/libs/axios/user/getReviewData";
import getWineData from "@/libs/axios/user/getWineData";
import { useEffect, useState } from "react";

interface Review {
  id: number;
  rating: number;
  lightBold: number;
  smoothTannic: number;
  drySweet: number;
  softAcidic: number;
  aroma: string[];
  content: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: number;
    nickname: string;
    image: string;
  };
  wine: {
    id: number;
    name: string;
    region: string;
    image: string;
    price: number;
    avgRating: number;
    type: string;
  };
}

interface ReviewData {
  totalCount: number;
  nextCursor: number;
  list: Review[];
}

interface Wine {
  id: number;
  name: string;
  region: string;
  image: string;
  price: number;
  type: string;
  avgRating: number;
  reviewCount: number;
  recentReview: {
    user: {
      id: number;
      nickname: string;
      image: string;
    };
    updatedAt: string;
    createdAt: string;
    content: string;
    aroma: string[];
    rating: number;
    id: number;
  };
  userId: number;
}

interface WineData {
  totalCount: number;
  nextCursor: number;
  list: Wine[];
}

export default function MyProfilePage() {
  const { user, updateMe } = useAuth(true);
  const [wineData, setWineData] = useState<WineData | undefined>(undefined);
  const [reviewData, setReviewData] = useState<ReviewData | undefined>(
    undefined,
  );
  const [activeTab, setActiveTab] = useState<"reviews" | "wines">("reviews");

  const fetchData = async (): Promise<void> => {
    if (user) {
      try {
        const wines = await getWineData();
        setWineData(wines);
      } catch (error) {
        console.error("와인 데이터 불러오기 실패:", error);
      }

      try {
        const reviews = await getReviewData();
        setReviewData(reviews);
      } catch (error) {
        console.error("리뷰 데이터 불러오기 실패:", error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  const renderContent = () => {
    if (activeTab === "reviews" && reviewData) {
      return (
        <ReviewList
          reviewData={reviewData}
          setReviewData={setReviewData}
          fetchData={fetchData}
        />
      );
    }
    if (activeTab === "wines" && wineData) {
      return (
        <WineList
          wineData={wineData}
          setWineData={setWineData}
          fetchData={fetchData}
        />
      );
    }
    return null;
  };

  // 이미 리디렉션했으므로 아무것도 렌더링하지 않음
  if (!user) {
    return null;
  }

  return (
    <div className="flex flex-col items-center gap-[40px]">
      <div className="h-[70px] w-[1140px]">
        <GlobalNavBar />
      </div>
      <div className="flex w-[1140px] flex-row gap-[60px]">
        {user && <ProfileCard user={user} updateMe={updateMe} />}
        <div className="flex w-[800px] flex-col gap-[40px]">
          <TopBar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            reviewCount={reviewData ? reviewData.list.length : 0}
            wineCount={wineData ? wineData.list.length : 0}
          />
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
