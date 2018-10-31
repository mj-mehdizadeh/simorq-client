// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import {Image, TouchableWithoutFeedback} from 'react-native';
import {Icon, Text, View} from 'native-base';
import styles, {boxSelf, footerSelf, imageSelf, wrapSelf} from './styles';

export default class RoomMessage extends React.Component {
  render() {
    const {message} = this.props;
    return <View style={message.sender ? wrapSelf : styles.wrap}>
      <View style={message.sender ? boxSelf : styles.box}>
        {!!message.image && (<Image style={message.sender ? imageSelf : styles.image} source={{uri: message.image}}/>)}
        {this.renderMessage()}
      </View>
    </View>;
  }

  renderMessage() {
    const {message} = this.props;
    return (<TouchableWithoutFeedback style={styles.text}>
      <Text>{message.message}</Text>
    </TouchableWithoutFeedback>);
  }

  renderFooter() {
    const {message} = this.props;
    return (<Text style={message.sender ? footerSelf : styles.footer}>
      {message.time}
      {message.sender && (<Icon style={styles.statusIcon} name="check" type="MaterialCommunityIcons"/>)}
    </Text>);
  }
}

RoomMessage.propTypes = {
  message: PropTypes.object.isRequired,
};
