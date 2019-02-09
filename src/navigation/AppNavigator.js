import {createStackNavigator, createSwitchNavigator} from 'react-navigation';
import Home from '../screens/home';
import {APP_NAVIGATOR, AUTH_NAVIGATOR, HOME_SCREEN, LOGIN_SCREEN, ROOM_LIST_SCREEN} from '../constant/navigator';
import LoginScreen from '../screens/LoginScreen';
import RoomListScreen from '../screens/RoomListScreen';
import AppLoader from '../containers/AppLoader';
// import TestScreen from '../screens/TestScreen';

const AppNavigator = createStackNavigator(
  {
    [HOME_SCREEN]: {screen: Home},
    [ROOM_LIST_SCREEN]: {screen: RoomListScreen},
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
  },
  {
    initialRouteName: LOGIN_SCREEN,
    headerMode: 'none',
  },
);

export default createSwitchNavigator(
  {
    AppLoader: AppLoader,
    [APP_NAVIGATOR]: AppNavigator,
    [AUTH_NAVIGATOR]: AuthNavigator,
  },
  {
    initialRouteName: 'AppLoader',
  },
);
