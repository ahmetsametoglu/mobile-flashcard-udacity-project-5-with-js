import React, {Fragment} from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import {Colors} from '../utils/color';
import {useStoreContextValue} from '../store/store-context';

const Loading = props => {
  const {state} = useStoreContextValue();

  if (state.app.showLoading) {
    return (
      <Fragment>
        {props.children}
        <View style={styles.container}>
          <ActivityIndicator size={50} color={Colors.primaryColor} />
          {!!state.app.loadingText && (
            <Text style={{fontSize: 20, color: Colors.red, marginTop: 10}}>
              {state.app.loadingText}
            </Text>
          )}
        </View>
      </Fragment>
    );
  } else {
    return <Fragment>{props.children}</Fragment>;
  }
};

const styles = StyleSheet.create({
  container: {
    zIndex: 50,
    position: 'absolute',
    flex: 1,
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.loadingBackRoundColor,
  },
});

export default Loading;
