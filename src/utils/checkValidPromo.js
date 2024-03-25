import {
    finishDateIsGreaterThanStartDate,
    intervalInMinutes
} from './dateValidationRules.js'; 

export async function checkValidPromo(promo, res) {
    let message = 'Validated!';
    let status = 'valid';

    const startDate = new Date(promo.startDatetime);
    const finishDate = new Date(promo.finishDatetime);

    if (finishDateIsGreaterThanStartDate(startDate, finishDate, res)) {
        return {
            message: `The start time must be earlier than the finish time. $422`,
            status: 'invalid',
        };
    }
    if(intervalInMinutes(startDate, finishDate) < 15) {
        return {
            message: `The promotion must be at least 15 minutes. $422`,
            status: 'invalid',
        };
    }
    return {
        message,
        status,
    };
}
