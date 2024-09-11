import GlobalNavBar from "@/components/@shared/GlobalNavBar";
import WineDetailCard from "@/components/wines/WineDetailCard";
import WinesReviewSection from "@/components/wines/WinesReviewSection";
import WineRatingStats from "@/components/wines/WineRatingStats";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function WineDetailPage() {
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      router.replace("/signin");
    }
  }, [router]);

  return (
    <div className="relative mx-auto mb-40 mt-10 w-[343px] md:w-[704px] xl:w-[1140px]">
      <GlobalNavBar />
      <WineDetailCard />
      <WineRatingStats />
      <WinesReviewSection />
    </div>
  );
}
