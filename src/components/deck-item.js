import React, {useRef} from 'react';
import {Text, StyleSheet, TouchableOpacity, Animated} from 'react-native';
import {Colors} from '../utils/color';
import {getCardCountText} from '../utils/helper';
import {NavigationPages} from '../navigators/navigation-pages';

const DeckItem = props => {
  const {deck, navigation} = props;

  const scale = useRef(new Animated.Value(150)).current;

  const navigateToCardMenu = () => {
    Animated.sequence([
      Animated.timing(scale, {toValue: 100, duration: 200}),
      Animated.timing(scale, {toValue: 150, duration: 300}),
    ]).start(() => {
      navigation.push(NavigationPages.DeckMenu, {
        deckId: deck._id,
        title: deck.title,
      });
    });
  };

  return (
    <Animated.View style={[styles.card, {height: scale}]}>
      <TouchableOpacity
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
        onPress={() => {
          navigateToCardMenu();
        }}>
        <Text style={styles.title}>{deck.title}</Text>
        <Text style={styles.cardNumber}>{getCardCountText(deck.cards.length)}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    justifyContent: 'center',
    marginHorizontal: 10,
    marginVertical: 5,
    backgroundColor: Colors.loadingBackRoundColor,
    borderBottomWidth: 0,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 2,
  },
  title: {
    color: Colors.primaryColor,
    textAlign: 'center',
    fontSize: 24,
  },
  cardNumber: {
    color: Colors.secondaryColor,
    textAlign: 'center',
    fontSize: 19,
    marginTop: 3,
  },
});

export default DeckItem;
