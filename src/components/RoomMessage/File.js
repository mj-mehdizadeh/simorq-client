import * as React from 'react';
import PropTypes from 'prop-types';
import {TouchableWithoutFeedback} from 'react-native';
import {translate} from 'react-i18next';
import {Body, Button, Icon, Left, Text, View} from 'native-base';
import styles from './styles';
import {convertBytes, convertSecendToTime} from '../../utils/core';

class File extends React.PureComponent {

  render() {
    const {attachment, onPress} = this.props;
    return (
      <View style={styles.fileWrap}>
        <TouchableWithoutFeedback onPress={onPress}>
          <View style={styles.fileBox}>
            <Left>
              <Button info round>
                <Icon name="arrow-downward"/>
              </Button>
            </Left>
            <Body>
              <Text style={styles.fileName}>
                {attachment.name}
              </Text>
              <Text style={styles.fileInfo}>
                {convertBytes(attachment.size)} - {attachment.duration ? convertSecendToTime(attachment.duration) : attachment.mimeType}
              </Text>
            </Body>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

File.propTypes = {
  t: PropTypes.func.isRequired,
  attachment: PropTypes.object,
  onPress: PropTypes.func,
};

export default translate()(File);
