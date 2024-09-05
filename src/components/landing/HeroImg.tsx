import Image from "next/image";

export default function HeroImg() {
  return (
    <section className="mx-auto">
      <div className="relative hidden md:block md:pb-[47%] xl:h-[535px] xl:w-[1140px]">
        <Image
          fill
          src="/images/landing/lg_main_hero.png"
          alt="메인 히어로 이미지"
        />
      </div>
      <div className="relative block pb-[117%] md:hidden">
        <Image
          fill
          src="/images/landing/sm_main_hero.png"
          alt="메인 히어로 이미지"
        />
      </div>
    </section>
  );
}
