import Image from "next/image";
import Carousel from "./Carousel";

const IMAGE_ITEMS_VALUES = [
  {
    width: 699,
    height: 320,
    src: "/images/landing/lg_main_recommend.png",
    mobileSrc: "/images/landing/sm_main_recommend.png",
    alt: "와인 추천 소개 이미지",
  },
  {
    width: 640,
    height: 320,
    src: "/images/landing/lg_main_filter.png",
    mobileSrc: "/images/landing/sm_main_filter.png",
    alt: "필터 기능 소개 이미지",
  },
  {
    width: 640,
    height: 320,
    src: "/images/landing/lg_main_review.png",
    mobileSrc: "/images/landing/sm_main_review.png",
    alt: "리뷰 시스템 소개 이미지",
  },
];

export function DefaultMainSlide() {
  return (
    <section className="hidden md:mx-auto md:mb-20 md:mt-20 md:block xl:mb-24 xl:mt-40">
      <Carousel>
        {IMAGE_ITEMS_VALUES.map((itemValue) => (
          <div key={itemValue.alt}>
            <Image
              width={itemValue.width}
              height={itemValue.height}
              src={itemValue.src}
              alt={itemValue.alt}
              quality={100}
            />
          </div>
        ))}
      </Carousel>
    </section>
  );
}

export function MobileMainSlide() {
  return (
    <section className="mb-16 mt-12 block md:hidden">
      <Carousel>
        {IMAGE_ITEMS_VALUES.map((itemValue) => (
          <div key={itemValue.alt} className="relative pb-[123%]">
            <Image
              fill
              src={itemValue.mobileSrc}
              alt={itemValue.alt}
              quality={100}
            />
          </div>
        ))}
      </Carousel>
    </section>
  );
}
