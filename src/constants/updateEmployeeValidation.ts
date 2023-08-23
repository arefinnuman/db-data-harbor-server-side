import { z } from 'zod';

const updateEmployee = z.object({
  body: z.object({
    fullName: z
      .object({
        firstName: z.string().optional(),
        lastName: z.string().optional(),
        middleName: z.string().optional(),
      })
      .optional(),

    dateOfBirth: z.string().optional(),

    gender: z.string().optional(),

    bloodGroup: z.string().optional(),

    email: z.string().email().optional(),

    contactNo: z.string().optional(),

    emergencyContactNo: z.string().optional(),

    presentAddress: z.string().optional(),

    permanentAddress: z.string().optional(),

    department: z.string().optional(),

    designation: z.string().optional(),

    profileImage: z.string().optional(),
  }),
});
export const UpdateValidation = {
  updateEmployee,
};