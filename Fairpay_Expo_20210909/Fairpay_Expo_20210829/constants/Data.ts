import {
  AccountService,
  ActivityFragment,
  FriendFragment,
  PaymentService,
} from "./Types";
import {
  BillPayersProps,
  CategoryFragment,
  Category_Types_Enum,
  Payment_Types_Enum,
} from "constants/Types";
import { Images } from "assets/images";
import { Icons } from "assets/icons";

export const DATA_ACCOUNT = {
  id: 0,
  avatar: Images.avatarA,
  name: "Hieu Le Quang",
  email: "lehieuds@gmail.com",
};

export const DATA_COUNTRY = [
  {
    id: 0,
    name: "Afghanistan",
  },
  {
    id: 1,
    name: "Albania",
  },
  {
    id: 2,
    name: "Andorra",
  },
  {
    id: 3,
    name: "Angola",
  },
  {
    id: 4,
    name: "Algeria",
  },
  {
    id: 5,
    name: "Antigua",
  },
  {
    id: 6,
    name: "Barbuda",
  },
  {
    id: 7,
    name: "Argentina",
  },
  {
    id: 8,
    name: "Australia",
  },
  {
    id: 9,
    name: "Armenia",
  },
];

export const DATA_CITY = [
  {
    id: 0,
    name: "New York",
  },
  {
    id: 1,
    name: "Ha Noi",
  },
  {
    id: 2,
    name: "Ho chi minh",
  },
  {
    id: 3,
    name: "nha trang",
  },
  {
    id: 4,
    name: "da nang",
  },
  {
    id: 5,
    name: "Antigua",
  },
  {
    id: 6,
    name: "Barbuda",
  },
  {
    id: 7,
    name: "Argentina",
  },
  {
    id: 8,
    name: "Australia",
  },
  {
    id: 9,
    name: "Armenia",
  },
];
export const DATA_METHODS = [
  {
    id: 0,
    image: Images.visa,
    numberCard: "2346",
    payment: "2536",
  },
  {
    id: 1,
    image: Images.master,
    numberCard: "2938",
    payment: "1536",
  },
];

export const DATA_FLAG = [
  {
    id: 0,
    icon: Images.flagEURO,
    nation: "Euro",
    country: "Euro",
    type: "item",
    kindle: "Popular Currencies",
  },
  {
    id: 2,
    icon: Images.flagINR,
    nation: "INR",
    country: "Indian rupee",
    type: "item",
    kindle: "Popular Currencies",
  },
  {
    id: 3,
    icon: Images.flagGBP,
    nation: "GBP",
    country: "British pound",
    type: "item",
    kindle: "Popular Currencies",
  },
  {
    id: 4,
    icon: Images.flagUSD,
    nation: "USD",
    country: "United States dollar",
    type: "item",
    kindle: "Popular Currencies",
  },
  {
    id: 5,
    icon: Images.flagAED,
    nation: "AED",
    country: "United Arab Emirates dirham",
    type: "item",
    kindle: "Popular Currencies",
  },
  {
    id: 6,
    icon: Images.flagAUD,
    nation: "AUD",
    country: "Australian dollar",
    type: "item",
    kindle: "All Currencies",
  },
  {
    id: 7,
    icon: Images.flagBGN,
    nation: "BGN",
    country: "Bulgarian lev",
    type: "item",
    kindle: "All Currencies",
  },
  {
    id: 8,
    icon: Images.flagBRL,
    nation: "BRL",
    country: "Brazilian real",
    type: "item",
    kindle: "All Currencies",
  },
  {
    id: 9,
    icon: Images.flagCAD,
    nation: "CAD",
    country: "Canadian dollar",
    type: "item",
    kindle: "All Currencies",
  },
];

