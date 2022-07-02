import "dotenv/config";
import { ExpoConfig, ConfigContext } from "@expo/config";
import dayjs from "dayjs";
import useAppTheme from "hooks/useAppTheme";
import { Images } from "assets/images";

type State = "stag" | "prod";

type ENVConfig = {
  name: string;
  slug: string;
  API_ENDPOINT: string;
  MEDIA_ENDPOINT: string;
  android: {
    package: string;
    playStoreUrl?: string;
  };
  ios: {
    bundleIdentifier: string;
    appStoreUrl?: string;
  };
};

const envs: Record<State, ENVConfig> = {
  stag: {
    name: "FairPay",
    slug: "fairpay",
    API_ENDPOINT: "",
    MEDIA_ENDPOINT: "",
    android: {
      package: "",
    },
    ios: {
      bundleIdentifier: "",
    },
  },
  prod: {
    name: "FairPay",
    slug: "fairpay",
    API_ENDPOINT: "",
    MEDIA_ENDPOINT: "",
    android: {
      package: "",
    },
    ios: {
      bundleIdentifier: "",
    },
  },
};

export default ({ config }: ConfigContext): ExpoConfig => {
  const { theme } = useAppTheme();
  const state: State = process.env.EXPO_STATE === "prod" ? "prod" : "stag";
  const today = dayjs();
  const version = `${config.version}.${today.format("YYMMDD")}`;
  const androidVersionCode = +today.format("YYMMDDHH");
  const gitcommit = process.env.GIT_COMMIT || "";
  const image = theme === "light" ? Images.splashLight : Images.splashDark;
  const backgroundColor = theme === "light" ? "#F9F9F9" : "#141415";

  const env = envs[state];

  return {
    ...config,
    version,
    name: env.name,
    slug: env.slug,
    splash: {
      image,
      resizeMode: "contain",
      backgroundColor,
    },
    extra: {
      API_ENDPOINT: env.API_ENDPOINT,
      MEDIA_ENDPOINT: env.MEDIA_ENDPOINT,
      GIT_COMMIT: gitcommit,
    },
    android: {
      ...config.android,
      package: env.android.package,
      googleServicesFile: `./configs/${state}/google-services.json`,
      versionCode: androidVersionCode,
    },
    ios: {
      ...config.ios,
      bundleIdentifier: env.ios.bundleIdentifier,
      googleServicesFile: `./configs/${state}/GoogleService-Info.plist`,
      buildNumber: version,
    },
    web: {
      ...config.web,
      config: {
        ...config.web?.config,
        firebase: require(`./configs/${state}/firebaseConfigs.json`),
      },
    },
  };
};
