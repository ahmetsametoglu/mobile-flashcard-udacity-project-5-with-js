import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {NavigationPages} from '../navigators/navigation-pages';
import {TouchableHighlight} from 'react-native-gesture-handler';
import {Colors} from '../utils/color';
import {getCardCountText} from '../utils/helper';
import {DeckAction} from '../store/actions/deck-action';
import {AppAction} from '../store/actions/app-action';
import {useStoreContextValue} from '../store/store-context';

const DeckMenu = props => {
  const {state, dispatch} = useStoreContextValue();

  const {navigation} = props;
  const {deckId} = navigation.state.params;

  const selectedDeck = state.deck.deckList.find(d => d._id == deckId);

  const onDeleteDeck = () => {
    AppAction.showLoading(dispatch, 'deleting...');
    DeckAction.removeDeck(dispatch, deckId)
      .then(res => {
        AppAction.hideLoading(dispatch);
        props.navigation.navigate(NavigationPages.Home);
      })
      .catch(_ => {
        AppAction.hideLoading(dispatch);
      });
  };

  return (
    !!selectedDeck && (
      <View style={{flex: 1, margin: 40}}>
        <View style={styles.infoSection}>
          <Text style={styles.title}>{selectedDeck.title}</Text>
          <Text style={styles.description}>{getCardCountText(selectedDeck.cards.length)}</Text>
        </View>
        <View style={styles.buttonSection}>
          <TouchableHighlight
            underlayColor={Colors.thirdColor}
            style={[styles.button, {backgroundColor: Colors.white}]}
            onPress={() =>
              navigation.push(NavigationPages.AddCard, {
                deckId: selectedDeck._id,
              })
            }>
            <Text style={[styles.buttonLabel, {color: Colors.black}]}>Add Card</Text>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor={Colors.thirdColor}
            style={[styles.button, {backgroundColor: Colors.black}]}
            onPress={() =>
              navigation.push(NavigationPages.Quiz, {
                title: selectedDeck.title,
                id: selectedDeck._id,
              })
            }>
            <Text style={[styles.buttonLabel, {color: Colors.white}]}>Start Quiz</Text>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor={Colors.thirdColor}
            style={[styles.button, {borderColor: Colors.white}]}
            onPress={onDeleteDeck}>
            <Text style={[styles.buttonLabel, {color: Colors.red}]}>Delete Deck</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  infoSection: {
    flex: 5,
    paddingBottom: 90,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonSection: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: '400',
  },
  description: {
    fontSize: 25,
    color: Colors.grey,
  },
  button: {
    flexDirection: 'row',
    borderWidth: 1,
    height: 60,
    borderRadius: 5,
    margin: 8,
    width: '100%',
  },
  buttonLabel: {
    flex: 1,
    flexDirection: 'row',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: 'normal',
    fontSize: 20,
  },
});

export default DeckMenu;
