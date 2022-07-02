import { EvaStatus } from "@ui-kitten/components/devsupport";
import {
  ImageRequireSource,
  ImageSourcePropType,
  ViewStyle,
} from "react-native";

export interface ButtonType {
  status?: EvaStatus;
  title: string;
  onPress: () => void;
}
export interface ModalScreenType {
  image?: ImageRequireSource;
  title?: string;
  description?: string;
  children?: ButtonType[] | null;
  buttonsViewStyle?: ViewStyle;
}
export interface SpendingProps {
  id: number;
  icon: string;
  color: string;
  title: string;
  time?: string;
  amount?: number;
  details?: SpendingDetailsProps[];
}
export interface GroupProps {
  id: number;
  title?: string;
  pined: boolean;
  header?: string;
  friendInGroup?: string;
  numberExpense?: string;
  amount?: number;
  totalAmount?: number;
  totalPaid?: number;
  type?: Category_Types_Enum;
  details?: ExpenseDetailsProps[];
  listPaid?: SpendingProps;
}
export interface SpendingDetailsProps {
  id?: number;
  title?: string;
  date?: number;
  amount?: number;
  color?: string;
  type?: Category_Types_Enum;
  icon?: string;
  totalAmount?: number;
}
export interface ExpenseDetailsProps {
  id: number;
  amount: number;
  color: string;
  icon: string;
  title: string;
  totalAmount: number;
  type: Category_Types_Enum;
}
export interface ActivityProps {
  type?: Category_Types_Enum;
  avatar?: ImageRequireSource;
  title?: string;
  description?: string;
  service?: string;
  name?: string;
  amount?: number;
  date?: number;
  id?: number;
  header?: string;
  ads?: boolean;
}
export interface AddFriendProps {
  id?: number;
  name?: string;
  avatar?: ImageRequireSource;
}
export interface FlagProps {
  id?: number;
  nation?: string;
  icon?: ImageSourcePropType;
  country?: string;
  type?: string;
  title?: string;
  kindle?: string;
}

export interface SplitBillFragment {
  avatar?: ImageRequireSource;
  name?: string;
  phoneNumber?: number;
  addDefault?: boolean;
  amount?: number;
  image?: ImageFragment;
}

export interface SplitTypeFragment {
  id?: string;
  type?: Split_Types_Enum;
  name?: string;
  description?: string;
}

export interface ImageFragment {
  path: ImageRequireSource;
}

export interface CategoryFragment {
  id?: string;
  name?: string;
  color?: string;
  emoji?: string;
  icon?: ImageFragment;
  type?: {
    id?: Category_Types_Enum;
  };
}

export interface BillFragment {
  id?: string;
  amount?: number;
  name?: string;
  category_id?: string;
  location?: string;
  created_at?: number | undefined;
  due_at?: Date | undefined;
  created_by?: UserFragment;
  category?: CategoryFragment;
  type_id?: Category_Types_Enum;
  split_type?: {
    id: Split_Types_Enum;
  };
  day?: number;
  is_repeat?: boolean;
  payers?: UserFragment[];
  image?: ImageFragment;
  updated_at?: Date;
}

export interface UserFragment {
  ages_id?: string;
  avatar_id?: string;
  created_at?: string;
  email?: string;
  full_name?: string;
  id?: string;
  is_email_verified?: string;
  phone_number?: string;
  avatar?: ImageFragment;
}

export interface BillPayersProps {
  id?: string;
  name?: string;
  payers?: UserFragment[];
}

export interface FriendFragment {
  id?: string;
  name?: string;
  avatar?: ImageFragment;
  amount?: number;
  is_join?: boolean;
  type_id?: Category_Types_Enum;
  email?: string;
  ads?: boolean;
}

export interface ActivityFragment {
  id?: string;
  category?: CategoryFragment;
  bill?: BillFragment;
  amount?: number;
  type_id?: Category_Types_Enum;
  title?: string;
}

export interface AccountService {
  id?: string;
  logo_uri?: ImageFragment;
  account_number?: number;
  is_enabled?: boolean;
  created_at?: number;
  type?: PaymentService;
  addDefault?: boolean;
  name?: string;
  exp_date?: number;
  cvv?: number;
}

export interface PaymentService {
  id?: string;
  logo_uri?: ImageFragment;
  name?: string;
  kind_id?: Payment_Types_Enum;
  kind?: {
    id?: Payment_Types_Enum;
  };
}

export interface CurrencyFragment {
  id?: string;
  type?: string;
  image?: string;
}

export interface SettingsItemProps {
  icon: string;
  color: string;
  title: string;
  checked?: boolean;
  isArrow?: boolean;
  isToggle?: boolean;
  onChange?(): void;
  onPress?(): void;
}

export enum Payment_Types_Enum {
  CreditCard = "CreditCard",
  PayPal = "PayPal",
  ApplePay = "ApplePay",
}

export enum Mode_Enum {
  Add,
  Edit,
}

export enum Friend_Profile_Types {
  Remind,
  SettleUp,
}

export enum Format_Type {
  LIMIT,
  SAVING,
  INKY,
  DEFAULT,
  SECURE,
}

export enum Category_Types_Enum {
  Income,
  Expense,
  Settled,
}
export enum Category_Status_Enum {
  Owner = "Owner",
  Friend = "Friend",
  NotFriend = "addFriend",
  RequestFriend = "Invited. Resend?",
}

export enum Split_Types_Enum {
  Equally = "Equally",
  Unequally = "Unequally",
  Percentages = "Percentages",
  Shares = "Shares",
  Adjustment = "Adjustment",
}

export enum EKeyAsyncStorage {
  theme = "theme",
  intro = "intro",
}
export enum Friend_Types {
  Nearby,
  Local,
}
