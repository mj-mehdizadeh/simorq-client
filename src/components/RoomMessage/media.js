import * as React from 'react';
import PropTypes from 'prop-types';
import {Image, TouchableWithoutFeedback} from 'react-native';
import {View} from 'native-base';
import styles from './styles';

class Media extends React.PureComponent {
  state = {
    imageStyle: [styles.imageRound],
  };

  componentDidMount() {
    const {rules, medium} = this.props;
    const imageStyle = [];
    imageStyle.push(styles.imageRound);
    if (!rules.isOutbox) {
      imageStyle.push(styles.imageRoundSelf);
    }
    if (rules.hasHeader) {
      imageStyle.push(styles.imageFlatTop);
    }
    if (rules.hasText) {
      imageStyle.push(styles.imageFlatBottom);
    }
    imageStyle.push({width: medium.width - 4, height: medium.height});
    this.setState({imageStyle});
  }

  render() {
    const {medium, onMediaPress} = this.props;
    return (
      <View style={styles.mediaWrap}>
        <TouchableWithoutFeedback onPress={onMediaPress}>
          <Image style={this.state.imageStyle} source={{uri: medium.uri}}/>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

Media.propTypes = {
  medium: PropTypes.object,
  rules: PropTypes.object,
  onMediaPress: PropTypes.func,
};

export default Media;
