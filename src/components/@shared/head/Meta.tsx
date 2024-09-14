import DEPLOY_URL from "@/constants/deployUrl";

interface MetaProps {
  url: string;
  title: string;
  description: string;
  image?: string;
  keywords?: string[];
}

/**
 * Meta 태그를 정리해놓은 컴포넌트
 * @param url 해당 페이지의 url (추천) 혹은 링크를 눌렀을때 이동할 url
 * @param title 해당 페이지의 제목 (og, twitter)
 * @param description 해당 페이지에 대한 설명 (og, twitter)
 * @param image 해당 페이지의 링크에 첨부될 이미지 (og, twitter)
 * @param keywords 해당 페이지의 검색 태그 ex. [와인,병,포도,산미,...]
 */
export default function Meta({
  url,
  title,
  description,
  image,
  keywords,
}: MetaProps) {
  return (
    <>
      {/* basic */}
      <link rel="canonical" href={DEPLOY_URL} />
      <meta name="description" content={description} />
      <meta
        name="keywords"
        content={`와인,${keywords?.length !== 0 ? keywords?.join(",") : ""}`}
      />
      <meta name="robots" content="index,follow" />
      <meta name="googlebot" content="index,follow" />

      {/* open graph */}
      <meta property="og:locale" content="ko_KR" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="WINE" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta
        property="og:image"
        content={image ?? "/images/landing/lg_main_hero.png"}
      />

      {/* twitter */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta
        name="twitter:image"
        content={image ?? "/images/landing/lg_main_hero.png"}
      />
    </>
  );
}
