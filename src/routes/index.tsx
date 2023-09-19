import { useTheme } from "native-base";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";

import { AppRoutes } from "./app.routes";
import { useEffect, useState } from "react";
import OneSignal, {
  NotificationReceivedEvent,
  OSNotification,
} from "react-native-onesignal";
import { Notification } from "../components/Notification";

export function Routes() {
  const [notification, setNotificaton] = useState<OSNotification | null>(null);
  const { colors } = useTheme();

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];

  useEffect(() => {
    const unsubscribe = OneSignal.setNotificationWillShowInForegroundHandler(
      (notificationReceivedEvent: NotificationReceivedEvent) => {
        const response = notificationReceivedEvent.getNotification();

        setNotificaton(response);
      }
    );

    return () => unsubscribe;
  }, []);

  return (
    <NavigationContainer theme={theme}>
      <AppRoutes />

      {notification && (
        <Notification
          data={notification}
          onClose={() => setNotificaton(null)}
        />
      )}
    </NavigationContainer>
  );
}
