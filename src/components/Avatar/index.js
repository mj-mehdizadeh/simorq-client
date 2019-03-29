import React, {PureComponent} from 'react';
import {ImageBackground, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {Text} from 'native-base';
import styles from './styles';

class Avatar extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showTxt: !props.uri,
    };
  }

  onImageError = () => {
    this.setState({showTxt: true});
  };

  render() {
    const {uri, initial, backgroundColor, color, size} = this.props;
    return (<ImageBackground
      source={{uri}}
      onError={this.onImageError}
      style={StyleSheet.flatten([styles.container, styles[this.props.size], {backgroundColor}])}>
      {this.state.showTxt && (<Text
        style={StyleSheet.flatten([styles[`text-${size}`], {color}])}>
        {initial.toUpperCase()}
      </Text>)}
    </ImageBackground>);
  }
}

Avatar.propTypes = {
  uri: PropTypes.string,
  color: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  initial: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['x-small', 'small', 'medium']),
};

export default Avatar;
