import Image from "next/image";

interface MobileMainImageProps {
  imageSrc: string;
  imageAlt: string;
}

function MobileMainImage({ imageSrc, imageAlt }: MobileMainImageProps) {
  return (
    <div className="relative pb-[123%]">
      <Image fill src={imageSrc} alt={imageAlt} />
    </div>
  );
}

const MOBILE_MAIN_IMAGE_VALUE = [
  {
    imageSrc: "/images/landing/sm_main_recommend.png",
    imageAlt: "와인 추천 소개 이미지",
  },
  {
    imageSrc: "/images/landing/sm_main_filter.png",
    imageAlt: "필터 기능 소개 이미지",
  },
  {
    imageSrc: "/images/landing/sm_main_review.png",
    imageAlt: "리뷰 시스템 소개 이미지",
  },
];

export default function MobileMain() {
  return (
    <section className="mb-16 mt-12 block md:hidden">
      {MOBILE_MAIN_IMAGE_VALUE.map((value) => (
        <MobileMainImage
          key={value.imageAlt}
          imageSrc={value.imageSrc}
          imageAlt={value.imageAlt}
        />
      ))}
    </section>
  );
}
