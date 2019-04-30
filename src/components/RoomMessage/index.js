import * as React from 'react';
import PropTypes from 'prop-types';
import {Icon, Text, View} from 'native-base';
import styles from './styles';
import {translate} from 'react-i18next';
import ReplyToContainer from '../../containers/message/ReplyToContainer';
import MessageTitle from './MessageTitle';
import Media from './Media';

class RoomMessage extends React.Component {
  render() {
    const {rules} = this.props;
    return (<View style={rules.isOutbox ? styles.wrap : styles.wrapSelf}>
      {/*render Avatar*/}
      {this.renderBox()}
    </View>);
  }

  renderBox() {
    const {rules, message, roomTitle, forwardFromTitle, onRoomPress, onForwardFromPress} = this.props;
    return (<View style={!rules.hasBox ? styles.noBox : (rules.isOutbox ? styles.box : rules.boxSelf)}>
      {rules.hasHeader && (<MessageTitle roomTitle={roomTitle} forwardFromTitle={forwardFromTitle} onRoomPress={onRoomPress} onForwardFromPress={onForwardFromPress}/>)}
      {rules.hasReply && <ReplyToContainer replyTo={message.replyTo}/>}
      {rules.hasAttachment && this.renderAttachment()}
    </View>);
  }

  renderAttachment() {
    const {rules, message} = this.props;
    return (<View style={styles.attachmentBox}>
      {rules.isMedia && <Media text={message.text} attachment={message.attachment} rules={rules}/>}
      {rules.isFile && this.renderFile()}
      {rules.isAudio && this.renderAudio()}
      {rules.hasText && this.renderText(true)}
      {(rules.isMedia && !rules.hasText) && this.renderFooter()}
    </View>);
  }

  renderMedia() {
    return (<View style={styles.mediaBox}>

    </View>);
  }

  renderAudio() {
    return (<View style={styles.audioBox}>

    </View>);
  }

  renderFile() {
    return (<View style={styles.fileBox}>

    </View>);
  }

  renderText(capture) {
    return (<View style={styles.textBox}>

    </View>);
  }

  renderFooter(media) {
    const {t, message, rules, readHistoryMaxId} = this.props;
    return (<View style={media ? styles.mediaFooterWrap : styles.footerWrap}>
      <View style={rules.isOutbox ? styles.footerSelf : styles.footer}>
        <Text style={styles.timeWrap}>
          {t('date.msgTime', {date: message.createdAt})}
        </Text>
        <Text style={styles.statusWrap}>
          {message.failed ? (<Icon style={styles.statusIconFailed} name="info"/>) : (
            message.sending ? (<Icon style={styles.statusIconDeliver} name="schedule"/>) : (
              rules.isOutbox && readHistoryMaxId >= message.id ? (<Icon style={styles.statusIconSeen} name="check-all" type="MaterialCommunityIcons"/>) : (
                rules.isOutbox && (<Icon style={styles.statusIconDeliver} name="check" type="MaterialCommunityIcons"/>)
              )
            )
          )}
        </Text>
        {/*Channel Views and else...*/}
      </View>
    </View>);
  }
}

RoomMessage.propTypes = {
  t: PropTypes.func.isRequired,
  message: PropTypes.object.isRequired,
  rules: PropTypes.object.isRequired,
};
export default translate()(RoomMessage);
