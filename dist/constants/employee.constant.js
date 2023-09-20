"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bloodGroup = exports.gender = exports.employeeSearchableFields = exports.employeeFilterableFields = void 0;
exports.employeeFilterableFields = [
    'searchTerm',
    'id',
    'gender',
    'bloodGroup',
    'email',
    'contactNo',
    'alternateContactNo',
    'department',
    'designation',
];
exports.employeeSearchableFields = [
    'email',
    'contactNo',
    'emergencyContactNo',
    'name.firstName',
    'name.lastName',
    'name.middleName',
];
exports.gender = ['male', 'female'];
exports.bloodGroup = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
