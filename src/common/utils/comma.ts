export default (num: number): string => String(num).replace(/\B(?=(\d{3})+$)/g, ',');
