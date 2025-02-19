export function getAdjustedDate(year = 1) {
  try {
    const currentDate = new Date();

    if (isNaN(currentDate.getTime())) {
      throw new Error('Invalid device date settings.');
    }

    const adjustedYear = currentDate.getFullYear() + year;
    const adjustedDate = new Date(currentDate);
    adjustedDate.setFullYear(adjustedYear);

    return adjustedDate.toISOString().split('T')[0];
  } catch (error) {
    console.error('Error getting adjusted date:', error.message);

    return new Date().toISOString().split('T')[0];
  }
}
