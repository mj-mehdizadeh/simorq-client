import React, {Component} from 'react';
import {View} from 'react-native';
import AppNavigator from '../navigation/AppNavigator';
import {navigate, setContainer} from '../services/navigator';
import {getAuthToken} from '../services/auth';
import {APP_NAVIGATOR, AUTH_NAVIGATOR} from '../constant/navigator';

class App extends Component {


  componentDidMount() {
    if (getAuthToken()) {
      return navigate(APP_NAVIGATOR);
    }
    navigate(AUTH_NAVIGATOR);
  }

  setNavigationRef = (navigatorRef) => {
    setContainer(navigatorRef);
  };

  render() {
    return <View style={{flex: 1}}>
      <AppNavigator ref={this.setNavigationRef}/>
    </View>;
  }
}

export default App;
