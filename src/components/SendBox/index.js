// @flow
import * as React from 'react';
import {Body, Button, Footer, Icon, Input} from 'native-base';
import styles from './styles';

export default class SendBox extends React.Component {
  render() {
    return <Footer style={styles.footer}>
      <Body>
        <Button style={styles.footerBtn} small transparent>
          <Icon style={styles.footerIcon} name="sticker-emoji" type="MaterialCommunityIcons"/>
        </Button>
        <Input placeholder="Message" placeholderTextColor="#a1aab3" selectionColor="#a1aab3"/>
        <Button style={styles.footerBtn} small transparent>
          <Icon style={styles.footerIcon} name="camera" type="MaterialCommunityIcons"/>
        </Button>
        <Button style={styles.footerBtn} small transparent>
          <Icon style={styles.footerIcon} name="paperclip" type="MaterialCommunityIcons"/>
        </Button>
        <Button style={styles.footerBtn} small transparent>
          <Icon style={styles.footerIcon} name="microphone-outline" type="MaterialCommunityIcons"/>
        </Button>
      </Body>
    </Footer>;
  }
}
