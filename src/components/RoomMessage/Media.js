import * as React from 'react';
import PropTypes from 'prop-types';
import {TouchableWithoutFeedback} from 'react-native';
import {translate} from 'react-i18next';
import {Image, View} from 'native-base';
import styles from './styles';

const imageStyle = [styles.imageRound];
class Media extends React.PureComponent {
  static getDerivedStateFromProps(props, state) {
    const {rules, medium} = props;
    if (rules.isOutbox) {
      imageStyle.push(styles.imageRoundSelf);
    }
    if (rules.hasHeader) {
      imageStyle.push(styles.imageFlatTop);
    }
    if (rules.hasText) {
      imageStyle.push(styles.imageFlatBottom);
    }
    imageStyle.push({width: medium.width, height: medium.height});
  }

  render() {
    const {medium, onMediaPress} = this.props;
    return (
      <View style={styles.mediaWrap}>
        <TouchableWithoutFeedback onPress={onMediaPress}>
          <Image style={imageStyle} source={{uri: medium.uri}}/>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

Media.propTypes = {
  t: PropTypes.func.isRequired,
  medium: PropTypes.object,
  rules: PropTypes.object,
  onMediaPress: PropTypes.func,
};

export default translate()(Media);
