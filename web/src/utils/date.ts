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