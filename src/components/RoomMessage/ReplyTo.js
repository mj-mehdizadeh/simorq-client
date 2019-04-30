import * as React from 'react';
import PropTypes from 'prop-types';
import {TouchableWithoutFeedback} from 'react-native';
import {translate} from 'react-i18next';
import {Body, Image, Left, Text, View} from 'native-base';
import styles from './styles';

class ReplyTo extends React.PureComponent {

  render() {
    const {t, roomTitle, message, smallThumb, onPress} = this.props;
    return (
      <TouchableWithoutFeedback onPress={onPress} style={styles.replyToTouch}>
        <View style={styles.replyToWrap}>
          {smallThumb && (<Left>
            <Image style={styles.replyImage} source={{uri: smallThumb.uri}}/>
          </Left>)}
          <Body>
            <Text style={styles.replyToTitle}>{t('message.forwardFrom')} <Text bold>{roomTitle}</Text></Text>
            <Text style={styles.replyToMessage}>{message}</Text>
          </Body>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

ReplyTo.propTypes = {
  t: PropTypes.func.isRequired,
  roomTitle: PropTypes.string.isRequired,
  message: PropTypes.string,
  smallThumb: PropTypes.object,
};
export default translate()(ReplyTo);
