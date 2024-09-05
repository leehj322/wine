export enum WineEnum {
  Red = "RED",
  White = "WHITE",
  Sparkling = "SPARKLING",
}
interface WinePrice {
  min: number;
  max: number;
}

interface User {
  id: number;
  nickname: string;
  image: string;
}

interface RecentReview {
  user: User;
  updatedAt: Date;
  createdAt: Date;
  content: string;
  aroma: string[];
  rating: number;
}

export interface PostWineDetails {
  name: string;
  region: string;
  image: string | null;
  price: number;
  type: WineEnum;
}

export interface Wine extends PostWineDetails {
  id: number;
  avgRating: number | null;
  reviewerCount: number | null;
  recentReview: RecentReview | null;
}

export interface WineFilterProps {
  wineType: WineEnum;
  winePrice: WinePrice;
  wineRating: string;
  wineName: string;
}
