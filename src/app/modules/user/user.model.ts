/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-this-alias */

import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../../config/config';
import { IUser, UserModel } from './user.interface';

const userSchema = new Schema<IUser, UserModel>(
  {
    employeeId: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    employeeCardNumber: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ['super_admin', 'admin', 'maker', 'viewer'],
      default: 'viewer',
    },
    team: {
      type: String,
      enum: ['team-1', 'team-2', 'team-3', 'team-4', 'team-5', 'team-6'],
      default: 'team-1',
    },
    password: {
      type: String,
      select: 0,
    },
    fullName: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      middleName: {
        type: String,
      },
    },
    contactNo: {
      type: String,
      required: true,
    },
    alternativeContactNo: {
      type: String,
    },
    dateOfBirth: {
      type: String,
      required: true,
    },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
    },
    presentAddress: {
      type: String,
      required: true,
    },
    permanentAddress: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    approved: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);
userSchema.statics.isUserExist = async function (
  employeeId: string,
): Promise<Pick<
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
> | null> {
  return await User.findOne(
    { employeeId },
    {
      id: 1,
      password: 1,
      employeeId: 1,
      role: 1,
      team: 1,
      needsPasswordChange: 1,
      approved: 1,
      fullName: 1,
    },
  );
};

userSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

userSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

export const User = model<IUser, UserModel>('User', userSchema);
