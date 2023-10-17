import { z } from 'zod';

const createEbl365ZodSchema = z.object({
  body: z.object({
    ebl365Name: z
      .string({
        required_error: 'Ebl365 name is required',
      })
      .min(3, 'Ebl365 name must be at least 3 characters')
      .max(50, 'Ebl365 name must be at most 50 characters'),
    ebl365Address: z
      .string({
        required_error: 'Ebl365 address is required',
      })
      .min(3, 'Ebl365 address must be at least 3 characters')
      .max(50, 'Ebl365 address must be at most 50 characters'),
    ebl365Zone: z
      .string({
        required_error: 'Ebl365 zone is required',
      })
      .min(3, 'Ebl365 zone must be at least 3 characters')
      .max(50, 'Ebl365 zone must be at most 50 characters'),
    ebl365NameInBengali: z
      .string({
        required_error: 'Ebl365 name in bengali is required',
      })
      .min(3, 'Ebl365 name in bengali must be at least 3 characters')
      .max(100, 'Ebl365 name in bengali must be at most 100 characters'),
    ebl365StatusType: z
      .string({
        required_error: 'Ebl365 status type is required',
      })
      .min(3, 'Ebl365 status type must be at least 3 characters')
      .max(50, 'Ebl365 status type must be at most 50 characters'),
    locationType: z
      .string({
        required_error: 'Location type is required',
      })
      .min(3, 'Location type must be at least 3 characters')
      .max(50, 'Location type must be at most 50 characters'),
    areaType: z
      .string({
        required_error: 'Area type is required',
      })
      .min(3, 'Area type must be at least 3 characters')
      .max(50, 'Area type must be at most 50 characters'),
    areaName: z
      .string({
        required_error: 'Area name is required',
      })
      .min(3, 'Area name must be at least 3 characters')
      .max(50, 'Area name must be at most 50 characters'),

    geoLatitude: z.any({}).optional(),
    geoLongitude: z.any({}).optional(),

    branchControllingGl: z
      .string({
        required_error: 'Branch controlling gl is required',
      })
      .min(3, 'Branch controlling gl must be at least 3 characters')
      .max(50, 'Branch controlling gl must be at most 50 characters'),
    division: z
      .string({
        required_error: 'Division is required',
      })
      .min(3, 'Division must be at least 3 characters')
      .max(50, 'Division must be at most 50 characters'),
    postalCOde: z
      .string({
        required_error: 'Postal code is required',
      })
      .min(3, 'Postal code must be at least 3 characters')
      .max(50, 'Postal code must be at most 50 characters'),
    nearestFamousPlace: z
      .string({
        required_error: 'Nearest famous place is required',
      })
      .min(3, 'Nearest famous place must be at least 3 characters')
      .max(50, 'Nearest famous place must be at most 50 characters'),
    divisionId: z
      .string({
        required_error: 'Division id is required',
      })
      .min(3, 'Division id must be at least 3 characters')
      .max(50, 'Division id must be at most 50 characters'),
    districtId: z
      .string({
        required_error: 'District id is required',
      })
      .min(3, 'District id must be at least 3 characters')
      .max(50, 'District id must be at most 50 characters'),
    upazilaOrThana: z
      .string({
        required_error: 'Upazila or thana is required',
      })
      .min(3, 'Upazila or thana must be at least 3 characters')
      .max(50, 'Upazila or thana must be at most 50 characters'),
    controlledBy: z
      .string({
        required_error: 'Controlled by is required',
      })
      .min(3, 'Controlled by must be at least 3 characters')
      .max(50, 'Controlled by must be at most 50 characters'),
  }),
});

