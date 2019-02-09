// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import {Body, Button, Footer, Icon, Input} from 'native-base';
import styles from './styles';

export default class SendBox extends React.Component {
  render() {
    const {text, changeText} = this.props;
    return <Footer style={styles.footer}>
      <Body>
        <Button style={styles.footerBtn} small transparent>
          <Icon style={styles.footerIcon} name="sticker-emoji" type="MaterialCommunityIcons"/>
        </Button>
        <Input
          onChangeText={changeText}
          value={text}
          placeholder="Say something..."
          placeholderTextColor="#a1aab3"
          selectionColor="#a1aab3"/>
        <Button style={text !== '' ? styles.hide : styles.footerBtn} small transparent>
          <Icon style={styles.footerIcon} name="camera" type="MaterialCommunityIcons"/>
        </Button>
        <Button style={text !== '' ? styles.hide : styles.footerBtn} small transparent>
          <Icon style={styles.footerIcon} name="paperclip" type="MaterialCommunityIcons"/>
        </Button>
        <Button style={text !== '' ? styles.hide : styles.footerBtn} small transparent>
          <Icon style={styles.footerIcon} name="microphone-outline" type="MaterialCommunityIcons"/>
        </Button>
        <Button style={text === '' ? styles.hide : styles.footerBtn} small transparent>
          <Icon style={styles.footerIcon} name="send"/>
        </Button>
      </Body>
    </Footer>;
  }
}
SendBox.propTypes = {
  text: PropTypes.string,
  changeText: PropTypes.func.isRequired,
};
