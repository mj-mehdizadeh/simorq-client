import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {translate} from 'react-i18next';
import styles from '../NewContact/styles';
import {Body, Button, Container, Header, Icon, Left} from 'native-base';
import {goBack} from '../../utils/navigator';
import {FlatList} from 'react-native';
import RoomCardContainer from '../../containers/room/card';

class ContactList extends Component {
  render() {
    const {t, contactList} = this.props;
    return (
      <Container style={styles.container}>
        <Header style={styles.header}>
          <Left>
            <Button transparent>
              <Icon onPress={goBack} style={styles.arrowIcon} name={'arrow-back'}/>
            </Button>
          </Left>
          <Body>{t('contactList.title')}</Body>
        </Header>
        <FlatList
          style={styles.flatList}
          data={contactList}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      </Container>
    );
  }

  _keyExtractor = (item) => `contact-${item}`;
  _renderItem = ({item, index}) => <RoomCardContainer
    type={'contact'}
    roomId={item}
    index={index}
  />;
}

ContactList.propTypes = {
  t: PropTypes.func.isRequired,
  contactList: PropTypes.arrayOf(PropTypes.string),
};
export default translate()(ContactList);
