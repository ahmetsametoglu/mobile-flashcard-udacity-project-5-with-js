import React, {useState, Fragment} from 'react';
import {View, Text, TouchableHighlight, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import CardFlip from 'react-native-card-flip';
import ActionButton from '../UI/action-button';
import {Colors} from '../../utils/color';

const QuestionCard = props => {
  const {question, onAnswerQuestion} = props;
  const [showAnswer, setShowAnswer] = useState(false);

  const handleOnAnswerQuestion = answer => {
    setShowAnswer(false);
    onAnswerQuestion(answer);
    flipCard.flip();
  };

  const showAnswerButton = (
    <TouchableHighlight
      underlayColor="transparent"
      style={{height: 40, padding: 10}}
      onPress={() => {
        if (!showAnswer) {
          flipCard.flip();
          setShowAnswer(true);
        }
      }}>
      {!showAnswer ? (
        <View style={styles.showAnswerButton}>
          <Icon name="refresh" size={18} color={Colors.grey} />
          <Text
            style={{
              marginLeft: 7,
              color: Colors.grey,
              fontSize: 18,
            }}>
            show answer
          </Text>
        </View>
      ) : (
        <View />
      )}
    </TouchableHighlight>
  );

  const actionButtons = (
    <View style={styles.actionButtons}>
      <ActionButton
        buttonColor={Colors.errorColor}
        textColor={Colors.white}
        buttonText="Incorrect"
        handleClick={() => handleOnAnswerQuestion(false)}
      />
      <ActionButton
        buttonColor={Colors.successColor}
        textColor={Colors.white}
        buttonText="Correct"
        handleClick={() => handleOnAnswerQuestion(true)}
      />
    </View>
  );

  let flipCard;
  return (
    <Fragment>
      <CardFlip style={styles.cardContainer} ref={_card => (flipCard = _card)}>
        <View style={[styles.card, {backgroundColor: Colors.primaryColor}]}>
          <Text style={styles.question}>{question.question}</Text>
        </View>

        <View style={[styles.card, {backgroundColor: Colors.secondaryColor}]}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {showAnswer && <Text style={styles.answer}>{question.answer}</Text>}
          </View>
          {actionButtons}
        </View>
      </CardFlip>

      {showAnswerButton}
    </Fragment>
  );
};

QuestionCard.propTypes = {
  question: PropTypes.object.isRequired,
  onAnswerQuestion: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
  },
  card: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    borderColor: Colors.grey,
    borderBottomWidth: 0,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 2,
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  showAnswerButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  question: {
    color: Colors.white,
    fontSize: 34,
    textAlign: 'center',
  },
  answer: {
    color: Colors.white,
    fontSize: 30,
    textAlign: 'center',
  },
});

export default QuestionCard;
