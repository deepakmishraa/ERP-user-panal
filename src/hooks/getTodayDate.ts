export const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = `0${today.getMonth() + 1}`.slice(-2); // Months are 0-indexed, add leading 0 and slice to ensure 2 digits
  const day = `0${today.getDate()}`.slice(-2); // Add leading 0 and slice to ensure 2 digits
  return `${year}-${month}-${day}`;
};
