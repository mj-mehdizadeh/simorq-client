import React, {Component} from 'react';
import {values} from 'lodash';
import Login from '../components/Login/index';
import i18n, {changeLang} from '../services/i18n';
import {LOCALES} from '../constant/locale';
import {REGISTER_SCREEN} from '../constant/navigator';
import {navigate} from '../services/navigator';

class LoginScreen extends Component {
  constructor() {
    super();
    this.languages = values(LOCALES);
  }

  onSubmit = () => {

  };
  goRegisterScreen = () => {
    navigate(REGISTER_SCREEN);
  };

  render() {
    return <Login
      currentLang={i18n.language}
      languages={this.languages}
      changeLang={changeLang}
      onSubmit={this.onSubmit}
      goRegisterScreen={this.goRegisterScreen}
    />;
  }
}

export default LoginScreen;
