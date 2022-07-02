import React, { memo } from "react";
import numeral from "numeral";

import Text, { MyTextProps } from "./Text";
import { Format_Type, Category_Types_Enum } from "constants/Types";

export interface CurrencyTextProps extends MyTextProps {
  type?: Category_Types_Enum;
  formatType?: Format_Type;
}

const CurrencyText = memo(
  ({
    children,
    type,
    formatType = Format_Type.DEFAULT,
    ...props
  }: CurrencyTextProps) => {
    const currency = "$";

    const formatLimit = (amount: string, currency = "$") => {
      let textResult = `${currency}`;
      try {
        if (isNaN(parseFloat(amount))) {
          textResult += numeral(parseFloat(amount.replace(",", ""))).format(
            "0,0.00a"
          );
        } else {
          textResult += numeral(parseFloat(amount)).format("0,0.00a");
        }
      } catch (e) {
        console.log(e);
      }
      return textResult;
    };

    const formatSaving = (
      amount: string,
      typeCategories = Category_Types_Enum.Income,
      currency = "$"
    ) => {
      let textResult =
        typeCategories === Category_Types_Enum.Expense ? "" : "-";
      textResult += `${currency}`;
      try {
        if (isNaN(parseFloat(amount))) {
          textResult += numeral(parseFloat(amount.replace(",", ""))).format(
            "0,0.00"
          );
        } else {
          textResult += numeral(parseFloat(amount)).format("0,0.00");
        }
      } catch (e) {
        console.log(e);
      }
      return textResult;
    };

    const formatInky = (
      amount: string,
      typeCategories = Category_Types_Enum.Income,
      currency = "$"
    ) => {
      let textResult =
        typeCategories === Category_Types_Enum.Income ? "+ " : "- ";
      textResult += `${currency}`;
      try {
        if (isNaN(parseFloat(amount))) {
          textResult += numeral(parseFloat(amount.replace(",", ""))).format(
            "0,0.00"
          );
        } else {
          textResult += numeral(parseFloat(amount)).format("0,0.00");
        }
      } catch (e) {
        console.log(e);
      }
      return textResult;
    };

    const formatDefault = (amount: string, currency = "$") => {
      let textResult = `${currency}`;
      try {
        if (isNaN(parseFloat(amount))) {
          textResult += numeral(parseFloat(amount.replace(",", ""))).format(
            "0,0.00"
          );
        } else {
          textResult += numeral(parseFloat(amount)).format("0,0.00");
        }
      } catch (e) {
        console.log(e);
      }
      return textResult;
    };

    const formatSecure = (currency = "$") => {
      return currency + "****";
    };

    return (
      <Text {...props}>
        {formatType === Format_Type.LIMIT
          ? formatLimit(children, currency)
          : formatType === Format_Type.SAVING
          ? formatSaving(children, type, currency)
          : formatType === Format_Type.INKY
          ? formatInky(children, type, currency)
          : formatType === Format_Type.DEFAULT
          ? formatDefault(children, currency)
          : formatType === Format_Type.SECURE
          ? formatSecure(currency)
          : formatDefault(children, currency)}
      </Text>
    );
  }
);

export default CurrencyText;
