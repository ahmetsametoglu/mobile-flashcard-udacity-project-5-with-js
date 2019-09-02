import React from 'react';
import {View, StatusBar} from 'react-native';

import Constants from 'expo-constants';
import {Colors} from './src/utils/color';
import {NotificationHelper} from './src/utils/helper';
import StackNav from './src/navigators/stack-nav';
import Loading from './src/hoc/loading';
import StoreContextProvider from './src/store/store-context';

const App = () => {
  console.log('[App]: init');

  NotificationHelper.setLocalNotification();

  return (
    <StoreContextProvider>
      <View style={{flex: 1}}>
        <View
          style={{
            backgroundColor: Colors.thirdColor,
            height: Constants.statusBarHeight,
          }}>
          <StatusBar translucent backgroundColor={Colors.thirdColor} barStyle="light-content" />
        </View>
        <Loading>
          <StackNav />
        </Loading>
      </View>
    </StoreContextProvider>
  );
};

export default App;
