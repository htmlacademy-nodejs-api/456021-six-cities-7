import { OfferType } from './offer-type.enum.js';
import { Features } from './features.enum.js';
import { City } from './city.type.js';
import { Gallery } from './gallery.type.js';

export type Offer = {
  title: string;
  description: string;
  postDate: Date;
  city: City;
  preview: string;
  gallery: Gallery[];
  isPremium: boolean;
  isFavorite: boolean;
  raiting: number;
  type: OfferType;
  roomAmount: number;
  guestAmount: number;
  price: number;
  user: string;
  features: Features[];
  // commentAmount: number;
}
