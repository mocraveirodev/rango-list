function formatTime(time) {
    if (!time) {
        return null;
    }

    return time.split(':').slice(0, -1).join(':');
}

export function formatOpeningHours(openingHours) {
    const formattedOpeningHours = {};
    
    openingHours.forEach(openingHour => {
        formattedOpeningHours[openingHour.week_day] = {
            open_hour: formatTime(openingHour.open_hour),
            close_hour: formatTime(openingHour.close_hour),
        };
    });
    
    return formattedOpeningHours;
}