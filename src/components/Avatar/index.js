import React, {PureComponent} from 'react';
import {StyleSheet, ImageBackground} from 'react-native';
import PropTypes from 'prop-types';
import {Text} from 'native-base';
import styles from './styles';

class AvatarComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showTxt: !props.uri,
    };
  }

  onLoadStart = () => {
    console.log('onLoadStart', this.props.initial);
  };
  onImageError = () => {
    this.setState({showTxt: true});
  };

  render() {
    const {uri, initial, color, size} = this.props;
    return (<ImageBackground
      source={{uri}}
      onLoadStart={this.onLoadStart}
      onError={this.onImageError}
      style={StyleSheet.flatten([styles.container, styles[this.props.size], {backgroundColor: color}])}>
      {this.state.showTxt && (<Text
        bold={true}
        style={styles[`text-${size}`]}>
        {initial.toUpperCase()}
      </Text>)}
    </ImageBackground>);
  }
}

AvatarComponent.propTypes = {
  uri: PropTypes.string,
  color: PropTypes.string.isRequired,
  initial: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['x-small', 'small', 'medium']),
};

AvatarComponent.defaultProps = {
  size: 'medium',
};

export default AvatarComponent;