import React, { memo, useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import { CheckBox, Datepicker } from "@ui-kitten/components";
import Text from "components/Text";
import Container from "components/Container";
import { useTranslation } from "react-i18next";
import useToggle from "hooks/useToggle";

const FilterActivities = memo(() => {
  const { t } = useTranslation("filterDate");
  const [all, setAll] = useState(false);
  const [indeterminate, setIndeterminate] = useState<boolean>();
  const [days, setDays] = useState<boolean>();
  const [month, setMonth] = useState<boolean>();
  const [year, setYear] = useState<boolean>();
  const [checked, setChecked] = useToggle(false);
  const onGroupCheckedChange = (checked: boolean) => {
    setChecked();
    setDays(checked);
    setMonth(checked);
    setYear(checked);
    updateGroup(checked, checked);
  };

  const updateGroup = (...states: any[]) => {
    // must fix
    const someChecked = states.some((item) => item === true);
    const everyChecked = states.every((item) => item === true);

    if (someChecked && !everyChecked) {
      setAll(false);
      setIndeterminate(true);
    } else if (!someChecked && !everyChecked) {
      setAll(false);
      setIndeterminate(false);
    } else if (everyChecked) {
      setAll(true);
      setIndeterminate(false);
    }
  };
  const onDays = useCallback(
    (checked: boolean) => {
      setDays(!days);
      setIndeterminate(!indeterminate);
      updateGroup(checked, days);
    },
    [days, indeterminate]
  );

  const onMonth = (checked: boolean) => {
    setMonth(checked);
    updateGroup(checked, month);
  };
  const onYear = (checked: boolean) => {
    setYear(checked);
    updateGroup(checked, year);
  };
  const filterPickerStateFrom = useDatepickerState();
  const filterPickerStateTo = useDatepickerState();
  return (
    <Container style={styles.container}>
      <View style={styles.checkBox}>
        <Text
          status="basic"
          marginVertical={16}
          category={all ? "h8" : "h8-sl"}
        >
          {t("allTransactions")}
        </Text>
        <CheckBox
          checked={all}
          status="round"
          indeterminate={indeterminate}
          onChange={onGroupCheckedChange}
        />
      </View>

      <View style={styles.checkBox}>
        <Text
          status="basic"
          category={days ? "h8" : "h8-sl"}
          marginVertical={16}
        >
          {t("pass90days")}
        </Text>
        <CheckBox status="round" checked={days} onChange={onDays}></CheckBox>
      </View>

      <View style={styles.checkBox}>
        <Text
          status="basic"
          category={month ? "h8" : "h8-sl"}
          marginVertical={16}
        >
          {t("june")}
        </Text>
        <CheckBox status="round" checked={month} onChange={onMonth}></CheckBox>
      </View>

      <View style={styles.checkBox}>
        <Text
          status="basic"
          category={year ? "h8" : "h8-sl"}
          marginVertical={16}
        >
          {t("2020")}
        </Text>
        <CheckBox status="round" checked={year} onChange={onYear}></CheckBox>
      </View>
      <Text marginLeft={32} category="h8-sl" status="basic" marginTop={24}>
        {t("chooseDate")}
      </Text>
      <View style={styles.rowContainer}>
        <Datepicker
          controlStyle={styles.controlStyle}
          size="medium"
          label={t("from").toString()}
          style={styles.picker}
          filter={filter}
          {...filterPickerStateFrom}
          placement={"top"}
        />
        <Datepicker
          controlStyle={styles.controlStyle}
          size="medium"
          label={t("to").toString()}
          style={styles.secondPicker}
          filter={filter}
          {...filterPickerStateTo}
          placement={"top"}
        />
      </View>
    </Container>
  );
});

export default FilterActivities;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  checkBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    marginHorizontal: 32,
  },
  controlStyle: {
    borderRadius: 8,
  },
  rowContainer: {
    flexDirection: "row",
    marginTop: 16,
  },
  picker: {
    flex: 1,
    marginLeft: 12,
  },
  secondPicker: {
    flex: 1,
    marginHorizontal: 12,
  },
  calender: {
    width: "50%",
  },
});
const useDatepickerState = (initialDate = null) => {
  const [date, setDate] = React.useState(initialDate);
  return { date, onSelect: setDate };
};

const filter = (date: any) => date.getDay() !== 0 && date.getDay() !== 6; // must fix

const now = new Date();
