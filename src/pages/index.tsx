import Link from "next/link";
import GlobalNavBar from "@/components/@shared/GlobalNavBar";
import Button from "@/components/@shared/Button";
import HeroImg from "@/components/landing/HeroImg";
import MobileMain from "@/components/landing/MobileMain";
import DefaultMain from "@/components/landing/DefaultMain";
import Head from "next/head";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>WINE</title>

        <meta property="og:locale" content="ko_KR" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://wine-nine-xi.vercel.app/" />
        <meta property="og:site_name" content="WINE" />
        <meta property="og:title" content="WINE - 나만의 와인창고" />
        <meta
          property="og:description"
          content="한 곳에서 관리하는 나만의 와인창고"
        />
        <meta property="og:image" content="/images/landing/lg_main_hero.png" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="WINE - 나만의 와인창고" />
        <meta
          name="twitter:description"
          content="한 곳에서 관리하는 나만의 와인창고"
        />
        <meta name="twitter:image" content="/images/landing/lg_main_hero.png" />
      </Head>
      <div className="bg-light-default pb-20 pt-6">
        <header className="mx-4 max-w-[1140px] md:mx-5 xl:mx-auto">
          <GlobalNavBar />
        </header>
        <main className="mx-4 mt-6 max-w-[1140px] md:mx-5 xl:mx-auto xl:mb-[104px] xl:mt-20">
          <HeroImg />
          <DefaultMain />
          <MobileMain />
          <Link href="/wines" className="mx-auto block h-[50px] w-[279px]">
            <Button
              buttonStyle="purple"
              shape="pill"
              customStyle="text-lg-16px-bold"
            >
              와인 보러가기
            </Button>
          </Link>
        </main>
      </div>
    </>
  );
}
