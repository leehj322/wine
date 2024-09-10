import axiosInstance from "../axiosInstance";

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

export default async function getWineData() {
  const res = await axiosInstance.get<WineData>("users/me/wines", {
    params: {
      limit: 20,
    },
  });
  return res.data;
}
