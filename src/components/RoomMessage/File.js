import * as React from 'react';
import PropTypes from 'prop-types';
import {TouchableWithoutFeedback} from 'react-native';
import {translate} from 'react-i18next';
import {Button, Icon, Text, View} from 'native-base';
import styles from './styles';
import {convertBytes, convertSecendToTime} from '../../utils/core';

class File extends React.PureComponent {

  render() {
    const {attachment, onPress} = this.props;
    return (
      <View style={styles.fileWrap}>
        <TouchableWithoutFeedback onPress={onPress}>
          <View style={styles.fileBox}>
            <View style={styles.fileLeft}>
              <Button style={styles.downloadBtn} info round>
                <Icon name="arrow-downward" style={styles.downloadBtnIcon}/>
              </Button>
            </View>
            <View style={styles.fileBody}>
              <Text bold style={styles.fileName} numberOfLines={1}>
                {attachment.name}
              </Text>
              <Text style={styles.fileInfo}>
                {convertBytes(attachment.size)} - {attachment.duration ? convertSecendToTime(attachment.duration) : attachment.mimeType}
              </Text>
            </View>
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
