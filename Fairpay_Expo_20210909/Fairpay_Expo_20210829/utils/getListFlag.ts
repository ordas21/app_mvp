import { DATA_FLAG } from "constants/Data";
import { FlagProps } from "constants/Types";

export const getListFlag = (data = DATA_FLAG as FlagProps[]): FlagProps[] => {
  let output = [];
  for (let i = 0; i < data.length; i++) {
    let findIndex = output.findIndex((item) => data[i].kindle === item.title);
    if (findIndex < 0) {
      output.push({ title: data[i].kindle, type: "header" }, data[i]);
    } else {
      output.push(data[i]);
    }
  }
  return output;
};
