// Its boothAcquisition.service.ts file:

import { IBoothAcquisition } from './boothAcquisition.interface';
import { BoothAcquisition } from './boothAcquisition.model';

const createBoothAcquisition = async (
  payload: IBoothAcquisition,
): Promise<IBoothAcquisition | null> => {
  const result = await BoothAcquisition.create(payload);
  return result;
};

export const BoothAcquisitionService = {
  createBoothAcquisition,
};

// const getAllBoothManagement = async (
//     filters: Partial<IConstantFilters>,
//     paginationOptions: IPaginationOptions,
//   ): Promise<IGenericResponse<IBoothManagement[]>> => {
//     const { searchTerm, ...filtersData } = filters;

//     const andConditions: { [x: string]: unknown }[] = [];

//     if (searchTerm) {
//       andConditions.push({
//         $or: BoothManagementSearchableFields.map((field: string) => ({
//           [field]: {
//             $regex: searchTerm,
//             $options: 'i',
//           },
//         })),
//       });
//     }

//     if (Object.keys(filtersData).length) {
//       andConditions.push({
//         $and: Object.entries(filtersData).map(([field, value]) => ({
//           [field]: value,
//         })),
//       });
//     }

//     const { page, limit, skip, sortBy, sortOrder } =
//       PaginationHelpers.calculatePagination(paginationOptions);
//     const sortConditions: { [key: string]: SortOrder } = {};

//     if (sortBy && sortOrder) {
//       sortConditions[sortBy] = sortOrder;
//     }

//     const whereConditions =
//       andConditions.length > 0
//         ? {
//             $and: andConditions,
//           }
//         : {};

//     const result = await BoothManagement.find(whereConditions)
//       .populate('ebl365')
//       .sort(sortConditions)
//       .skip(skip)
//       .limit(limit);

//     const total = await BoothManagement.countDocuments();
//     return {
//       meta: {
//         page,
//         limit,
//         total,
//       },
//       data: result,
//     };
//   };

//   const getSingleBoothManagement = async (
//     id: string,
//   ): Promise<IBoothManagement | null> => {
//     const ifExist = await BoothManagement.findOne({ _id: id });
//     if (!ifExist) {
//       throw new ApiError(httpStatus.NOT_FOUND, `BoothManagement not found`);
//     }

//     const result = await BoothManagement.findById(id).populate('ebl365');
//     if (!result) {
//       throw new ApiError(httpStatus.NOT_FOUND, `BoothManagement not found`);
//     }

//     return result;
//   };

//   const updateBoothManagement = async (
//     id: string,
//     payload: Partial<IBoothManagement>,
//   ): Promise<IBoothManagement | null> => {
//     const isExist = await BoothManagement.findOne({ _id: id });
//     if (!isExist) {
//       throw new ApiError(httpStatus.NOT_FOUND, `BoothManagement not found`);
//     }

//     const result = await BoothManagement.findOneAndUpdate({ _id: id }, payload, {
//       new: true,
//     }).populate('ebl365');

//     return result;
//   };

//   const deleteBoothManagement = async (
//     id: string,
//   ): Promise<IBoothManagement | null> => {
//     const isExist = await BoothManagement.findOne({ _id: id });
//     if (!isExist) {
//       throw new ApiError(httpStatus.NOT_FOUND, `BoothManagement not found`);
//     }

//     const result = await BoothManagement.findOneAndDelete(
//       { _id: id },
//       { new: true },
//     );
//     return result;
//   };
