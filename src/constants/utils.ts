import moment from "moment";

export const TIMESTAMP = "ddd DD, YYYY";

export function generateLatestTimestamp(createdAt: string, updatedAt: string) {
  return moment(createdAt).isSame(updatedAt)
    ? `Created on ${moment(createdAt).format("lll")}`
    : `Updated on ${moment(updatedAt).format("lll")}`;
}
