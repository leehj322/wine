export interface WineData {
  id: number;
  name: string;
  region: string;
  image: string;
  price: number;
  type: string;
  avgRating: number;
  reviewCount: number;
  avgRatings: Record<string, number>;
  reviews: WineReview[];
}

export interface WineReview {
  id: number;
  rating: number;
  lightBold: number;
  smoothTannic: number;
  drySweet: number;
  softAcidic: number;
  aroma: string[];
  content: string;
  isLiked: boolean;
  createdAt: string;
  updatedAt: string;
  user: {
    id: number;
    nickname: string;
    image: string | null;
  };
  wineId: number;
}

export interface WineFlavorInputRangeProps {
  flavor: string;
  typeOne: string;
  typeTwo: string;
  value?: number;
  onChange?: (value: number) => void | undefined;
}

export interface WineFlavorRangeProps {
  flavor: string;
  typeOne: string;
  typeTwo: string;
  value?: number;
}

export interface WineReviewModalProps {
  isOpen: boolean;
  handleModal: () => void;
  value?: number;
  reviewType: string;
  reviewName: string;
}

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
  avgRating: number;
  reviewCount: number | null;
  recentReview: RecentReview | null;
  nextCursor?: number;
}

export interface WineFilterProps {
  wineType: WineEnum;
  winePrice: WinePrice;
  wineRating: number;
}
