import Rating from "@/components/@shared/Rating";

export default function WineDetailPage() {
  return (
    <>
      <div>와인 상세 페이지</div>

      <Rating rating={3.5} height={24} width={120} />
    </>
  );
}
