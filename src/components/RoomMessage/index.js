// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import {Image, TouchableWithoutFeedback} from 'react-native';
import {Icon, Text, View} from 'native-base';
import styles, {boxSelf, footerSelf, imageSelf, wrapSelf} from './styles';
import {translate} from 'react-i18next';

class RoomMessage extends React.Component {
  render() {
    const {message} = this.props;
    return <View style={message.out ? wrapSelf : styles.wrap}>
      <View style={message.out ? boxSelf : styles.box}>
        {!!message.image && (<Image style={message.out ? imageSelf : styles.image} source={{uri: message.image}}/>)}
        {this.renderMessage()}
        {this.renderFooter()}
      </View>
    </View>;
  }

  renderMessage() {
    const {message} = this.props;
    return (<TouchableWithoutFeedback style={styles.text}>
      <Text>{message.text}</Text>
    </TouchableWithoutFeedback>);
  }

  renderFooter() {
    const {t, message, readHistoryMaxId} = this.props;
    return (<Text style={message.out ? footerSelf : styles.footer}>
      {t('date.msgTime', {date: message.createdAt})}
      {message.out && (<Icon style={styles.statusIconDeliver} name="check" type="MaterialCommunityIcons"/>)}
      {(message.out && readHistoryMaxId >= message.id) && (<Icon style={styles.statusIconSeen} name="check-all" type="MaterialCommunityIcons"/>)}
    </Text>);
  }
}

RoomMessage.propTypes = {
  t: PropTypes.func.isRequired,
  message: PropTypes.object.isRequired,
};
export default translate()(RoomMessage);
