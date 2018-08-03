import {StackNavigator} from 'react-navigation';
import Home from '../screens/home';
import {HOME_SCREEN, REGISTER_SCREEN} from '../constant/navigator';
import {LOGIN_SCREEN} from '../constant/navigator';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
// import TestScreen from '../screens/TestScreen';

const AppNavigator = StackNavigator(
  {
    [HOME_SCREEN]: {screen: Home},
    [LOGIN_SCREEN]: {screen: LoginScreen},
    [REGISTER_SCREEN]: {screen: RegisterScreen},
    // 'TEST': {screen: TestScreen},
  },
  {
    // initialRouteName: 'TEST',
    initialRouteName: LOGIN_SCREEN,
    headerMode: 'none',
  },
);

export default AppNavigator;
