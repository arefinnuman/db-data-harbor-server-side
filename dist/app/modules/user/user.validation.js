"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const employee_constant_1 = require("../../../constants/employee.constant");
const createUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        employeeId: zod_1.z.string().optional(),
        email: zod_1.z.string(),
        password: zod_1.z.string(),
        employeeCardNumber: zod_1.z.string(),
        role: zod_1.z
            .enum(['admin', 'viewer', 'maker', 'super_admin'], {
            required_error: 'Role is required',
        })
            .optional(),
        team: zod_1.z
            .enum(['team-1', 'team-2', 'team-3', 'team-4', 'team-5', 'team-6'], {
            required_error: 'Team is required',
        })
            .optional(),
        fullName: zod_1.z.object({
            firstName: zod_1.z
                .string({
                required_error: 'First name is required',
            })
                .nonempty(),
            lastName: zod_1.z
                .string({
                required_error: 'Last name is required',
            })
                .nonempty(),
            middleName: zod_1.z.string().optional(),
        }),
        contactNo: zod_1.z
            .string({
            required_error: 'Contact number is required',
        })
            .nonempty(),
        alternativeContactNo: zod_1.z
            .string({
            required_error: 'Alternative contact number is required',
        })
            .nonempty(),
        dateOfBirth: zod_1.z
            .string({
            required_error: 'Date of birth is required',
        })
            .nonempty(),
        gender: zod_1.z.enum([...employee_constant_1.gender], {
            required_error: 'Gender is required',
        }),
        bloodGroup: zod_1.z.enum([...employee_constant_1.bloodGroup], {
            required_error: 'Blood group is required',
        }),
        presentAddress: zod_1.z
            .string({
            required_error: 'Present address is required',
        })
            .nonempty(),
        permanentAddress: zod_1.z
            .string({
            required_error: 'Permanent address is required',
        })
            .nonempty(),
        designation: zod_1.z.string({
            required_error: 'Designation is required',
        }),
        department: zod_1.z
            .string({
            required_error: 'Department is required',
        })
            .nonempty(),
        photo: zod_1.z.string().optional(),
        needsPasswordChange: zod_1.z.boolean().optional(),
        approvedByAdmin: zod_1.z.boolean().optional(),
    }),
});
const updateUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        fullName: zod_1.z.object({
            firstName: zod_1.z.string(),
            lastName: zod_1.z.string(),
            middleName: zod_1.z.string(),
        }),
        dateOfBirth: zod_1.z.string(),
        gender: zod_1.z.string(),
        bloodGroup: zod_1.z.string(),
        email: zod_1.z.string().email(),
        contactNo: zod_1.z.string(),
        emergencyContactNo: zod_1.z.string(),
        presentAddress: zod_1.z.string(),
        permanentAddress: zod_1.z.string(),
        department: zod_1.z.string(),
        designation: zod_1.z.string(),
        profileImage: zod_1.z.string(),
    }),
});
exports.UserValidation = {
    createUserZodSchema,
    updateUserZodSchema,
};
