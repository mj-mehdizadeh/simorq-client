import React, {Component} from 'react';
import {filter, find} from 'lodash';
import Login from '../components/Login/index';
import countryList from '../constant/country';
import {DEFAULT_COUNTRY} from '../constant/config';
import Api from '../services/api';
import {AUTH_LOGIN, AUTH_REGISTER, AUTH_SEND_CODE} from '../constant/methods';
import {mkPhoneNumber} from '../services/core';
import ErrorManager from '../services/error/error_manager';
import {ROOM_LIST_SCREEN} from '../constant/navigator';
import {navigate} from '../services/navigator';
import OAuth from '../services/oauth';

const country = find(countryList, {code: DEFAULT_COUNTRY});

class LoginScreen extends Component {
  constructor() {
    super();
    this.params = {};
    this.state = {
      state: 'sendCode',
      loading: false,
      countryName: country ? country.name : '',
      countryCode: country ? country.dial_code : '',
      phoneNumber: null,
      phoneCode: null,
      title: null,
      invalidCode: false,
    };
  }

  selectCountry = (country) => {
    this.setState({
      countryName: country.name,
      countryCode: country.dial_code,
    });
  };
  searchCountry = (text) => {
    this.setState({
      countryName: text,
      countryList: filter(countryList, function(item) {
        return item.name.toLowerCase().search(text.toLowerCase()) >= 0;
      }),
    });
  };
  changeCountryCode = (text) => {
    const country = find(countryList, {dial_code: text});
    this.setState({countryCode: text, countryName: country ? country.name : ''});
  };
  changePhoneNumber = (text) => {
    this.setState({phoneNumber: text});
  };

  changePhoneCode = (text) => {
    this.setState({phoneCode: text});
  };
  changeTitle = (text) => {
    this.setState({title: text});
  };

  onSubmit = async () => {
    const {state, loading} = this.state;
    if (loading) {
      return;
    }
    this.setState({loading: true});
    if (state === 'sendCode') {
      await this._requestSendCode();
    } else if (state === 'login') {
      await this._requestLogin();
    } else if (state === 'register') {
      await this._requestRegister();
    }
    this.setState({loading: false});
  };

  _requestSendCode = async () => {
    const {phoneNumber, countryCode} = this.state;
    let phone_number = mkPhoneNumber(countryCode, phoneNumber);
    this.params.phone_number = phone_number;

    try {
      const response = await Api.post(AUTH_SEND_CODE, {
        phone_number,
      });
      this.params.phone_hash = response.phone_hash;
      this.setState({state: 'login'});
    } catch (e) {
      ErrorManager.toast(e);
    }
  };
  _requestLogin = async () => {
    const {phoneCode} = this.state;
    const phone_code = parseInt(phoneCode, 10);
    this.params.phone_code = phone_code;
    try {
      const response = await Api.post(AUTH_LOGIN, {
        phone_number: this.params.phone_number,
        phone_hash: this.params.phone_hash,
        phone_code,
      });
      await OAuth.grantPassword(this.params.phone_number, response.login_hash);
      navigate(ROOM_LIST_SCREEN);
    } catch (e) {
      if (e.name === 'invalid_phone_number') {
        this.setState({state: 'register'});
      } else {
        ErrorManager.toast(e);
      }
      if (e.name === 'invalid_phone_code') {
        this.setState({invalidCode: true});
      }
    }
  };
  _requestRegister = async () => {
    const {title} = this.state;
    try {
      const response = await Api.post(AUTH_REGISTER, {
        title,
        phone_number: this.params.phone_number,
        phone_hash: this.params.phone_hash,
        phone_code: this.params.phone_code,
      });
      await OAuth.grantPassword(this.params.phone_number, response.login_hash);
      navigate(ROOM_LIST_SCREEN);
    } catch (e) {
      if (e.name === 'invalid_phone_code') {
        this.setState({state: 'login', invalidCode: true});
      }
      if (e.name === 'invalid_phone_number') {
        this.setState({state: 'sendCode'});
      } else {
        ErrorManager.toast(e);
      }
    }
  };

  _showSubmit() {
    const {state, phoneNumber, countryCode, phoneCode, title} = this.state;
    return (state === 'sendCode' && phoneNumber && countryCode) ||
      (state === 'login' && phoneCode) ||
      (state === 'register' && phoneCode && title);
  }

  render() {
    const {state, loading, phoneNumber, countryName, countryCode, phoneCode, title, invalidCode, countryList} = this.state;
    return <Login
      loading={loading}
      state={state}
      showSubmit={!!this._showSubmit()}
      phoneNumber={phoneNumber}
      countryName={countryName}
      countryCode={countryCode}
      countryList={countryList}
      phoneCode={phoneCode}
      title={title}
      invalidCode={invalidCode}
      selectCountry={this.selectCountry}
      searchCountry={this.searchCountry}
      changeCountryCode={this.changeCountryCode}
      changePhoneNumber={this.changePhoneNumber}
      changePhoneCode={this.changePhoneCode}
      changeTitle={this.changeTitle}
      onSubmit={this.onSubmit}
    />;
  }
}

export default LoginScreen;
