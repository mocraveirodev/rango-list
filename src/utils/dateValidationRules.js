import errorHandler from '../utils/errorHandler.js';
import dotenv from 'dotenv';
dotenv.config();

const isValidTime = (time) => {
    const VALID_HOUR = process.env.REGEX_VALID_HOUR;

    return VALID_HOUR.test(time);
}

const convertTimeToDate = (time, res) => {
    if (!isValidTime(time)) {
        throw errorHandler('Time format is different from "HH:mm". $422', res);
    }

    const hourObject = {
        hours: Number(time.split(':')[0]),
        minutes: Number(time.split(':')[1]),
    };

    const completeDate = new Date(
        new Date().setHours(hourObject.hours, hourObject.minutes, 0),
    );

    return completeDate;
}

const closeTimeIsGreaterThanOpenTime = (open, close, res) => {
    const openDatetime = convertTimeToDate(open, res);
    const closeDatetime = convertTimeToDate(close, res);

    return closeDatetime > openDatetime;
}

export default {
    closeTimeIsGreaterThanOpenTime
};