export const ACTIVITY_DATA = [
  {
    id: 1,
    avatar: Images.avatar1,
    status: "reminders",
    name: "Beulah Walker",
    description: "send you reminderl",
    type: Category_Types_Enum.Income,
    date: 1595945399000,
    title: "Paris Vacation",
    amount: 123,
  },
  {
    id: 2,
    avatar: Images.avatar1,
    status: "receive",
    name: "Sally Hawkins",
    description: "money sent",
    amount: 128,
    type: Category_Types_Enum.Expense,
    date: 1595945399000,
    title: "Paris Vacation",
  },
  {
    id: 3,
    avatar: Images.avatar2,
    status: "sent",
    name: "Benjamin Willis",
    description: "paid you via Apple Pay ",
    amount: 76.5,
    type: Category_Types_Enum.Income,
    date: 1595945399000,
    title: "Paris Vacation",
  },
  {
    id: 4,
    avatar: Images.avatar,
    name: "Sally Hawkins",
    description: "paid you via Apple Pay ",
    amount: 76.5,
    type: Category_Types_Enum.Expense,
    date: 1595945399000,
    title: "Paris Vacation",
  },
  {
    ads: true,
    date: 1595945399000,
  },
  {
    id: 5,
    avatar: Images.avatar2,
    name: "Beulah Walker",
    description: "paid you via Apple Pay ",
    amount: 76.5,
    type: Category_Types_Enum.Income,
    date: 1595945399000,
    title: "Paris Vacation",
  },

  {
    id: 6,
    avatar: Images.avatar2,
    name: "Will Smith",
    description: "paid you via Apple Pay ",
    amount: 76.5,
    type: Category_Types_Enum.Expense,
    date: 1596118199000,
    title: "Paris Vacation",
  },
  {
    id: 7,
    avatar: Images.avatar1,
    name: "Sam Smith",
    description: "paid you via Apple Pay ",
    amount: 76.5,
    type: Category_Types_Enum.Income,
    date: 1596118199000,
    title: "Paris Vacation",
  },

  {
    id: 8,
    avatar: Images.avatar1,
    name: "Sam Smith",
    description: "paid you via Apple Pay ",
    amount: 76.5,
    type: Category_Types_Enum.Expense,
    date: 1596118199000,
    title: "Paris Vacation",
  },
  {
    id: 9,
    avatar: Images.avatar1,
    name: "Sam Smith",
    description: "paid you via Apple Pay ",
    amount: 76.5,
    type: Category_Types_Enum.Expense,
    date: 1596118199000,
    title: "Paris Vacation",
  },
  {
    id: 10,
    avatar: Images.avatar1,
    name: "Sam Smith",
    description: "paid you via Apple Pay ",
    amount: 76.5,
    type: Category_Types_Enum.Expense,
    date: 1596118199000,
    title: "Paris Vacation",
  },
];
export const TAB_DATA = [
  {
    id: 0,
    title: "All",
  },
  {
    id: 1,
    title: "Reminders",
  },
  {
    id: 2,
    title: "Payment Received",
  },
  {
    id: 3,
    title: "Payment Sent",
  },
];
export const PRIMARY_CURRENCY = [
  {
    id: "uuid",
    type: "USD",
    image: "usd",
  },
  {
    id: "uuid1",
    type: "GBP",
    image: "gbp",
  },
  {
    id: "uuid2",
    type: "Euro",
    image: "euro",
  },
  {
    id: "uuid3",
    type: "INR",
    image: "rupee",
  },
];

export const FRIENDS_DATA: FriendFragment[] = [
  {
    id: "0",
    type_id: Category_Types_Enum.Income,
    avatar: {
      path: Images.avatar4,
    },
    name: "Alma Harris",
    is_join: false,
    amount: 91.14,
  },
  {
    id: "1",
    type_id: Category_Types_Enum.Income,
    avatar: {
      path: Images.avatar5,
    },
    name: "Lenora Beck",
    is_join: false,
    amount: 73.82,
  },
  {
    ads: true,
  },
  {
    id: "2",
    type_id: Category_Types_Enum.Expense,
    avatar: {
      path: Images.avatar6,
    },
    name: "Rebecca Ryan",
    is_join: true,

    amount: 7.1,
    email: "rebeccaryan@gmail.com",
  },
  {
    id: "3",
    type_id: Category_Types_Enum.Expense,
    avatar: {
      path: Images.avatar7,
    },
    name: "Cora Davis",
    is_join: true,
    email: "coradavis95@gmail.com",
    amount: 69.18,
  },
  {
    id: "4",
    type_id: Category_Types_Enum.Income,
    avatar: {
      path: Images.avatar8,
    },
    name: "Benjamin Willis",
    email: "benjaminwillis@gmail.com",
    is_join: true,
    amount: 24.06,
  },
];

