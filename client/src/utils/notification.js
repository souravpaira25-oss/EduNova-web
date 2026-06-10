import { getToken } from "firebase/messaging";
import { messaging } from "../firebase";

export const requestNotificationPermission = async () => {
  try {
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: "BD9HVC6HtoxHWbi2B2pvhWyb-Q8X8WMrLICcbpS0OARSDxlkI4VBpNGl4UUaHw-Rx_Sxm5otwNSo3z6JcLA7YfM"
      });

      console.log("FCM Token:", token);

      return token;
    }
  } catch (error) {
    console.log(error);
  }
};