import React from "react";
import {
  Image,
  ImageProps,
  ImageSourcePropType,
  StyleSheet,
} from "react-native";
import { IconPack, IconProvider } from "@ui-kitten/components";
import { SvgProps } from "react-native-svg";
import { Icons } from "./icons";

const createIcon = (source: ImageSourcePropType): IconProvider<ImageProps> => {
  return {
    toReactElement: (props) => (
      <Image
        style={styles.icon}
        {...props}
        source={source}
        resizeMode="cover"
      />
    ),
  };
};

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});

const AssetIconsPack: IconPack<ImageProps | SvgProps> = {
  name: "assets",
  icons: {
    back: createIcon(Icons.back),
    usd: createIcon(Icons.usd),
    twitter: createIcon(Icons.twitter),
    facebook: createIcon(Icons.facebook),
    trash: createIcon(Icons.trash),
    settleUp: createIcon(Icons.settleUp),
    setting: createIcon(Icons.setting),
    rupee: createIcon(Icons.rupee),
    reminder: createIcon(Icons.reminder),
    profile: createIcon(Icons.profile),
    scanBill: createIcon(Icons.scanBill),
    gbp: createIcon(Icons.gbp),
    eyeOn: createIcon(Icons.eyeOn),
    eyeOff: createIcon(Icons.eyeOff),
    expense: createIcon(Icons.expense),
    edit: createIcon(Icons.edit),
    edit16: createIcon(Icons.edit16),
    resetSearch: createIcon(Icons.resetSearch),
    checkMark: createIcon(Icons.checkMark),
    notification: createIcon(Icons.notification),
    add: createIcon(Icons.add),
    next: createIcon(Icons.next),
    faceId: createIcon(Icons.faceId),
    filter: createIcon(Icons.filter),
    close: createIcon(Icons.close),
    time: createIcon(Icons.time),
    euro: createIcon(Icons.euro),
    spending: createIcon(Icons.spending),
    searchNormal: createIcon(Icons.searchNormal),
    dob: createIcon(Icons.dob),
    entertainment: createIcon(Icons.entertainment),
    other: createIcon(Icons.other),
    transportation: createIcon(Icons.transportation),
    uncategory: createIcon(Icons.uncategory),
    shopping: createIcon(Icons.shopping),
    dining: createIcon(Icons.dinning),
    pinGroup: createIcon(Icons.pinGroup),
    activityNormal: createIcon(Icons.activityNormal),
    activityActive: createIcon(Icons.accountActive),
    groupNormal: createIcon(Icons.groupNormal),
    groupActive: createIcon(Icons.groupActive),
    friendsNormal: createIcon(Icons.friendsNormal),
    friendsActive: createIcon(Icons.friendsActive),
    accountNormal: createIcon(Icons.accountNormal),
    accountActive: createIcon(Icons.accountActive),
    plus: createIcon(Icons.plus),
    groups: createIcon(Icons.groups),
    dueDate: createIcon(Icons.dueDate),
    arrowDown: createIcon(Icons.arrowDown),
    arrowRight: createIcon(Icons.arrowRight),
    addFriend: createIcon(Icons.addFriend),
    flashOn: createIcon(Icons.flashOn),
    flashOff: createIcon(Icons.flashOff),
    rotation: createIcon(Icons.rotation),
    addMore: createIcon(Icons.addMore),
    exchange: createIcon(Icons.exchange),
    option: createIcon(Icons.option),
    statistics: createIcon(Icons.statistics),
    calendar: createIcon(Icons.calendar),
    darkMode: createIcon(Icons.darkMode),
    participants: createIcon(Icons.participants),
    cash: createIcon(Icons.cash),
  },
};
export default AssetIconsPack;