export const FREQUENT_SPEND_DATA = [
  {
    id: 0,
    name: "Bateaux Parisiens",
    timeSpend: 3,
    price: "330",
  },
  {
    id: 1,
    name: "Carrousel du Louvre",
    timeSpend: 3,
    price: "130",
  },
  {
    id: 2,
    name: "L’Ami Louis",
    timeSpend: 2,
    price: "530",
  },
];

export const LARGEST_SPEND_DATE = [
  {
    id: 0,
    icon: "entertainment",
    color: "#3B5998",
    title: "Birthdays and Bottles",
    time: 1587874281,
    amount: 298.5,
  },
  {
    id: 1,
    icon: "entertainment",
    color: "#FFCA62",
    title: "Vedettes du Pont Neuf",
    time: 1587874281,
    amount: "298.50",
  },
  {
    id: 2,
    icon: "shopping",
    color: "#FE9870",
    title: "L'Ami Louis",
    time: 1587874281,
    amount: "298.50",
  },
  {
    id: 3,
    icon: "dining",
    color: "#3B5998",
    title: "Birthdays and Bottles",
    time: 1587874281,
    amount: "298.50",
  },
];

export const BREAKDOWN_DATA = [
  {
    id: 0,
    icon: "entertainment",
    color: "#3B5998",
    title: "entertainment",
    amount: 816.0,
    details: [
      {
        title: "Birthdays and Bottles",
        time: 1587874281,
        amount: 198.8,
        icon: "entertainment",
        color: "#3B5998",
      },
      {
        title: "M&M'S World",
        time: 1587874281,
        amount: 98.8,
        icon: "entertainment",
        color: "#3B5998",
      },
      {
        time: 1587874281,
        amount: 18.8,
        icon: "entertainment",
        title: "M&M'S World",
        color: "#3B5998",
      },
      {
        time: 1587874281,
        amount: 18.8,
        icon: "entertainment",
        title: "M&M'S World",
        color: "#3B5998",
      },
      {
        time: 1587874281,
        amount: 18.8,
        icon: "entertainment",
        title: "M&M'S World",
        color: "#3B5998",
      },
      {
        time: 1587874281,
        amount: 18.8,
        icon: "entertainment",
        title: "M&M'S World",
        color: "#3B5998",
      },
      {
        title: "Bachata , Salsa Party",
        time: 1587874281,
        amount: 18.8,
        icon: "entertainment",
        color: "#3B5998",
      },
      {
        title: "Bachata & Salsa Party",
        time: 1587874281,
        amount: 18.8,
        icon: "entertainment",
        color: "#3B5998",
      },
    ],
  },
  {
    id: 1,
    icon: "shopping",
    color: "#FFCA62",
    title: "shopping",
    amount: 590.0,
    details: [
      {
        title: "Bachata & Salsa Party",
        time: 1587874281,
        amount: 198.8,
        icon: "shopping",
        color: "#FFCA62",
      },
      {
        title: "M&M'S World",
        time: 1587874281,
        amount: 98.8,
        icon: "shopping",
        color: "#FFCA62",
      },
      {
        title: "Bachata & Salsa Party",
        time: 1587874281,
        amount: 18.8,
        icon: "shopping",
        color: "#FFCA62",
      },
      {
        title: "Bachata & Salsa Party",
        time: 1587874281,
        amount: 18.8,
        icon: "shopping",
        color: "#FFCA62",
      },
      {
        title: "Bachata & Salsa Party",
        time: 1587874281,
        amount: 18.8,
        icon: "shopping",
        color: "#FFCA62",
      },
      {
        title: "Bachata & Salsa Party",
        time: 1587874281,
        amount: 18.8,
        icon: "shopping",
        color: "#FFCA62",
      },
      {
        title: "Bachata & Salsa Party",
        time: 1587874281,
        amount: 18.8,
        icon: "shopping",
        color: "#FFCA62",
      },
      {
        title: "Bachata & Salsa Party",
        time: 1587874281,
        amount: 18.8,
        icon: "shopping",
        color: "#FFCA62",
      },
    ],
  },
  {
    id: 2,
    icon: "dining",
    color: "#FE9870",
    title: "dining",
    amount: 352.24,
    details: [
      {
        title: "M&M'S World",
        time: 1587874281,
        amount: 198.8,
        icon: "transportation",
        color: "#FE9870",
      },
      {
        title: "M&M'S World",
        time: 1587874281,
        amount: 98.8,
        icon: "transportation",
        color: "#FE9870",
      },
      {
        title: "M&M'S World",
        time: 1587874281,
        amount: 18.8,
        icon: "transportation",
        color: "#FE9870",
      },
      {
        title: "M&M'S World",
        time: 1587874281,
        amount: 18.8,
        icon: "transportation",
        color: "#FE9870",
      },
      {
        title: "M&M'S World",
        time: 1587874281,
        amount: 18.8,
        icon: "transportation",
        color: "#FE9870",
      },
      {
        title: "M&M'S World",
        time: 1587874281,
        amount: 18.8,
        icon: "transportation",
        color: "#FE9870",
      },
      {
        title: "M&M'S World",
        time: 1587874281,
        amount: 18.8,
        icon: "transportation",
        color: "#FE9870",
      },
      {
        title: "M&M'S World",
        time: 1587874281,
        amount: 18.8,
        icon: "transportation",
        color: "#FE9870",
      },
    ],
  },
  {
    id: 3,
    icon: "uncategory",
    color: "#2574FF",
    title: "uncategory",
    amount: 216,
    details: [
      {
        title: "M&M'S World",
        time: 1587874281,
        amount: 198.8,
        icon: "uncategory",
        color: "#2574FF",
      },
      {
        title: "M&M'S World",
        time: 1587874281,
        amount: 98.8,
        icon: "uncategory",
        color: "#2574FF",
      },
      {
        title: "M&M'S World",
        time: 1587874281,
        amount: 18.5,
        icon: "uncategory",
        color: "#2574FF",
      },
      {
        title: "M&M'S World",
        time: 1587874281,
        amount: 18.5,
        icon: "uncategory",
        color: "#2574FF",
      },
      {
        title: "M&M'S World",
        time: 1587874281,
        amount: 18.5,
        icon: "uncategory",
        color: "#2574FF",
      },
      {
        title: "M&M'S World",
        time: 1587874281,
        amount: 18.5,
        icon: "uncategory",
        color: "#2574FF",
      },
      {
        title: "M&M'S World",
        time: 1587874281,
        amount: 18.5,
        icon: "uncategory",
        color: "#2574FF",
      },
      {
        title: "M&M'S World",
        time: 1587874281,
        amount: 18.5,
        icon: "uncategory",
        color: "#2574FF",
      },
    ],
  },
  {
    id: 4,
    icon: "transportation",
    title: "Transportation",
    amount: 163.76,
    color: "#53D0EC",
    details: [
      {
        title: "M&M'S World",
        color: "#53D0EC",
        time: 1587874281,
        icon: "uncategory",
        amount: 18.5,
      },
      {
        title: "M&M'S World",
        time: 1587874281,
        amount: 18.5,
        icon: "uncategory",
        color: "#53D0EC",
      },
      {
        title: "M&M'S World",
        time: 1587874281,
        amount: 18.5,
        icon: "uncategory",
        color: "#53D0EC",
      },
      {
        title: "M&M'S World",
        time: 1587874281,
        amount: 18.5,
        icon: "uncategory",
        color: "#53D0EC",
      },
      {
        title: "M&M'S World",
        time: 1587874281,
        amount: 18.5,
        icon: "uncategory",
        color: "#53D0EC",
      },
      {
        title: "M&M'S World",
        time: 1587874281,
        amount: 18.5,
        icon: "uncategory",
        color: "#53D0EC",
      },
      {
        title: "M&M'S World",
        time: 1587874281,
        amount: 18.5,
        icon: "uncategory",
        color: "#53D0EC",
      },
    ],
  },
  {
    id: 5,
    icon: "other",
    title: "other",
    amount: 82.52,
    color: "#0EAD69",
    details: [
      {
        title: "M&M'S World",
        time: 1587874281,
        color: "#0EAD69",
        icon: "other",
        amount: 198.4,
      },
      {
        title: "M&M'S World",
        time: 1587874281,
        color: "#0EAD69",
        icon: "other",
        amount: 98.8,
      },
      {
        title: "M&M'S World",
        time: 1587874281,
        color: "#0EAD69",
        icon: "other",
        amount: 18.5,
      },
      {
        title: "M&M'S World",
        time: 1587874281,
        color: "#0EAD69",
        icon: "other",
        amount: 18.5,
      },
      {
        title: "M&M'S World",
        time: 1587874281,
        color: "#0EAD69",
        icon: "other",
        amount: 18.5,
      },
      {
        title: "M&M'S World",
        time: 1587874281,
        color: "#0EAD69",
        icon: "other",
        amount: 18.5,
      },
    ],
  },
];

