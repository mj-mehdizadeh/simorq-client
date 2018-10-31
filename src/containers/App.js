import React, {Component} from 'react';
import {View} from 'react-native';
import AppNavigator from '../navigation/AppNavigator';
import {setContainer} from '../services/navigator';

class App extends Component {

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
