import { getIncrement, TimeGraphConfig, TimeInterval } from "./time";
import {
  getXDaysAgoFloored,
  getXHoursAgoFloored,
  getXMinutesAgoFloored,
  getXMinutesAgoCeiling,
  getXHoursAgoCeiling,
  getXDaysAgoCeiling,
} from "./getXHoursAgo";

export const timeGraphConfig: Record<TimeInterval, TimeGraphConfig> = {
  "1h": {
    timeMap: (date) => date.toLocaleTimeString(),
    dbIncrement: "min",
    start: getXMinutesAgoFloored(60),
    end: getXMinutesAgoFloored(-1),
  },
  "24h": {
    timeMap: (date) =>
      date.toLocaleTimeString(undefined, {
        hour: "2-digit",
      }),

    dbIncrement: "hour",
    start: getXHoursAgoFloored(24),
    end: getXMinutesAgoFloored(-1),
  },
  "7d": {
    timeMap: (date) =>
      date.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
      }),

    dbIncrement: "day",
    start: getXDaysAgoFloored(7),
    end: getXMinutesAgoFloored(-1),
  },
  "1m": {
    timeMap: (date) =>
      date.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
      }),

    dbIncrement: "day",
    start: getXDaysAgoFloored(30),
    end: getXMinutesAgoFloored(-1),
  },
  "3m": {
    timeMap: (startDate) => {
      const increment = getIncrement(30 * 3 * 24 * 60 * 60 * 1000);

      const endDate = new Date(startDate.getTime() + increment - 1);
      return `${startDate.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
      })} - ${endDate.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
      })}`;
    },
    dbIncrement: "day",
    start: getXDaysAgoFloored(30 * 3),
    end: getXMinutesAgoFloored(-1),
  },
};
