export const generateStartsAndEndsAtDate = (date: string, hour: string, slot: { starts: number, ends: number }): { startsAt: Date, endsAt: Date } => {
   const startsAt = new Date(`${date}T${hour}:${slot.starts}:00:000Z`);
   const endsAt = new Date(`${date}T${hour}:${slot.ends - 1}.59.999Z`);

   return {
      startsAt,
      endsAt
   }
}