import moment from "moment";

export const TIMESTAMP = "ddd DD, YYYY";

export function generateLatestTimestamp(createdAt: string, updatedAt: string) {
  return moment(createdAt).isSame(updatedAt)
    ? `Created on ${moment(createdAt).format("lll")}`
    : `Updated on ${moment(updatedAt).format("lll")}`;
}

export function generateDefaultValue(selectedType: string) {
  let defaultValue;
  switch (selectedType) {
    case "text":
      defaultValue = "";
      break;
    case "number":
      defaultValue = 0;
      break;
    case "checkbox":
      defaultValue = false;
      break;
    case "date":
      defaultValue = new Date().toISOString();
      break;
  }
  return defaultValue;
}