export const SPLIT_BILL_DATA = [
  {
    id: "0",
    avatar: Images.avatar9,
    name: "Alma Harris",
  },
  {
    id: "1",
    avatar: Images.avatar10,
    name: "Lenora Beck",
  },
  {
    id: "2",
    avatar: Images.avatar11,
    name: "Rebecca Ryan",
  },
  {
    id: "3",
    avatar: Images.avatar12,
    name: "Rebecca Ryan",
  },
];

export const DATA_GROUP = [
  { id: 0, image: Images.avatar, name: "Hieu Le Quang", status: "Owner" },
];

export const DATA_GROUP_FRIEND = [
  {
    id: 0,
    image: Images.avatar,
    name: "Dorothy Arnold",
  },
  {
    id: 1,
    image: Images.avatar2,
    name: "Gregory Lewis",
  },
  {
    id: 2,
    image: Images.avatar1,
    name: "Marguerite Cox",
  },
];

export const DATA_LOCAL_FRIEND = [
  {
    id: 0,
    avatar: Images.avatar1,
    name: "Gordon Hughes",
  },
  {
    id: 1,
    avatar: Images.avatar,
    name: "Gregory Lewis",
  },
];

export const Data_Group: BillPayersProps[] = [
  {
    id: "0",
    name: "Paris Summer Vacation",
    payers: [
      {
        id: "uuid",
        avatar: {
          path: Images.avatar0,
        },
      },
      {
        id: "uuid1",
        avatar: {
          path: Images.avatar13,
        },
      },
      {
        id: "uuid2",
        avatar: {
          path: Images.avatar14,
        },
      },
    ],
  },
  {
    id: "1",
    name: "Avenger: Endgame Ci...",
    payers: [
      {
        id: "uuid",
        avatar: {
          path: Images.avatar0,
        },
      },
      {
        id: "uuid1",
        avatar: {
          path: Images.avatar1,
        },
      },
      {
        id: "uuid2",
        avatar: {
          path: Images.avatar2,
        },
      },
      {
        id: "uuid3",
        avatar: {
          path: Images.avatar3,
        },
      },
    ],
  },
];

