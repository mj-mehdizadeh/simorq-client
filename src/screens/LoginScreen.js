import React, {Component} from 'react';
import {filter, find} from 'lodash';
import Login from '../components/Login/index';
import countryList from '../constant/country';
import {DEFAULT_COUNTRY} from '../constant/config';

const country = find(countryList, {code: DEFAULT_COUNTRY});

class LoginScreen extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      countryName: country ? country.name : '',
      countryCode: country ? country.dial_code : '',
      phoneNumber: null,
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

  onSubmit = () => {

  };

  render() {
    const {loading, phoneNumber, countryName, countryCode, countryList} = this.state;
    return <Login
      loading={loading}
      phoneNumber={phoneNumber}
      countryName={countryName}
      countryCode={countryCode}
      countryList={countryList}
      selectCountry={this.selectCountry}
      searchCountry={this.searchCountry}
      changeCountryCode={this.changeCountryCode}
      changePhoneNumber={this.changePhoneNumber}
      onSubmit={this.onSubmit}
    />;
  }
}

export default LoginScreen;
