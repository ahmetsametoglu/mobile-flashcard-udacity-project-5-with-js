import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input} from 'react-native-elements';
import {Colors} from '../../utils/color';
import PropTypes from 'prop-types';

const MyInput = props => {
  const {onValueChanged, value, placeHolder, labelText, iconName} = props;

  return (
    <Input
      value={value}
      onChangeText={value => {
        onValueChanged(value);
      }}
      containerStyle={{marginTop: 20}}
      label={labelText}
      placeholder={placeHolder}
      errorStyle={{color: 'red'}}
      leftIconContainerStyle={{margin: 10}}
      leftIcon={!!iconName ? <Icon name={iconName} size={24} color={Colors.primaryColor} /> : null}
    />
  );
};

MyInput.propTypes = {
  onValueChanged: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  placeHolder: PropTypes.string,
  labelText: PropTypes.string,
  iconName: PropTypes.string,
};

export default MyInput;