export const Data_Categories: CategoryFragment[] = [
  {
    id: "0",
    icon: {
      path: Icons.dinning,
    },
    color: "#FE9870",
    name: "Dining",
  },
  {
    id: "1",
    icon: {
      path: Icons.entertainment,
    },
    color: "#3B5998",
    name: "Entertainment",
  },
  {
    id: "2",
    icon: {
      path: Icons.shopping,
    },
    color: "#FFCA62",
    name: "Shopping",
  },
  {
    id: "3",
    icon: {
      path: Icons.transportation,
    },
    color: "#53D0EC",
    name: "Transportation",
  },
  {
    id: "4",
    icon: {
      path: Icons.other,
    },
    color: "#0EAD69",
    name: "Others",
  },
  {
    id: "5",
    icon: {
      path: Icons.uncategory,
    },
    color: "#2574FF",
    name: "Uncategory",
  },
];

export const Data_Activities: ActivityFragment[] = [
  {
    id: "uuid",
    category: {
      id: "0",
      icon: {
        path: Icons.dinning,
      },
      color: "#FE9870",
    },
    bill: {
      id: "uuid",
      name: "Poulet Sans Tete",
      amount: 232.45,
      created_at: 1594530637000,
    },
    amount: 46, //"amount" is  transactions aggregate
    type_id: Category_Types_Enum.Income,
  },
  {
    id: "uuid1",
    category: {
      id: "1",
      icon: {
        path: Icons.entertainment,
      },
      color: "#3B5998",
    },
    bill: {
      id: "uuid1",
      name: "M&M'S World",
      amount: 486,
      created_at: 1594530637000,
    },
    amount: 45.14,
    type_id: Category_Types_Enum.Income,
  },
  {
    id: "uuid2",
    category: {
      id: "2",
      icon: {
        path: Icons.transportation,
      },
      color: "#53D0EC",
    },
    bill: {
      id: "uuid2",
      name: "Statue of Liberty National Monument",
      amount: 232.45,
      created_at: 1593234637000,
    },
    type_id: Category_Types_Enum.Settled,
  },
  {
    id: "uuid3",
    category: {
      id: "3",
      icon: {
        path: Icons.entertainment,
      },
      color: "#3B5998",
    },
    bill: {
      id: "uuid3",
      name: "Cruises on the Seine",
      amount: 486,
      created_at: 1593234637000,
    },
    amount: 364.5,
    type_id: Category_Types_Enum.Income,
  },
];

