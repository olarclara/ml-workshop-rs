export interface GameInterface {
  id: string;
  slug: string;
  title: string;
  imageUrl: string;
  releaseDateOrder: string;
  currentPrice: number;
}

export enum Options {
  POPULARITY = "POPULARITY",
  PRICE_ASCENDING = "PRICE_ASCENDING",
  RELEASE_DATE = "RELEASE_DATE"
}
