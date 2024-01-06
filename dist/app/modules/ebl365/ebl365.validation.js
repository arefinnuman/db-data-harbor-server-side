"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ebl365Validation = void 0;
const zod_1 = require("zod");
const createEbl365ZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        ebl365Name: zod_1.z
            .string({
            required_error: 'Ebl365 name is required',
        })
            .min(3, 'Ebl365 name must be at least 3 characters')
            .max(50, 'Ebl365 name must be at most 50 characters'),
        ebl365Address: zod_1.z
            .string({
            required_error: 'Ebl365 address is required',
        })
            .min(3, 'Ebl365 address must be at least 3 characters')
            .max(50, 'Ebl365 address must be at most 50 characters'),
        ebl365Zone: zod_1.z
            .string({
            required_error: 'Ebl365 zone is required',
        })
            .min(3, 'Ebl365 zone must be at least 3 characters')
            .max(50, 'Ebl365 zone must be at most 50 characters'),
        ebl365NameInBengali: zod_1.z
            .string({
            required_error: 'Ebl365 name in bengali is required',
        })
            .min(3, 'Ebl365 name in bengali must be at least 3 characters')
            .max(100, 'Ebl365 name in bengali must be at most 100 characters'),
        ebl365StatusType: zod_1.z
            .string({
            required_error: 'Ebl365 status type is required',
        })
            .min(3, 'Ebl365 status type must be at least 3 characters')
            .max(50, 'Ebl365 status type must be at most 50 characters'),
        locationType: zod_1.z
            .string({
            required_error: 'Location type is required',
        })
            .min(3, 'Location type must be at least 3 characters')
            .max(50, 'Location type must be at most 50 characters'),
        areaType: zod_1.z
            .string({
            required_error: 'Area type is required',
        })
            .min(3, 'Area type must be at least 3 characters')
            .max(50, 'Area type must be at most 50 characters'),
        areaName: zod_1.z
            .string({
            required_error: 'Area name is required',
        })
            .min(3, 'Area name must be at least 3 characters')
            .max(50, 'Area name must be at most 50 characters'),
        branchControllingGl: zod_1.z
            .string({
            required_error: 'Branch controlling gl is required',
        })
            .min(3, 'Branch controlling gl must be at least 3 characters')
            .max(50, 'Branch controlling gl must be at most 50 characters'),
        division: zod_1.z
            .string({
            required_error: 'Division is required',
        })
            .min(3, 'Division must be at least 3 characters')
            .max(50, 'Division must be at most 50 characters'),
        postalCOde: zod_1.z
            .string({
            required_error: 'Postal code is required',
        })
            .min(3, 'Postal code must be at least 3 characters')
            .max(50, 'Postal code must be at most 50 characters'),
        nearestFamousPlace: zod_1.z
            .string({
            required_error: 'Nearest famous place is required',
        })
            .min(3, 'Nearest famous place must be at least 3 characters')
            .max(50, 'Nearest famous place must be at most 50 characters'),
        divisionId: zod_1.z
            .string({
            required_error: 'Division id is required',
        })
            .min(3, 'Division id must be at least 3 characters')
            .max(50, 'Division id must be at most 50 characters'),
        districtId: zod_1.z
            .string({
            required_error: 'District id is required',
        })
            .min(3, 'District id must be at least 3 characters')
            .max(50, 'District id must be at most 50 characters'),
        upazilaOrThana: zod_1.z
            .string({
            required_error: 'Upazila or thana is required',
        })
            .min(3, 'Upazila or thana must be at least 3 characters')
            .max(50, 'Upazila or thana must be at most 50 characters'),
        controlledBy: zod_1.z
            .string({
            required_error: 'Controlled by is required',
        })
            .min(3, 'Controlled by must be at least 3 characters')
            .max(50, 'Controlled by must be at most 50 characters'),
    }),
});
const updateEbl365ZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        ebl365Name: zod_1.z
            .string({
            required_error: 'Ebl365 name is required',
        })
            .min(3, 'Ebl365 name must be at least 3 characters')
            .max(50, 'Ebl365 name must be at most 50 characters')
            .optional(),
        ebl365Address: zod_1.z
            .string({
            required_error: 'Ebl365 address is required',
        })
            .min(3, 'Ebl365 address must be at least 3 characters')
            .max(50, 'Ebl365 address must be at most 50 characters')
            .optional(),
        ebl365Zone: zod_1.z
            .string({
            required_error: 'Ebl365 zone is required',
        })
            .min(3, 'Ebl365 zone must be at least 3 characters')
            .max(50, 'Ebl365 zone must be at most 50 characters')
            .optional(),
        ebl365NameInBengali: zod_1.z
            .string({
            required_error: 'Ebl365 name in bengali is required',
        })
            .min(3, 'Ebl365 name in bengali must be at least 3 characters')
            .max(500, 'Ebl365 name in bengali must be at most 100 characters')
            .optional(),
        ebl365StatusType: zod_1.z
            .string({
            required_error: 'Ebl365 status type is required',
        })
            .min(3, 'Ebl365 status type must be at least 3 characters')
            .max(50, 'Ebl365 status type must be at most 50 characters')
            .optional(),
        locationType: zod_1.z
            .string({
            required_error: 'Location type is required',
        })
            .min(3, 'Location type must be at least 3 characters')
            .max(50, 'Location type must be at most 50 characters')
            .optional(),
        areaType: zod_1.z
            .string({
            required_error: 'Area type is required',
        })
            .min(3, 'Area type must be at least 3 characters')
            .max(50, 'Area type must be at most 50 characters')
            .optional(),
        areaName: zod_1.z
            .string({
            required_error: 'Area name is required',
        })
            .min(3, 'Area name must be at least 3 characters')
            .max(50, 'Area name must be at most 50 characters')
            .optional(),
        geoLatitude: zod_1.z
            .number({
            required_error: 'Geo latitude is required',
        })
            .min(3, 'Geo latitude must be at least 3 characters')
            .max(50, 'Geo latitude must be at most 50 characters')
            .optional(),
        geoLongitude: zod_1.z
            .number({
            required_error: 'Geo longitude is required',
        })
            .min(3, 'Geo longitude must be at least 3 characters')
            .max(50, 'Geo longitude must be at most 50 characters')
            .optional(),
        branchControllingGl: zod_1.z
            .string({
            required_error: 'Branch controlling gl is required',
        })
            .min(3, 'Branch controlling gl must be at least 3 characters')
            .max(50, 'Branch controlling gl must be at most 50 characters')
            .optional(),
        division: zod_1.z
            .string({
            required_error: 'Division is required',
        })
            .min(3, 'Division must be at least 3 characters')
            .max(50, 'Division must be at most 50 characters')
            .optional(),
        postalCOde: zod_1.z
            .string({
            required_error: 'Postal code is required',
        })
            .min(3, 'Postal code must be at least 3 characters')
            .max(50, 'Postal code must be at most 50 characters')
            .optional(),
        nearestFamousPlace: zod_1.z
            .string({
            required_error: 'Nearest famous place is required',
        })
            .min(3, 'Nearest famous place must be at least 3 characters')
            .max(50, 'Nearest famous place must be at most 50 characters')
            .optional(),
        divisionId: zod_1.z
            .string({
            required_error: 'Division id is required',
        })
            .min(3, 'Division id must be at least 3 characters')
            .max(50, 'Division id must be at most 50 characters')
            .optional(),
        districtId: zod_1.z
            .string({
            required_error: 'District id is required',
        })
            .min(3, 'District id must be at least 3 characters')
            .max(50, 'District id must be at most 50 characters')
            .optional(),
        upazilaOrThana: zod_1.z
            .string({
            required_error: 'Upazila or thana is required',
        })
            .min(3, 'Upazila or thana must be at least 3 characters')
            .max(50, 'Upazila or thana must be at most 50 characters')
            .optional(),
        controlledBy: zod_1.z
            .string({
            required_error: 'Controlled by is required',
        })
            .min(3, 'Controlled by must be at least 3 characters')
            .max(50, 'Controlled by must be at most 50 characters')
            .optional(),
    }),
});
exports.Ebl365Validation = {
    createEbl365ZodSchema,
    updateEbl365ZodSchema,
};
