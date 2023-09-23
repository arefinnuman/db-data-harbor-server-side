/* eslint-disable no-unused-vars */

import { Document, Model, Types } from 'mongoose';

export type UserName = {
  firstName: string;
  lastName: string;
  middleName: string;
};

export type IUser = Document & {
  employeeId: string;
  email: string;
  password: string;
  employeeCardNumber: string;
  role: 'super_admin' | 'admin' | 'maker' | 'viewer';
  team: 'team-1' | 'team-2' | 'team-3' | 'team-4' | 'team-5' | 'team-6';
  fullName: UserName;
  contactNo: string;
  alternativeContactNo: string;
  dateOfBirth: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  gender: 'male' | 'female';
  presentAddress: string;
  permanentAddress: string;
  designation: string;
  department: string;
  photo?: string;
  needsPasswordChange: true | false;
  approved: true | false;
  createdBy?: Types.ObjectId | IUser | string;
  ownCreated?: boolean;
  approvedBy?: Types.ObjectId | IUser;
  userId?: Types.ObjectId;
};

export type UserModel = {
  isUserExist(
    employeeId: string,
  ): Promise<
    Pick<
      IUser,
      | 'id'
      | 'employeeId'
      | 'email'
      | 'password'
      | 'role'
      | 'team'
      | 'needsPasswordChange'
      | 'approved'
      | 'fullName'
    >
  >;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string,
  ): Promise<boolean>;
} & Model<IUser>;

export type IUserFilters = {
  searchTerm?: string;
  id?: string;
  email?: string;
  contactNo?: string;
  emergencyContactNo?: string;
  gender?: 'male' | 'female';
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  managementDepartment?: string;
  designation?: string;
};
