import GlobalNavBar from "@/components/@shared/GlobalNavBar";
import WineDetailCard from "@/components/wines/WineDetailCard";
import WinesReviewSection from "@/components/wines/WinesReviewSection";
import WineRatingStats from "@/components/wines/WineRatingStats";

export default function WineDetailPage() {
  return (
    <div className="relative mx-auto mb-40 mt-10 w-[1140px]">
      <GlobalNavBar />
      <WineDetailCard />
      <WineRatingStats />
      <WinesReviewSection />
    </div>
  );
}
