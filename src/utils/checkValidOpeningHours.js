import {
    closeTimeIsGreaterThanOpenTime,
    operatingTimeLongerThan15Minutes
} from './dateValidationRules.js';

function isCloseTimeGreaterThanOpenTime(openTime, closeTime, res) {
    return closeTimeIsGreaterThanOpenTime(openTime, closeTime, res);
}

function isOperatingTimeLongerThan15Minutes(openTime, closeTime, res) {
    return operatingTimeLongerThan15Minutes(openTime, closeTime, res) >= 15;
}

function isTimeFilled(openTime, closeTime) {
    return openTime && closeTime;
}

export function checkValidOpeningHours(openingHours, res) {
    let message = 'Validated!';
    let status = 'valid';

    Object.entries(openingHours || []).some(([day, openingHour]) => {
        const { open, close } = openingHour;

        if (!isTimeFilled(open, close)) {
            message = `The opening and closing times should be filled in on "${day}". $422`;
            status = 'invalid';
            return true;
        }

        if (!isCloseTimeGreaterThanOpenTime(open, close, res)) {
            message = `The opening time must be earlier than the closing time on "${day}". $422`;
            status = 'invalid';
            return true;
        }

        if (!isOperatingTimeLongerThan15Minutes(open, close, res)) {
            message = `The opening hours must be at least 15 minutes on "${day}". $422`;
            status = 'invalid';
            return true;
        }

        return false;
    });

    return { status, message };
}
