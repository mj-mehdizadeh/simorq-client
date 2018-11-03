import {createSwitchNavigator, createStackNavigator} from 'react-navigation';
import Home from '../screens/home';
import {APP_NAVIGATOR, AUTH_NAVIGATOR, HOME_SCREEN, LOGIN_SCREEN, REGISTER_SCREEN, ROOM_HISTORY_SCREEN, ROOM_LIST_SCREEN} from '../constant/navigator';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import RoomListScreen from '../screens/RoomListScreen';
import RoomHistoryScreen from '../screens/RoomHistoryScreen';
// import TestScreen from '../screens/TestScreen';

const AppNavigator = createStackNavigator(
  {
    [HOME_SCREEN]: {screen: Home},
    [ROOM_LIST_SCREEN]: {screen: RoomListScreen},
    [ROOM_HISTORY_SCREEN]: {screen: RoomHistoryScreen},
    // 'TEST': {screen: TestScreen},
  },
  {
    // initialRouteName: 'TEST',
    initialRouteName: ROOM_LIST_SCREEN,
    headerMode: 'none',
  },
);

const AuthNavigator = createStackNavigator(
  {
    [LOGIN_SCREEN]: {screen: LoginScreen},
    [REGISTER_SCREEN]: {screen: RegisterScreen},
  },
  {
    initialRouteName: LOGIN_SCREEN,
    headerMode: 'none',
  },
);

export default createSwitchNavigator(
  {
    [APP_NAVIGATOR]: AppNavigator,
    [AUTH_NAVIGATOR]: AuthNavigator,
  },
  {
    initialRouteName: APP_NAVIGATOR,
  }
);
