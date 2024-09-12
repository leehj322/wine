import Link from "next/link";
import GlobalNavBar from "@/components/@shared/GlobalNavBar";
import Button from "@/components/@shared/Button";
import HeroImg from "@/components/landing/HeroImg";
import Head from "next/head";
import Meta from "@/components/@shared/head/Meta";
import DEPLOY_URL from "@/constants/deployUrl";
import {
  DefaultMainSlide,
  MobileMainSlide,
} from "@/components/landing/MainSlide";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>WINE</title>
        <Meta
          url={DEPLOY_URL}
          title="WINE - 나만의 와인창고"
          description="한 곳에서 관리하는 나만의 와인창고"
        />
      </Head>
      <div className="bg-light-default pb-20 pt-6">
        <header className="mx-4 max-w-[1140px] md:mx-5 xl:mx-auto">
          <GlobalNavBar />
        </header>
        <main className="mx-4 mt-6 max-w-[1140px] md:mx-5 xl:mx-auto xl:mb-[104px] xl:mt-20">
          <HeroImg />
          <DefaultMainSlide />
          <MobileMainSlide />
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
