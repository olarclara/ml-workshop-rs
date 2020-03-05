export interface GameInterface {
  id: string;
  slug: string;
  title: string;
  imageUrl: string;
  releaseDateOrder: string;
  currentPrice: number;
  avgRating?: number;
  reviews: {
    rating: number;
    userId: string;
  }[];
}

export interface UserInterface {
  id: string;
  name: string;
}

export enum Options {
  POPULARITY = "POPULARITY",
  PRICE_ASCENDING = "PRICE_ASCENDING",
  RATING = "RATING"
}