const updateEbl365ZodSchema = z.object({
  body: z.object({
    ebl365Name: z
      .string({
        required_error: 'Ebl365 name is required',
      })
      .min(3, 'Ebl365 name must be at least 3 characters')
      .max(50, 'Ebl365 name must be at most 50 characters')
      .optional(),
    ebl365Address: z
      .string({
        required_error: 'Ebl365 address is required',
      })
      .min(3, 'Ebl365 address must be at least 3 characters')
      .max(50, 'Ebl365 address must be at most 50 characters')
      .optional(),
    ebl365Zone: z
      .string({
        required_error: 'Ebl365 zone is required',
      })
      .min(3, 'Ebl365 zone must be at least 3 characters')
      .max(50, 'Ebl365 zone must be at most 50 characters')
      .optional(),
    ebl365NameInBengali: z
      .string({
        required_error: 'Ebl365 name in bengali is required',
      })
      .min(3, 'Ebl365 name in bengali must be at least 3 characters')
      .max(500, 'Ebl365 name in bengali must be at most 100 characters')
      .optional(),
    ebl365StatusType: z
      .string({
        required_error: 'Ebl365 status type is required',
      })
      .min(3, 'Ebl365 status type must be at least 3 characters')
      .max(50, 'Ebl365 status type must be at most 50 characters')
      .optional(),
    locationType: z
      .string({
        required_error: 'Location type is required',
      })
      .min(3, 'Location type must be at least 3 characters')
      .max(50, 'Location type must be at most 50 characters')
      .optional(),
    areaType: z
      .string({
        required_error: 'Area type is required',
      })
      .min(3, 'Area type must be at least 3 characters')
      .max(50, 'Area type must be at most 50 characters')
      .optional(),
    areaName: z
      .string({
        required_error: 'Area name is required',
      })
      .min(3, 'Area name must be at least 3 characters')
      .max(50, 'Area name must be at most 50 characters')
      .optional(),
    geoLatitude: z
      .number({
        required_error: 'Geo latitude is required',
      })
      .min(3, 'Geo latitude must be at least 3 characters')
      .max(50, 'Geo latitude must be at most 50 characters')
      .optional(),
    geoLongitude: z
      .number({
        required_error: 'Geo longitude is required',
      })
      .min(3, 'Geo longitude must be at least 3 characters')
      .max(50, 'Geo longitude must be at most 50 characters')
      .optional(),
    branchControllingGl: z
      .string({
        required_error: 'Branch controlling gl is required',
      })
      .min(3, 'Branch controlling gl must be at least 3 characters')
      .max(50, 'Branch controlling gl must be at most 50 characters')
      .optional(),
    division: z
      .string({
        required_error: 'Division is required',
      })
      .min(3, 'Division must be at least 3 characters')
      .max(50, 'Division must be at most 50 characters')
      .optional(),
    postalCOde: z
      .string({
        required_error: 'Postal code is required',
      })
      .min(3, 'Postal code must be at least 3 characters')
      .max(50, 'Postal code must be at most 50 characters')
      .optional(),
    nearestFamousPlace: z
      .string({
        required_error: 'Nearest famous place is required',
      })
      .min(3, 'Nearest famous place must be at least 3 characters')
      .max(50, 'Nearest famous place must be at most 50 characters')
      .optional(),
    divisionId: z
      .string({
        required_error: 'Division id is required',
      })
      .min(3, 'Division id must be at least 3 characters')
      .max(50, 'Division id must be at most 50 characters')
      .optional(),
    districtId: z
      .string({
        required_error: 'District id is required',
      })
      .min(3, 'District id must be at least 3 characters')
      .max(50, 'District id must be at most 50 characters')
      .optional(),
    upazilaOrThana: z
      .string({
        required_error: 'Upazila or thana is required',
      })
      .min(3, 'Upazila or thana must be at least 3 characters')
      .max(50, 'Upazila or thana must be at most 50 characters')
      .optional(),
    controlledBy: z
      .string({
        required_error: 'Controlled by is required',
      })
      .min(3, 'Controlled by must be at least 3 characters')
      .max(50, 'Controlled by must be at most 50 characters')
      .optional(),
  }),
});

export const Ebl365Validation = {
  createEbl365ZodSchema,
  updateEbl365ZodSchema,
};
