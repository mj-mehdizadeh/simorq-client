import React, {Component} from 'react';
import {Root, StyleProvider} from 'native-base';
import {Provider} from 'react-redux';
import {I18nextProvider} from 'react-i18next';
import getTheme from '../theme/components';
import variables from '../theme/variables/material';
import createStore from '../redux/configureStore';
import i18n from '../services/i18n';
import AppNavigator from '../navigation/AppNavigator';
import {setContainer} from '../services/navigator';

// create our store
const store = createStore();

export default class RootContainer extends Component {
  setNavigationRef = (navigatorRef) => {
    setContainer(navigatorRef);
  };
  render() {
    return (
      <I18nextProvider i18n={i18n}>
        <StyleProvider style={getTheme(variables)}>
          <Provider store={store}>
            <Root>
              <AppNavigator ref={this.setNavigationRef}/>
            </Root>
          </Provider>
        </StyleProvider>
      </I18nextProvider>
    );
  }
}
