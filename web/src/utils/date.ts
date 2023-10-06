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
   const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

   const startsAtUTC = moment.tz(startsAt, timeZone).utc().toDate();
   const endsAtUTC = moment.tz(endsAt, timeZone).utc().toDate();

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
export const convertDateAndHourToUTC = (data: string, hour: string): {
   date: string, hour: string
} => {
   const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
   const date = moment.tz(data, timezone).utc().format('YYYY-MM-DD');
   const hourUTC = moment.tz(`${data} ${hour}`, timezone).utc().format('HH');
   return {
      date,
      hour: hourUTC
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
   return availableDates;
}


export const getAvailableTimeRanges = (date: Date): string[] => {
   const availableTimeRanges: string[] = [];
   for (let i = 0; i < 24; i++) {
      const startsAt = new Date(date.getFullYear(), date.getMonth(), date.getDate(), i);
      const endsAt = new Date(date.getFullYear(), date.getMonth(), date.getDate(), i + 1);
      const endsAtUTC = moment.tz(endsAt, 'UTC').toDate();
      if (endsAtUTC > new Date()) {
         const range = i < 12 ? `${i}:00 AM - ${i + 1}:00 AM` : `${i - 12}:00 PM - ${(i + 1) - 12}:00 PM`;
         availableTimeRanges.push(range);
      }
   }
   return availableTimeRanges;
}

export const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;