import moment from "moment";

export function timeSince(timestamp) {
  const now = moment();
  const time = moment(timestamp);
  return time.from(now);
}
