import React, {Component} from 'react';
import {Root, StyleProvider} from 'native-base';
import {Provider} from 'react-redux';
import {I18nextProvider} from 'react-i18next';
import getTheme from '../theme/components';
import variables from '../theme/variables/material';
import {persistor, store} from '../redux/configureStore';
import i18n from '../utils/i18n';
import AppNavigator from '../navigation/AppNavigator';
import {setContainer} from '../utils/navigator';

// create our store

export default class RootContainer extends Component {
  setNavigationRef = (navigatorRef) => {
    setContainer(navigatorRef);
  };

  render() {
    return (
      <I18nextProvider i18n={i18n}>
        <StyleProvider style={getTheme(variables)}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <Root>
                <AppNavigator ref={this.setNavigationRef}/>
              </Root>
            </PersistGate>
          </Provider>
        </StyleProvider>
      </I18nextProvider>
    );
  }
}
