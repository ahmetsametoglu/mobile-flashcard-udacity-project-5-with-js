import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import TabNav from './tab-nav';
import DeckMenu from '../screens/deck-menu';
import {Colors} from '../utils/color';
import Quiz from '../screens/quiz';
import AddCard from '../screens/add-card';

const StackNav = createStackNavigator(
  {
    Home: {
      screen: TabNav,
      navigationOptions: {
        header: null,
      },
    },
    DeckMenu: {
      screen: DeckMenu,
      navigationOptions: ({navigation}) => ({
        title: `${navigation.state.params.title}`,
      }),
    },
    AddCard: {
      screen: AddCard,
      navigationOptions: ({navigation}) => ({
        title: `Add Card`,
      }),
    },
    Quiz: {
      screen: Quiz,
      navigationOptions: ({navigation}) => ({
        title: `${navigation.state.params.title}`,
      }),
    },
  },
  {
    defaultNavigationOptions: {
      headerTintColor: Colors.white,
      headerStyle: {
        height: 40,
        backgroundColor: Colors.black,
        borderBottomColor: Colors.secondaryColor,
      },
      headerBackTitle: null,
    },
  },
);

export default createAppContainer(StackNav);
