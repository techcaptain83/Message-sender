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
