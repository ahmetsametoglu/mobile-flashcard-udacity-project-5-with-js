import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import KeyboardView from '../hoc/keyboard-view';
import MyInput from '../components/UI/my-input';
import {TouchableHighlight} from 'react-native-gesture-handler';
import {Text} from 'react-native-elements';
import {Colors} from '../utils/color';
import {DeckAction} from '../store/actions/deck-action';
import {AppAction} from '../store/actions/app-action';
import {useStoreContextValue} from '../store/store-context';

const AddCard = props => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const {dispatch} = useStoreContextValue();

  const {deckId} = props.navigation.state.params;

  const onSubmitPage = () => {
    console.log('onSubmitPage');

    if (question !== '' && answer !== '') {
      AppAction.showLoading(dispatch, 'saving...');
      DeckAction.addCard(dispatch, deckId, question, answer)
        .then(res => {
          AppAction.hideLoading(dispatch);
          setQuestion('');
          setAnswer('');
          props.navigation.pop();
        })
        .catch(_ => {
          AppAction.hideLoading(dispatch);
        });
    }
  };

  return (
    <KeyboardView>
      <View style={styles.container}>
        <MyInput
          labelText="question"
          onValueChanged={value => setQuestion(value)}
          value={question}
        />
        <MyInput labelText="answer" onValueChanged={value => setAnswer(value)} value={answer} />

        <TouchableHighlight
          style={styles.button}
          onPress={onSubmitPage}
          underlayColor={Colors.thirdColor}>
          <Text style={{color: Colors.white, fontSize: 20}}>Create Card</Text>
        </TouchableHighlight>
      </View>
    </KeyboardView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
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

export default AddCard;
