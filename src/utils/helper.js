import {AsyncStorage} from 'react-native';
import {Notifications} from 'expo';
import * as Permissions from 'expo-permissions';

export const getCardCountText = cardCount => {
  switch (cardCount) {
    case 0:
      return 'no card';
    case 1:
      return '1 card';
    default:
      return `${cardCount} cards`;
  }
};

const NOTIFICATION_KEY = 'FlashCards:notifications';
const createNotification = () => {
  return {
    title: 'Test your self!',
    body: "don't forget to study with flashcards !",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    },
  };
};

const clearLocalNotification = () => {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync,
  );
};

const setLocalNotification = () => {
  AsyncStorage.getItem(NOTIFICATION_KEY).then(data => {
    const today = new Date().toDateString();
    if (data === null || data !== today) {
      console.log('notification creating...');

      Permissions.askAsync(Permissions.NOTIFICATIONS).then(({status}) => {
        console.log('Permissions.NOTIFICATIONS status:', status);

        if (status === 'granted') {
          Notifications.cancelAllScheduledNotificationsAsync();

          let tomorrow = new Date();
          tomorrow.setDate(tomorrow.getDate() + 1);
          tomorrow.setHours(20);
          tomorrow.setMinutes(0);

          Notifications.scheduleLocalNotificationAsync(createNotification(), {
            time: tomorrow,
            repeat: 'day',
          });

          AsyncStorage.setItem(NOTIFICATION_KEY, today);
        }
      });
    }
  });
};

export const NotificationHelper = {
  clearLocalNotification,
  setLocalNotification,
};
