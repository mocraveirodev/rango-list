import { closeTimeIsGreaterThanOpenTime } from './dateValidationRules.js';

export function checkValidOpeningHours(openingHours, res) {
    let message = 'Validated!';
    let status = 'valid';
  
    Object.values(openingHours || []).some((openingHour, index) => {
      const openTime = openingHour.open;
      const closeTime = openingHour.close;
      const weekDay = `${Object.keys(openingHours || [])[index]}.${
        Object.keys(openingHour)[0]
      }`;
  
      if ((openTime && !closeTime) || (!openTime && closeTime)) {
        message = `The opening and closing times should be filled in on "${weekDay}"`;
        status = 'invalid';
        return true;
      }
  
      if (openTime && closeTime) {
        if (!closeTimeIsGreaterThanOpenTime(openTime, closeTime,res)) {
          message = `End time must be later than start time in the field "${weekDay}". $422`;
          status = 'invalid';
          return true;
        }
  
        if (
          dateProvider.differenceInMinutesBetweenTwoTimes({
            openTime,
            closeTime,
          }) < 15
        ) {
          message = `The intervals between times must be at least 15 minutes in the field "${weekDay}"`;
          status = 'invalid';
          return true;
        }
      }
  
      return false;
    });
  
    return {
      status,
      message,
    };
  }