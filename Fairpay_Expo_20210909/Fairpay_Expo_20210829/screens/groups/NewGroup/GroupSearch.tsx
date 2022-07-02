import React, { memo } from "react";
import { StyleSheet, View } from "react-native";
import { Icon, Input, TopNavigation, useTheme } from "@ui-kitten/components";

import Text from "components/Text";
import Container from "components/Container";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "navigation/types";

const GroupSearch = memo(() => {
  const { t } = useTranslation(["group", "common"]);
  const themes = useTheme();
  const navigate = useNavigation<NavigationProp<RootStackParamList>>();
  const {
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      search: "",
    },
  });
  return (
    <Container style={styles.container}>
      <TopNavigation
        accessoryLeft={() => {
          return (
            <Controller
              control={control}
              name="search"
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={styles.controller}>
                  <Input
                    status={errors.search ? "warning" : undefined}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    keyboardType="email-address"
                    placeholder={t("common:search")}
                    style={styles.input}
                    accessoryLeft={() => (
                      <View style={styles.icon}>
                        <Icon
                          pack="assets"
                          name="searchNormal"
                          style={{
                            tintColor: themes["placeholder-text-input-color"],
                          }}
                        />
                      </View>
                    )}
                  />
                  <Text
                    marginTop={8}
                    category="h8-sl"
                    onPress={() => navigate.goBack()}
                  >
                    {t("common:cancel")}
                  </Text>
                </View>
              )}
            />
          );
        }}
      />
    </Container>
  );
});

export default GroupSearch;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  controller: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 18,
  },
  input: {
    flex: 1,
    height: 40,
    marginRight: 16,
    borderRadius: 12,
  },
});
