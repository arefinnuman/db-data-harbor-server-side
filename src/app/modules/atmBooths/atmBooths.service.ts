import { IAtmBooth } from './atmBooths.interface';
import { AtmBooth } from './atmBooths.model';

const createAtmBooth = async (
  atmBooth: IAtmBooth,
): Promise<IAtmBooth | null> => {
  const newBranch = await AtmBooth.create(atmBooth);
  return newBranch;
};

export const AtmBoothsService = {
  createAtmBooth,
};
