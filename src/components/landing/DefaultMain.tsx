import Image from "next/image";

export default function DefaultMain() {
  return (
    <section className="hidden flex-col justify-center gap-24 md:mx-auto md:mb-20 md:mt-20 md:flex md:w-[699px] xl:mb-24 xl:mt-40">
      <Image
        width={699}
        height={320}
        src="/images/landing/lg_main_recommend.png"
        alt="와인 추천 소개 이미지"
      />
      <Image
        width={640}
        height={320}
        src="/images/landing/lg_main_filter.png"
        alt="필터 기능 소개 이미지"
      />
      <Image
        width={640}
        height={320}
        src="/images/landing/lg_main_review.png"
        alt="리뷰 시스템 소개 이미지"
      />
    </section>
  );
}
