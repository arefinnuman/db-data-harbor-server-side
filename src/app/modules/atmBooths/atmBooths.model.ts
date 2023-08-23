import { Schema, model } from 'mongoose';
import { AtmBoothModel, IAtmBooth } from './atmBooths.interface';

const AtmBoothSchema = new Schema<IAtmBooth, AtmBoothModel>(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const AtmBooth = model<IAtmBooth, AtmBoothModel>(
  'Ebl365',
  AtmBoothSchema,
);
