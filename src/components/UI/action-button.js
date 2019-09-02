import React from 'react';
import PropTypes from 'prop-types';
import {Text, StyleSheet} from 'react-native';
import {TouchableHighlight} from 'react-native-gesture-handler';
import {Colors} from '../../utils/color';

const ActionButton = props => {
  const {buttonText, handleClick, buttonColor = Colors.white, textColor = Colors.black} = props;

  return (
    <TouchableHighlight
      underlayColor={Colors.primaryColor}
      onPress={() => handleClick()}
      style={[styles.button, {backgroundColor: buttonColor}]}>
      <Text style={[styles.buttonText, {color: textColor}]}>{buttonText}</Text>
    </TouchableHighlight>
  );
};

ActionButton.propTypes = {
  buttonText: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  buttonColor: PropTypes.string,
  textColor: PropTypes.string,
};

const styles = StyleSheet.create({
  button: {
    margin: 5,
    padding: 10,
    width: 160,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 20,
    textAlign: 'center',
  },
});

export default ActionButton;
