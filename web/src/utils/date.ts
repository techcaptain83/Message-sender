import moment from 'moment-timezone';

export const generateStartsAndEndsAtDate = (date: string, hour: string, slot: { starts: number, ends: number }): { startsAt: Date, endsAt: Date } => {
   const formattedHour = hour.padStart(2, '0'); // Ensure two-digit format
   const formattedStarts = slot.starts.toString().padStart(2, '0'); // Ensure two-digit format

   const startsAt = new Date(`${date}T${formattedHour}:${formattedStarts}:00.000Z`);
   const endsAt = new Date(`${date}T${formattedHour}:${slot.ends - 1}:59.999Z`);

   return {
      startsAt,
      endsAt
   }
}


export const convertToUTC = (startsAt: Date, endsAt: Date): { startsAt: Date, endsAt: Date } => {

   const offset = new Date().getTimezoneOffset();
   const startsAtUTC = new Date(startsAt.getTime() + offset * 60 * 1000);
   const endsAtUTC = new Date(endsAt.getTime() + offset * 60 * 1000);

   return {
      startsAt: startsAtUTC,
      endsAt: endsAtUTC
   }
}

export const convertToUserTimezone = (startsAt: Date, endsAt: Date): { startsAt: Date, endsAt: Date } => {

   const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

   const startsAtLocal = moment.tz(startsAt, timeZone).toDate();
   const endsAtLocal = moment.tz(endsAt, timeZone).toDate();

   return {
      startsAt: startsAtLocal,
      endsAt: endsAtLocal
   }
}

/**
 * 
 * @param data format: YYYY-MM-DD
 * @param hour format : HH
 */
export const convertDateAndHourToUTC = (date: string, hour: string): {
   date: string, hour: string
} => {
   // console.log("date and hour passed to the function : ");
   // console.log(date, hour);
   const offsetHours = new Date().getTimezoneOffset() / 60;
   const hoursWithOffset = parseInt(hour) + offsetHours;

   const formattedHour = hoursWithOffset.toString().padStart(2, '0'); // Ensure two-digit format

   // check if the hours are still in that date (after removing offset)
   if (hoursWithOffset < 0) {
      const previousDay = new Date(date);
      previousDay.setDate(previousDay.getDate() - 1);
      const formattedDate = previousDay.toISOString().split('T')[0];

      // hours in the previous day in UTC
      const hours = (24 + hoursWithOffset).toString().padStart(2, '0');
      // console.log("date and hour returned from the function : ");
      // console.log(formattedDate, hours);

      return {
         date: formattedDate,
         hour: hours
      }
   } else if (hoursWithOffset > 23) {
      const nextDay = new Date(date);
      nextDay.setDate(nextDay.getDate() + 1);
      const formattedDate = nextDay.toISOString().split('T')[0];

      // hours in the next day in UTC time.
      const hours = (hoursWithOffset - 24).toString().padStart(2, '0');
      // console.log("date and hour returned from the function : ");
      // console.log(formattedDate, hours);
      return {
         date: formattedDate,
         hour: hours
      }
   }
   // console.log("date and hour returned from the function : ");
   // console.log(date, formattedHour);
   return {
      date,
      hour: formattedHour
   }
}

export const getAvailableDates = (): Date[] => {
   const availableDates: Date[] = [];
   for (let i = 0; i < 30; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      const endOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59);
      const endOfDayUTC = moment.tz(endOfDay, 'UTC').toDate();
      if (endOfDayUTC > new Date()) {
         availableDates.push(date);
      }
   }
   console.log("available dates : ", availableDates);
   return availableDates;
}


export const getAvailableTimeRanges = (date: Date): string[] => {
   // console.log("input date ", date);

   const availableTimeRanges: string[] = [];
   for (let i = 0; i < 24; i++) {
      const endsAt = new Date(date.getFullYear(), date.getMonth(), date.getDate(), i + 1);
      const endsAtUTC = moment.tz(endsAt, 'UTC').toDate();
      if (endsAtUTC > new Date()) {
         const range = i < 12 ? `${i}:00 - ${i + 1}:00` : `${i}:00 - ${(i + 1)}:00`;
         availableTimeRanges.push(range);
      }
   }
   return availableTimeRanges;
}

export const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;