export const Data_Activities_Expense: ActivityFragment[] = [
  {
    id: "uuid",
    category: {
      id: "0",
      icon: {
        path: Icons.entertainment,
      },
      color: "#3B5998",
    },
    bill: {
      id: "uuid",
      name: "Escape Games NYC",
      amount: 486,
      created_at: 1594876237000,
    },
    amount: 69.18,
    type_id: Category_Types_Enum.Expense,
  },
  {
    id: "uuid1",
    category: {
      id: "1",
      icon: {
        path: Icons.dinning,
      },
      color: "#FE9870",
    },
    bill: {
      id: "uuid1",
      name: "Grand Central Oyster Bar",
      amount: 232.45,
      created_at: 1592802637000,
    },
    type_id: Category_Types_Enum.Settled,
  },
  {
    id: "uuid2",
    category: {
      id: "2",
      icon: {
        path: Icons.transportation,
      },
      color: "#53D0EC",
    },
    bill: {
      id: "uuid2",
      name: "Statue of Liberty National Monument",
      amount: 232.45,
      created_at: 1592802637000,
    },
    type_id: Category_Types_Enum.Settled,
  },
];

export const Account_Service: AccountService[] = [
  {
    id: "uuid",
    logo_uri: {
      path: Images.master,
    },
    name: "Hieu Le Quang",
    exp_date: 1669852800000,
    cvv: 468,
    account_number: 19033033452346,
    type: {
      kind: {
        id: Payment_Types_Enum.CreditCard,
      },
    },
  },
  {
    id: "uuid",
    logo_uri: {
      path: Images.visa,
    },
    name: "Hieu Le Quang",
    exp_date: 1669852800000,
    cvv: 468,
    account_number: 19033033452346,
    type: {
      kind: {
        id: Payment_Types_Enum.PayPal,
      },
    },
  },
];

