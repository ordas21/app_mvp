import { NavigatorScreenParams, RouteProp } from "@react-navigation/native";
import {
  AccountService,
  BillFragment,
  FriendFragment,
  Friend_Profile_Types,
  GroupProps,
  ModalScreenType,
  PaymentService,
  SpendingProps,
} from "constants/Types";
import { CameraCapturedPicture } from "expo-camera";

export type RootStackParamList = {
  Intro: IntroStackParamList;
  Auth: {
    screen: keyof AuthStackParamList;
  };
  Activities: {
    screen: keyof ActivityStackParamList;
  };
  Groups: NavigatorScreenParams<GroupsStackParamList>;
  Expense: NavigatorScreenParams<ExpenseStackParamList>;
  Friends: NavigatorScreenParams<FriendsStackParamList>;
  Profile: {
    screen: keyof ProfileStackParamList;
  };
  Main: {
    screen: keyof MainStackParamList;
  };
  NotFound: undefined;
  ModalScreen: {
    modalScreen: ModalScreenType;
  };
};

export type IntroStackParamList = {
  Intro: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
  Profile: undefined;
  ForgotPassword: undefined;
  ChangePassword: undefined;
  OtherInformation: undefined;
};

export type ActivityStackParamList = {
  ActivityAll: undefined;
  Filter: undefined;
};

export type GroupsStackParamList = {
  NewGroup: undefined;
  NewGroupDetails: undefined;
  ExpenseDetails: undefined;
  GroupSearch: undefined;
  Statistics: { details: GroupProps };
};

export type ExpenseStackParamList = {
  AddBill: { bill: CameraCapturedPicture[] };
  EditBill: { bill: CameraCapturedPicture[] };
  SplitBillStep1: undefined;
  SplitBillStep2: undefined;
  SplitBillStep3: undefined;
  SplitBillStep4: { bill: BillFragment };
};

export type FriendsStackParamList = {
  FriendProfile: { friend: FriendFragment; type: Friend_Profile_Types };
  SettleUp: { friend: FriendFragment };
  PaymentMethod: undefined;
  AddPayment: undefined;
  SettleUpConfirm: { friend: FriendFragment; account: AccountService };
  AddFriend: undefined;
};

export type ProfileStackParamList = {
  Profile: undefined;
  ProfileEdit: undefined;
  Spending: undefined;
  Setting: undefined;
  CategoryDetail: { category: SpendingProps };
};

export type MainStackParamList = {
  Activity: undefined;
  Group: undefined;
  GroupDetails: { category: GroupProps };
  Friend: undefined;
  Account: undefined;
};

export type ModalScreenNavigationProp = RouteProp<
  RootStackParamList,
  "ModalScreen"
>;
export type CategoryDetailNavigationProps = RouteProp<
  ProfileStackParamList,
  "CategoryDetail"
>;
export type GroupDetailsNavigationProp = RouteProp<
  MainStackParamList,
  "GroupDetails"
>;
export type GroupsStackParamListProp = RouteProp<
  GroupsStackParamList,
  "Statistics"
>;

export type AddBillNavigationProps = RouteProp<
  ExpenseStackParamList,
  "AddBill"
>;

export type EditBillNavigationProps = RouteProp<
  ExpenseStackParamList,
  "EditBill"
>;

export type SplitBillStep3NavigationProps = RouteProp<
  ExpenseStackParamList,
  "SplitBillStep3"
>;

export type SplitBillStep4NavigationProps = RouteProp<
  ExpenseStackParamList,
  "SplitBillStep4"
>;

export type FriendProfileNavigationProps = RouteProp<
  FriendsStackParamList,
  "FriendProfile"
>;

export type SettleUpNavigationProps = RouteProp<
  FriendsStackParamList,
  "SettleUp"
>;

export type SettleUpConfirmNavigationProps = RouteProp<
  FriendsStackParamList,
  "SettleUpConfirm"
>;
