import React, {Component} from 'react';
import {View} from 'react-native';
import AppNavigator from '../navigation/AppNavigator';
import {navigate, setContainer} from '../services/navigator';
import {APP_NAVIGATOR, AUTH_NAVIGATOR} from '../constant/navigator';
import {translate} from 'react-i18next';
import PropTypes from 'prop-types';
import {setT} from '../services/i18n';
import OAuth from '../services/oauth';

class App extends Component {

  componentDidMount() {
    setT(this.props.t);
    if (OAuth.getToken()) {
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

App.propTypes = {
  t: PropTypes.func.isRequired,
};
export default translate()(App);
