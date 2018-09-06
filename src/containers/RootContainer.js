import React, {Component} from 'react';
import {Root, StyleProvider} from 'native-base';
import {Provider} from 'react-redux';
import {I18nextProvider} from 'react-i18next';

import App from './App';
import getTheme from '../theme/components';
import variables from '../theme/variables/material';
import createStore from '../redux/configureStore';
import i18n, {loadUserLang} from '../services/i18n';
import LoadingPage from '../components/LoadingPage';

// create our store
const store = createStore();

export default class RootContainer extends Component {
  state = {
    loading: true,
  };

  async componentDidMount() {
    await Promise.all([
      loadUserLang(),
    ]);
    this.setState({loading: false});
  }

  render() {
    const {loading} = this.state;
    if (loading) {
      return <LoadingPage/>;
    }
    return (
      <I18nextProvider i18n={i18n}>
        <StyleProvider style={getTheme(variables)}>
          <Provider store={store}>
            <Root>
              <App/>
            </Root>
          </Provider>
        </StyleProvider>
      </I18nextProvider>
    );
  }
}
