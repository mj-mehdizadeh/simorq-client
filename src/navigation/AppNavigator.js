import {StackNavigator} from 'react-navigation';
import Home from '../screens/home';
import {HOME_SCREEN, LOGIN_SCREEN, REGISTER_SCREEN, ROOM_HISTORY_SCREEN, ROOM_LIST_SCREEN} from '../constant/navigator';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import RoomListScreen from '../screens/RoomListScreen';
import RoomHistoryScreen from '../screens/RoomHistoryScreen';
// import TestScreen from '../screens/TestScreen';

const AppNavigator = StackNavigator(
  {
    [HOME_SCREEN]: {screen: Home},
    [LOGIN_SCREEN]: {screen: LoginScreen},
    [REGISTER_SCREEN]: {screen: RegisterScreen},
    [ROOM_LIST_SCREEN]: {screen: RoomListScreen},
    [ROOM_HISTORY_SCREEN]: {screen: RoomHistoryScreen},
    // 'TEST': {screen: TestScreen},
  },
  {
    // initialRouteName: 'TEST',
    initialRouteName: LOGIN_SCREEN,
    headerMode: 'none',
  },
);

export default AppNavigator;
