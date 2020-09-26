interface TimeDivision {
  amount: number;
  unit: Intl.RelativeTimeFormatUnit;
}

const divisions: TimeDivision[] = [
  { amount: 60, unit: "second" },
  { amount: 60, unit: "minute" },
  { amount: 24, unit: "hour" },
  { amount: 7, unit: "day" },
  { amount: 4.34524, unit: "week" },
  { amount: 12, unit: "month" },
  { amount: Number.POSITIVE_INFINITY, unit: "year" },
];

const getSecondsAgo = (date: Date) => {
  return Math.floor((date.getTime() - Date.now()) / 1000);
};

export const formatTimeAgo = (date: Date, format: Intl.RelativeTimeFormat) => {
  let unitsAgo = getSecondsAgo(date);
  for (const division of divisions) {
    if (Math.abs(unitsAgo) < division.amount) {
      return format.format(Math.round(unitsAgo), division.unit);
    }
    unitsAgo /= division.amount;
  }
  const division = divisions[divisions.length - 1];
  return format.format(Math.round(unitsAgo), division.unit);
};

export const getDateInSeconds = (seconds: number) => {
  return new Date(Date.now() + 1000 * seconds);
};
