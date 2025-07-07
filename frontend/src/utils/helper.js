import moment from "moment";

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const getInitials = (name) => {
  if (!name) return "";

  const word = name.split(" ");
  let initails = "";

  for (let i = 0; i < Math.min(word.length, 2); i++) {
    initails += word[i][0];
  }

  return initails.toUpperCase();
};

export const addThousandsSeparator = (num) => {
  if (num === null || isNaN(num)) return "";

  const [integerPart, fractionalPart] = num.toString().split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return fractionalPart
    ? `${formattedInteger}.${fractionalPart}`
    : formattedInteger;
};

export const prepareExpenseChartData = (data = []) => {
  const chartData = data.map((item) => ({
    name: item?.name,
    category: item?.category,
    quantity: item?.quantity,
    amount: item?.amount,
  }));
  return chartData;
};

export const prepareIncomeChartData = (data = [])   => {
  if (!Array.isArray(data)) {
    return [];
  }
  
  const sortData = [...data].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const chartData = sortData.map((item) => ({
    month: moment(item?.date).format("Do MMM"),
    source: item?.source,
    amount: item?.amount,
  }));
  return chartData;
};
