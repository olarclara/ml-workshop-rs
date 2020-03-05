export interface GameInterface {
  id: string;
  slug: string;
  title: string;
  imageUrl: string;
  releaseDateOrder: string;
  currentPrice: number;
}

export interface UserInterface {
  id: string;
  name: string;
}

export interface GameReviewInterface {
  id: string;
  avgRating?: string;
  reviews: {
    rating: number;
    userId: string;
  }[];
}

export enum Options {
  POPULARITY = "POPULARITY",
  PRICE_ASCENDING = "PRICE_ASCENDING",
  RELEASE_DATE = "RELEASE_DATE"
}
