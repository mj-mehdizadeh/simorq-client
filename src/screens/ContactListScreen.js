import React, {Component} from 'react';
import connect from 'react-redux/es/connect/connect';
import ContactList from '../components/ContactList';
import {getContactsRooms} from '../selector/contacts';


class ContactListScreen extends Component {

  render() {
    const {contactList} = this.props;
    return <ContactList contactList={contactList} />;
  }
}

const mapStateToProps = state => ({
  contactList: getContactsRooms(state),
});

export default connect(mapStateToProps)(ContactListScreen);
