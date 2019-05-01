import * as React from 'react';
import PropTypes from 'prop-types';
import {TouchableWithoutFeedback} from 'react-native';
import {translate} from 'react-i18next';
import {Image, View} from 'native-base';
import styles from './styles';

class Media extends React.PureComponent {

  render() {
    const {attachment, rules, onMediaPress} = this.props;
    let imageStyleRound = rules.hasText ? 'imageRoundTop' : 'imageRound';
    imageStyleRound += rules.isOutbox ? 'self' : '';
    return (
      <View style={styles.mediaWrap}>
        <TouchableWithoutFeedback onPress={onMediaPress}>
          <Image style={rules.hasReply || rules.hasHeader ? (
            rules.hasText ? styles.imageFlat : styles.imageRoundBottom
          ) : (
            styles[imageStyleRound]
          )} source={{uri: attachment.medium.uri}}/>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

Media.propTypes = {
  t: PropTypes.func.isRequired,
  attachment: PropTypes.object,
  rules: PropTypes.object,
  onMediaPress: PropTypes.func,
};

export default translate()(Media);
