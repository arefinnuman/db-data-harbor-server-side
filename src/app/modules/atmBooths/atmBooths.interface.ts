import { Model } from 'mongoose';

export type IAtmBooth = {
  name: string;
};

export type AtmBoothModel = Model<IAtmBooth, Record<string, unknown>>;
