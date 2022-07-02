import { ACTIVITY_DATA } from "constants/Data";
import { ActivityProps } from "constants/Types";
import dayjs from "utils/dayjs";

export const getListViewDate = (
  data = ACTIVITY_DATA as ActivityProps[]
): ActivityProps[] => {
  const output = [];
  for (let i = 0; i < data.length; i++) {
    const findIndex = output.findIndex(
      (item) => dayjs(data[i].date).format("MMM D, YYYY ") === item.title
    );
    if (findIndex < 0) {
      output.push(
        { title: dayjs(data[i].date).format("MMM D, YYYY "), header: "header" },
        data[i]
      );
    } else {
      output.push(data[i]);
    }
  }
  return output;
};
