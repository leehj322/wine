import Rating from "@/components/@shared/Rating";

export default function WineDetailPage() {
  return (
    <>
      <div>와인 상세 페이지</div>
      <Rating
        value={3.5}
        className="flex w-[110px] justify-center gap-1 text-2lg-18px-bold"
      />
    </>
  );
}
