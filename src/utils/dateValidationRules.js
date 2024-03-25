import errorHandler from '../utils/errorHandler.js';
import dotenv from 'dotenv';
dotenv.config();

const isValidTime = (time) => {
    const VALID_HOUR = new RegExp(process.env.REGEX_VALID_HOUR);

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


const intervalInMinutes = (startDate, endDate) => {
    const intervalInMs = Math.abs(endDate - startDate);
    const intervalInMinutes = Math.floor(intervalInMs / 1000 / 60);

    return intervalInMinutes;
}

const closeTimeIsGreaterThanOpenTime = (open, close, res) => {
    const openDatetime = convertTimeToDate(open, res);
    const closeDatetime = convertTimeToDate(close, res);

    return closeDatetime > openDatetime;
}

const finishDateIsGreaterThanStartDate = (start_date, finish_date) => {
    return finish_date > start_date;
}

const operatingTimeLongerThan15Minutes = (open, close, res) => {
    const openDatetime = convertTimeToDate(open, res);
    const closeDatetime = convertTimeToDate(close, res);

    return intervalInMinutes(closeDatetime, openDatetime);
}

export {
    closeTimeIsGreaterThanOpenTime,
    operatingTimeLongerThan15Minutes,
    intervalInMinutes,
    finishDateIsGreaterThanStartDate
};