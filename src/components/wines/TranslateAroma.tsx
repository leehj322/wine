export function translateAroma(aroma: string[]): string[] {
  const translationMap: Record<string, string> = {
    체리: "CHERRY",
    베리: "BERRY",
    오크: "OAK",
    바닐라: "VANILLA",
    후추: "PEPPER",
    제빵: "BAKING",
    풀: "GRASS",
    사과: "APPLE",
    복숭아: "PEACH",
    시트러스: "CITRUS",
    트로피컬: "TROPICAL",
    미네랄: "MINERAL",
    꽃: "FLOWER",
    담뱃잎: "TOBACCO",
    흙: "EARTH",
    초콜릿: "CHOCOLATE",
    스파이스: "SPICE",
    카라멜: "CARAMEL",
    가죽: "LEATHER",
  };

  return aroma.map((item) => translationMap[item] || item);
}

export function translateAromaReverse(aroma: string[]): string[] {
  const translationMap: Record<string, string> = {
    CHERRY: "체리",
    BERRY: "베리",
    OAK: "오크",
    VANILLA: "바닐라",
    PEPPER: "후추",
    BAKING: "제빵",
    GRASS: "풀",
    APPLE: "사과",
    PEACH: "복숭아",
    CITRUS: "시트러스",
    TROPICAL: "트로피컬",
    MINERAL: "미네랄",
    FLOWER: "꽃",
    TOBACCO: "담뱃잎",
    EARTH: "흙",
    CHOCOLATE: "초콜릿",
    SPICE: "스파이스",
    CARAMEL: "카라멜",
    LEATHER: "가죽",
  };

  return aroma.map((item) => translationMap[item] || item);
}
