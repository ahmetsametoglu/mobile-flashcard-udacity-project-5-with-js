import React, {useState} from 'react';
import {Text, StyleSheet, TextInput, TouchableHighlight, View} from 'react-native';
import {Colors} from '../utils/color';
import {NavigationPages} from '../navigators/navigation-pages';
import KeyboardView from '../hoc/keyboard-view';
import {AppAction} from '../store/actions/app-action';
import {DeckAction} from '../store/actions/deck-action';
import {useStoreContextValue} from '../store/store-context';

const AddDeck = props => {
  const [deckTitle, setDeckTitle] = useState('');
  const {dispatch} = useStoreContextValue();

  const onSubmitPage = () => {
    console.log('onSubmitPage');

    if (deckTitle !== '') {
      AppAction.showLoading(dispatch, 'saving...');
      DeckAction.addDeck(dispatch, deckTitle)
        .then(res => {
          AppAction.hideLoading(dispatch);
          setDeckTitle('');
          props.navigation.navigate('Decks');
          props.navigation.push(NavigationPages.DeckMenu, {
            deckId: res.newDeck._id,
            title: res.newDeck.title,
          });
        })
        .catch(_ => {
          console.log(_);

          AppAction.hideLoading(dispatch);
        });
    }
  };

  return (
    <KeyboardView>
      <View style={styles.container}>
        <Text style={styles.title}>What is the title of your new deck ?</Text>
        <TextInput
          style={styles.input}
          placeholder="Deck Title"
          placeholderTextColor={Colors.grey}
          onSubmitEditing={onSubmitPage}
          value={deckTitle}
          onChangeText={value => {
            setDeckTitle(value);
          }}
        />
        <TouchableHighlight
          style={styles.button}
          onPress={onSubmitPage}
          underlayColor={Colors.thirdColor}>
          <Text style={{color: Colors.white, fontSize: 20}}>Create Deck</Text>
        </TouchableHighlight>
      </View>
    </KeyboardView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    margin: 10,
  },
  title: {
    margin: 30,
    fontSize: 44,
    textAlign: 'center',
  },
  input: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 18,
    marginTop: 40,
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    flexDirection: 'row',
    borderRadius: 5,
    width: '90%',
  },
  button: {
    marginTop: 50,
    backgroundColor: Colors.primaryColor,
    height: 50,
    width: 120,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
});

export default AddDeck;
