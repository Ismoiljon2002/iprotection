export const formatNumber = (number = 0) =>
  isNaN(number) ? 0 : number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
