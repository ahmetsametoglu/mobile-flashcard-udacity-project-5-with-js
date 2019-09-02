import React, {useState, Fragment} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {NotificationHelper} from '../utils/helper';
import {Colors} from '../utils/color';
import QuestionCard from '../components/QuestionCard/question-card';
import ActionButton from '../components/UI/action-button';
import {useStoreContextValue} from '../store/store-context';

const Quiz = props => {
  const {navigation} = props;
  const {state} = useStoreContextValue();

  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(1);

  const deckId = navigation.state.params.id;
  const selectedDeck = state.deck.deckList.find(d => d._id === deckId);

  if (!selectedDeck || selectedDeck.cards.length === 0) {
    return <ThereIsNoCard />;
  }

  const handleAnswerQuestion = isCorrect => {
    if (isCorrect) {
      setScore(score + 1);
    }
    setCurrentQuestion(currentQuestion + 1);
    setTimeout(() => {}, 250);
  };

  const handleRestartQuiz = () => {
    setScore(0);
    setCurrentQuestion(1);
  };

  const scoreView = () => {
    NotificationHelper.clearLocalNotification().then(NotificationHelper.setLocalNotification);

    const scorePercentage = Math.round((score / selectedDeck.cards.length) * 100);

    const color =
      scorePercentage < 35
        ? Colors.errorColor
        : scorePercentage < 70
        ? Colors.secondaryColor
        : Colors.successColor;

    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={[styles.score, {color: color}]}>{`${scorePercentage} %`}</Text>
        </View>

        <ActionButton
          buttonText="Restart Quiz"
          handleClick={handleRestartQuiz}
          textColor={Colors.secondaryColor}
        />
        <ActionButton
          buttonText="Back to Deck"
          handleClick={_ => navigation.pop()}
          textColor={Colors.primaryColor}
        />
      </View>
    );
  };

  const questionView = (
    <Fragment>
      <View style={styles.infoSection}>
        <Text style={styles.quizInfo}>{`${currentQuestion}/${selectedDeck.cards.length}`}</Text>
        <Text style={styles.scoreInfo}>{`score: ${score}`}</Text>
      </View>
      {currentQuestion <= selectedDeck.cards.length && (
        <QuestionCard
          question={selectedDeck.cards[currentQuestion - 1]}
          onAnswerQuestion={handleAnswerQuestion}
        />
      )}
    </Fragment>
  );

  return (
    <View style={{flex: 1, padding: 20}}>
      {currentQuestion > selectedDeck.cards.length ? scoreView() : questionView}
    </View>
  );
};

const styles = StyleSheet.create({
  infoSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  quizInfo: {
    fontSize: 20,
    color: Colors.errorColor,
  },
  scoreInfo: {
    fontSize: 20,
    color: Colors.successColor,
  },
  score: {
    fontSize: 72,
    color: Colors.primaryColor,
  },
});

export default Quiz;

const ThereIsNoCard = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{margin: 25, fontSize: 23, textAlign: 'center'}}>
        Sorry, you can't take a quiz because there are no card in the deck.
      </Text>
    </View>
  );
};