export const Payment_Method: PaymentService[] = [
  {
    id: "uuid",
    logo_uri: {
      path: Images.master,
    },
    name: "Credit Card",
    kind_id: Payment_Types_Enum.CreditCard,
  },
  {
    id: "uuid1",
    logo_uri: {
      path: Images.payPal,
    },
    name: "PayPal",
    kind_id: Payment_Types_Enum.PayPal,
  },
  {
    id: "uuid3",
    logo_uri: {
      path: Images.applePay,
    },
    name: "Apple Pay",
    kind_id: Payment_Types_Enum.ApplePay,
  },
];

export const Data_Spending: ActivityFragment[] = [
  {
    id: "uuid",
    category: {
      id: "0",
      icon: {
        path: Icons.entertainment,
      },
      color: "#3B5998",
    },
    amount: 486, //"amount" is  transactions aggregate
    type_id: Category_Types_Enum.Expense,
  },
  {
    id: "uuid1",
    category: {
      id: "1",
      icon: {
        path: Icons.dinning,
      },
      color: "#FE9870",
    },
    amount: 232.45,
    type_id: Category_Types_Enum.Expense,
  },
  {
    id: "uuid2",
    category: {
      id: "2",
      icon: {
        path: Icons.shopping,
      },
      color: "#FFCA62",
    },
    amount: 115.5,
    type_id: Category_Types_Enum.Expense,
  },
  {
    id: "uuid3",
    category: {
      id: "3",
      icon: {
        path: Icons.transportation,
      },
      color: "#53D0EC",
    },
    amount: 68,
    type_id: Category_Types_Enum.Expense,
  },
];

export const Data_Spending_Breakdown: ActivityFragment[] = [
  {
    id: "uuid",
    category: {
      id: "0",
      icon: {
        path: Icons.entertainment,
      },
      color: "#3B5998",
    },
    amount: 121.5, //"amount" is  transactions aggregate
    type_id: Category_Types_Enum.Expense,
  },
  {
    id: "uuid1",
    category: {
      id: "1",
      icon: {
        path: Icons.shopping,
      },
      color: "#FFCA62",
    },
    amount: 115.5,
    type_id: Category_Types_Enum.Expense,
  },
  {
    id: "uuid2",
    category: {
      id: "2",
      icon: {
        path: Icons.dinning,
      },
      color: "#53D0EC",
    },
    amount: 58.12,
    type_id: Category_Types_Enum.Expense,
  },
];
export const DATA_SPENDING_BREAKDOWN: ActivityFragment[] = [
  {
    id: "uuid",
    category: {
      id: "0",
      icon: {
        path: Icons.entertainment,
      },
      color: "#3B5998",
    },
    amount: 816, //"amount" is  transactions aggregate
    type_id: Category_Types_Enum.Expense,
  },
  {
    id: "uuid1",
    category: {
      id: "1",
      icon: {
        path: Icons.shopping,
      },
      color: "#FFCA62",
    },
    amount: 590,
    type_id: Category_Types_Enum.Expense,
  },
  {
    id: "uuid2",
    category: {
      id: "1",
      icon: {
        path: Icons.dinning,
      },
      color: "#FE9870",
    },
    amount: 352.24,
    type_id: Category_Types_Enum.Expense,
  },
  {
    id: "uuid3",
    category: {
      id: "1",
      icon: {
        path: Icons.uncategory,
      },
      color: "#2574FF",
    },
    amount: 168,
    type_id: Category_Types_Enum.Expense,
  },
  {
    id: "uuid4",
    category: {
      id: "2",
      icon: {
        path: Icons.transportation,
      },
      color: "#53D0EC",
    },
    amount: 163,
    type_id: Category_Types_Enum.Expense,
  },
  {
    id: "uuid5",
    category: {
      id: "2",
      icon: {
        path: Icons.other,
      },
      color: "#0EAD69",
    },
    amount: 82.52,
    type_id: Category_Types_Enum.Expense,
  },
];
