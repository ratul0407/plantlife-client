export interface User {
  isActive: string;
  isDeleted: boolean;
  _id: string;
  name: string;
  email: string;
  isVerified: boolean;
  coins: number;
  picture?: string;
  role: string;
  auths: Auth[];
  reviews: any[];
  recentlyViewed: any[];
  questions: any[];
  createdAt: string;
  updatedAt: string;
}

export interface Auth {
  provider: string;
  providerId: string;
  _id: string;
}
