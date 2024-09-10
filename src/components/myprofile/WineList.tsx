import WineCard from "./WineCard";

interface Wine {
  id: number;
  name: string;
  region: string;
  image: string;
  price: number;
  type: string;
  avgRating: number;
  reviewCount: number;
  recentReview: {
    user: {
      id: number;
      nickname: string;
      image: string;
    };
    updatedAt: string;
    createdAt: string;
    content: string;
    aroma: string[];
    rating: number;
    id: number;
  };
  userId: number;
}

interface WineData {
  totalCount: number;
  nextCursor: number;
  list: Wine[];
}

interface WineListProps {
  wineData: WineData;
}

export default function WineList({ wineData }: WineListProps) {
  if (wineData.list.length === 0) {
    return <div>등록된 와인이 없습니다.</div>;
  }
  return (
    <>
      {wineData.list.map((wine) => (
        <WineCard key={wine.id} wine={wine} />
      ))}
    </>
  );
}
