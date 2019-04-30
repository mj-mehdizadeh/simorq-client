import * as React from 'react';
import PropTypes from 'prop-types';
import {TouchableWithoutFeedback} from 'react-native';
import {translate} from 'react-i18next';
import {Text} from 'native-base';
import styles from './styles';

class MessageTitle extends React.PureComponent {

  render() {
    const {t, roomTitle, forwardFromTitle, onForwardFromPress, onRoomPress} = this.props;
    if (forwardFromTitle) {
      return (<TouchableWithoutFeedback
        style={styles.header}
        onPress={onForwardFromPress}>
        <Text style={styles.headerTitle}>
          {t('message.forwardFrom')}
          <Text bold>{forwardFromTitle}</Text>
        </Text>
      </TouchableWithoutFeedback>);
    }
    return (<TouchableWithoutFeedback
      style={styles.header}
      onPress={onRoomPress}>
      <Text style={styles.headerTitle} bold>
        {roomTitle}
      </Text>
    </TouchableWithoutFeedback>);
  }
}

MessageTitle.propTypes = {
  t: PropTypes.func.isRequired,
  roomTitle: PropTypes.string,
  forwardFromTitle: PropTypes.string,
  onForwardFromPress: PropTypes.func,
  onRoomPress: PropTypes.func,
};

export default translate()(MessageTitle);
