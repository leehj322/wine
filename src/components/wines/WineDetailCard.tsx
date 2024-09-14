import Image from "next/image";
import Button from "@/components/@shared/Button";
import { WineIdDataProps } from "@/types/wines";

export default function WineDetailCard({ router, data }: WineIdDataProps) {

  const handleBackPage = () => {
    router?.push("/wines");
  }

  return (
    <div className="mt-2.5 h-[302px] w-full pt-5 md:mt-5 md:pt-[42px]">
      <div className="relative flex h-[260px] w-full rounded-2xl border border-light-gray-300">
        <div className="flex h-full w-[244px] items-end justify-center">
          <div className="relative h-5/6 w-[60px]">
            <Image
              src={data.image}
              alt="와인 이미지"
              fill
            />
          </div>
        </div>
        <div>
          <div className="mr-5 mt-[52px] flex w-[200px] flex-col gap-5 md:h-[118px] md:w-[438px] xl:mr-0">
            <h1 className="line-clamp-3 md:line-clamp-2 text-xl-20px-semibold font-semibold md:text-3xl overflow-hidden">
              {data.name}
            </h1>
            <p className="line-clamp-1 truncate text-md-14px-regular text-light-gray-500 md:text-lg-16px-regular">
              {data.region}
            </p>
          </div>
          <div className="mt-2.5 inline-flex h-[37px] items-center rounded-xl bg-light-purple-10 px-2.5 py-1.5 text-md-14px-bold text-light-purple-100 md:mt-5 md:px-[15px] md:py-2 md:text-2lg-18px-bold">
            ₩ {data.price.toLocaleString()}
          </div>
        </div>
        <div className="w-10 h-10 absolute top-2 right-2">
          <Button buttonStyle="light" onClick={handleBackPage}>←</Button>
        </div>
      </div>
    </div>
  );
}
