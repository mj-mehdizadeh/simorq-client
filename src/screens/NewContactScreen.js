import React, {Component} from 'react';
import NewContact from '../components/NewContact';
import RoomsCreators from '../redux/rooms';
import connect from 'react-redux/es/connect/connect';
import {filter, find} from 'lodash';
import countryList from '../constant/country';
import {DEFAULT_COUNTRY} from '../constant/config';
import {importContact} from '../services/contacts';
import {goBack} from '../utils/navigator';

const country = find(countryList, {code: DEFAULT_COUNTRY});

class NewContactScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      page: 'CREATE',
      firstName: null,
      lastName: null,
      phoneNumber: null,
      countryName: country ? country.name : '',
      countryCode: country ? country.dial_code : '',
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
  changeFirstName = (text) => {
    this.setState({firstName: text});
  };
  changeLastName = (text) => {
    this.setState({lastName: text});
  };

  onSubmit = async () => {
    this.setState({loading: true});
    if (this.state.page === 'CREATE') {
      await this.actionCreate();
    } else {
      await this.actionEdit();
    }
    this.setState({loading: false});
  };

  actionCreate = async () => {
    const {firstName, lastName, phoneNumber, countryCode} = this.state;
    await importContact({
      title: (firstName + ' ' + lastName).replace(/\s+/g, ' ').trim(),
      phone_number: parseInt(countryCode + phoneNumber, 10),
    }).catch(err => null);
    goBack();
  };

  actionEdit = async () => {
  };

  render() {
    return (
      <NewContact

        page={this.state.page}
        showSubmit={this.state.phoneNumber && this.state.firstName}
        loading={this.state.loading}
        onSubmit={this.onSubmit}

        firstName={this.state.firstName}
        lastName={this.state.lastName}
        phoneNumber={this.state.phoneNumber}
        countryName={this.state.countryName}
        countryCode={this.state.countryCode}

        changeFirstName={this.changeFirstName}
        changeLastName={this.changeLastName}
        changePhoneNumber={this.changePhoneNumber}
        changeCountryCode={this.changeCountryCode}
        selectCountry={this.selectCountry}
        searchCountry={this.searchCountry}
      />
    );
  }
}

function bindAction(dispatch) {
  return {
    appendRoom: room => dispatch(RoomsCreators.appendRoom(room)),
  };
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps, bindAction)(NewContactScreen);
