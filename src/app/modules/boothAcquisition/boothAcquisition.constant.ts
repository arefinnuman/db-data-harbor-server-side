import { IBoothAcquisition } from './boothAcquisition.interface';

export const cleanData = (data: IBoothAcquisition[]): IBoothAcquisition[] => {
  return data.map(entry => ({
    ...entry,
    boardMemo: entry.boardMemo.replace('uploads\\', ''),
    agreementBetweenEblAndBoothOwner:
      entry.agreementBetweenEblAndBoothOwner.replace('uploads\\', ''),
  })) as IBoothAcquisition[];
};

export const cleanSingleData = (
  entry: IBoothAcquisition,
): IBoothAcquisition => {
  return {
    _id: entry._id,
    boardMemo: entry.boardMemo.replace('uploads\\', ''),
    agreementBetweenEblAndBoothOwner:
      entry.agreementBetweenEblAndBoothOwner.replace('uploads\\', ''),
    ebl365: entry.ebl365,
    landOwnerName: entry.landOwnerName,
    landOwnerAddress: entry.landOwnerAddress,
    landOwnerPhone: entry.landOwnerPhone,
    landOwnerEmail: entry.landOwnerEmail,
    boothMonthlyRent: entry.boothMonthlyRent,
    boothLocation: entry.boothLocation,
    boothSize: entry.boothSize,
    boothType: entry.boothType,
    boothContractYear: entry.boothContractYear,
    boothExpiryDate: entry.boothExpiryDate,
    createdBy: entry.createdBy,
    approved: entry.approved,
    approvedBy: entry.approvedBy,
  } as IBoothAcquisition;
};
