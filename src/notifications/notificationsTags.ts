import OneSignal from "react-native-onesignal";

export function tagUserInfoCreate() {
  OneSignal.sendTags({
    user_name: "Lucas Loz",
    user_email: "lucass.mark@gmail.com",
  });
}
