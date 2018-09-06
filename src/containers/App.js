import React, {Component} from 'react';
import {StatusBar, View} from 'react-native';
import AppNavigator from '../navigation/AppNavigator';
import {setContainer} from '../services/navigator';

class App extends Component {

  setNavigationRef = (navigatorRef) => {
    setContainer(navigatorRef);
  };

  render() {
    return <View style={{flex: 1}}>
      <StatusBar backgroundColor={'#941e1e'} barStyle="light-content"/>
      <AppNavigator ref={this.setNavigationRef}/>
    </View>;
  }
}

export default App;
