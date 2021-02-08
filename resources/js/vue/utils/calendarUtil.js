import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import weekOfYear from 'dayjs/plugin/weekOfYear';

dayjs.extend(weekday);
dayjs.extend(weekOfYear);


export const WEEKDAY = {
    1 : 'Mon',
    2 : 'Tue',
    3 : 'Wed',
    4 : 'Thur',
    5 : 'Fri',
    6 : 'Sat',
    0 : 'Sun',
}

export const getNumberofDaysInMonth = (year, month) => {
    const numDays = dayjs(`${year}-${month}-01`).daysInMonth();
    let actualDays = [];
    for (let i = 1; i <= numDays; i++) {
        actualDays.push({
            num: i,
            day: getWeekday(`${year}-${month}-${i}`)
        });
    }
    return actualDays;
}

export const showMonth = (year, month) => {
    return dayjs(`${year}-${month}-01`).format('MMM');
}

export const compareDate = (setDate, startDate, endDate) => {
    let initialDate = dayjs(startDate).unix();
    let finalDate = dayjs(endDate).unix();
    let date = dayjs(setDate).unix();
    
    if (date >= initialDate && date <= finalDate) {
        return true;
    }
    return false;
}

export const formatDate = (date) => {
    return dayjs(date).format('YYYY/MM/DD');
}

export const setStartTime = (date) => {
    return dayjs(date).startOf('day').format('dddd, MMMM D, YYYY h:mm A');
}

const getWeekday = (date) => {
    let weekday = dayjs(date).weekday();
    return WEEKDAY[weekday];
}
