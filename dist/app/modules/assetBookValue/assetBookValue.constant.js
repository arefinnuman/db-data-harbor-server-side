"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.daysToYearsMonthsDays = exports.AssetBookValueSearchableFields = exports.AssetBookValueFilterableFields = void 0;
exports.AssetBookValueFilterableFields = ['searchTerm', 'id', 'terminal'];
exports.AssetBookValueSearchableFields = [];
function daysToYearsMonthsDays(days) {
    const daysInYear = 365.25;
    const daysInMonth = 30.44;
    const years = Math.floor(days / daysInYear);
    days -= years * daysInYear;
    const months = Math.floor(days / daysInMonth);
    days -= months * daysInMonth;
    return `${years} years, ${months} months, and ${Math.round(days)} days`;
}
exports.daysToYearsMonthsDays = daysToYearsMonthsDays;
