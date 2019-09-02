import React from 'react';
import {View} from 'react-native';
import DeckList from '../components/deck-list';

const Decks = props => {
  return (
    <View style={{flex: 1}}>
      <DeckList navigation={props.navigation} />
    </View>
  );
};

export default Decks;
