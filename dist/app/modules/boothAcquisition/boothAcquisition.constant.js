"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanSingleData = exports.cleanData = void 0;
const cleanData = (data) => {
    return data.map(entry => (Object.assign(Object.assign({}, entry), { boardMemo: entry.boardMemo.replace('uploads\\', ''), agreementBetweenEblAndBoothOwner: entry.agreementBetweenEblAndBoothOwner.replace('uploads\\', '') })));
};
exports.cleanData = cleanData;
const cleanSingleData = (entry) => {
    return {
        _id: entry._id,
        boardMemo: entry.boardMemo.replace('uploads\\', ''),
        agreementBetweenEblAndBoothOwner: entry.agreementBetweenEblAndBoothOwner.replace('uploads\\', ''),
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
    };
};
exports.cleanSingleData = cleanSingleData;
