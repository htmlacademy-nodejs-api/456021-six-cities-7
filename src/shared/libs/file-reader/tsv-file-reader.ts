import { readFileSync } from 'node:fs';

import { FileReader } from './file-reader.interface.js';
import { Offer, OfferType } from '../../types/index.js';
import { Features } from '../../types/features.enum.js';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(
    private readonly filename: string
  ) {}

  private validateRawData(): void {
    if (! this.rawData) {
      throw new Error('File was not read');
    }
  }

  private parseRawDataToOffers(): Offer[] {
    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => this.parseLineToOffer(line));
  }

  private parseLineToOffer(line: string): Offer {
    const [
      title,
      description,
      createdDate,
      cityName,
      cityLat,
      cityLon,
      preview,
      gallery,
      isPremium,
      isFavorite,
      raiting,
      type,
      roomAmount,
      guestAmount,
      price,
      features,
      user
    ] = line.split('\t');

    return {
      title,
      description,
      postDate: new Date(createdDate),
      city: {name: cityName, latitude: Number.parseFloat(cityLat), longtiude: Number.parseFloat(cityLon)},
      preview,
      gallery: this.parseGallery(gallery),
      isPremium: Boolean(isPremium),
      isFavorite: Boolean(isFavorite),
      raiting: Number.parseInt(raiting, 10),
      type: OfferType[type as 'Apartment' | 'House' | 'Room' | 'Hotel'],
      roomAmount: Number.parseInt(roomAmount, 10),
      guestAmount: Number.parseInt(guestAmount, 10),
      price: this.parsePrice(price),
      features: this.parseFeatures(features),
      user,
    };
  }

  private parseGallery(galleryString: string): { name: string }[] {
    return galleryString.split(';').map((name) => ({ name }));
  }

  private parseFeatures(featuresString: string): Features[] {
    const arr: Array<Features> = [];
    featuresString.split(';').map((feature) => {
      arr.push(Features[feature as 'Breakfast' || 'AC' || 'LFW' || 'BS' || 'Washer' || 'Towels' || 'Frige']);
    });
    return arr;
  }

  private parsePrice(priceString: string): number {
    return Number.parseInt(priceString, 10);
  }

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  public toArray(): Offer[] {
    this.validateRawData();
    return this.parseRawDataToOffers();
  }
}
