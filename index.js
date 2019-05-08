import {AppRegistry} from 'react-native';
import RootContainer from './src/containers/root';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => RootContainer);
