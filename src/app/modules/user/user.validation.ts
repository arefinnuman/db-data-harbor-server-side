import { z } from 'zod';
import { bloodGroup, gender } from '../../../constants/employee.constant';

const createUserZodSchema = z.object({
  body: z.object({
    employeeId: z.string().optional(),

    email: z.string(),

    password: z.string(),

    employeeCardNumber: z.string(),

    role: z
      .enum(['admin', 'viewer', 'maker', 'super_admin'] as const, {
        required_error: 'Role is required',
      })
      .optional(),

    team: z
      .enum(
        ['team-1', 'team-2', 'team-3', 'team-4', 'team-5', 'team-6'] as const,
        {
          required_error: 'Team is required',
        },
      )
      .optional(),

    fullName: z.object({
      firstName: z
        .string({
          required_error: 'First name is required',
        })
        .nonempty(),

      lastName: z
        .string({
          required_error: 'Last name is required',
        })
        .nonempty(),

      middleName: z.string().optional(),
    }),

    contactNo: z
      .string({
        required_error: 'Contact number is required',
      })
      .nonempty(),

    alternativeContactNo: z
      .string({
        required_error: 'Alternative contact number is required',
      })
      .nonempty(),

    dateOfBirth: z
      .string({
        required_error: 'Date of birth is required',
      })
      .nonempty(),

    gender: z.enum([...gender] as [string, ...string[]], {
      required_error: 'Gender is required',
    }),

    bloodGroup: z.enum([...bloodGroup] as [string, ...string[]], {
      required_error: 'Blood group is required',
    }),

    presentAddress: z
      .string({
        required_error: 'Present address is required',
      })
      .nonempty(),

    permanentAddress: z
      .string({
        required_error: 'Permanent address is required',
      })
      .nonempty(),

    designation: z.string({
      required_error: 'Designation is required',
    }),

    department: z
      .string({
        required_error: 'Department is required',
      })
      .nonempty(),

    photo: z.string().optional(),

    needsPasswordChange: z.boolean().optional(),

    approvedByAdmin: z.boolean().optional(),
  }),
});

const updateUserZodSchema = z.object({
  body: z.object({
    fullName: z.object({
      firstName: z.string(),
      lastName: z.string(),
      middleName: z.string(),
    }),
    dateOfBirth: z.string(),

    gender: z.string(),

    bloodGroup: z.string(),

    email: z.string().email(),

    contactNo: z.string(),

    emergencyContactNo: z.string(),

    presentAddress: z.string(),

    permanentAddress: z.string(),

    department: z.string(),

    designation: z.string(),

    profileImage: z.string(),
  }),
});

export const UserValidation = {
  createUserZodSchema,
  updateUserZodSchema,
};
