import * as React from 'react';
import PropTypes from 'prop-types';
import {Text, View} from 'native-base';
import styles from './styles';
import ReplyToContainer from '../../containers/message/reply-to';
import MessageTitle from './message-title';
import Media from './media';
import File from './file';
import Footer from './footer';

class RoomMessage extends React.PureComponent {
  render() {
    const {rules} = this.props;
    return (<View style={rules.isOutbox ? styles.wrap : styles.wrapSelf}>
      {/*render Avatar*/}
      {this.renderBox()}
    </View>);
  }

  renderBox() {
    const {rules, message, roomTitle, readHistoryMaxId, forwardFromTitle, onRoomPress, onForwardFromPress} = this.props;
    return (<View style={!rules.hasBox ? styles.noBox : (rules.isOutbox ? styles.box : styles.boxSelf)}>
      {rules.hasHeader && (<MessageTitle roomTitle={roomTitle} forwardFromTitle={forwardFromTitle} onRoomPress={onRoomPress} onForwardFromPress={onForwardFromPress}/>)}
      {rules.hasReply && <ReplyToContainer replyTo={message.replyTo}/>}
      {rules.hasAttachment && this.renderAttachment()}
      {rules.hasText && this.renderText()}
      <Footer
        failed={message.failed}
        sending={message.sending}
        seen={rules.isOutbox && readHistoryMaxId >= message.id}
        createdAt={message.createdAt}
        isOutbox={message.out}
        media={rules.isMedia && !rules.hasText} message={message}/>
    </View>);
  }

  renderAttachment() {
    const {rules, message} = this.props;
    return (<View style={styles.attachmentBox}>
      {rules.isMedia && <Media medium={message.attachment.thumbs.medium} rules={rules}/>}
      {(rules.isFile || (rules.isMedia && !message.attachment.thumbs.medium)) && <File attachment={message.attachment}/>}
      {rules.isAudio && <File attachment={message.attachment}/>}
    </View>);
  }

  renderText() {
    const {message, rules} = this.props;
    return (<View style={[rules.isOutbox ? styles.textBoxSelf : styles.textBox, {maxWidth: message.box.maxWidth}]}>
      <Text style={styles.text}>{message.text}</Text>
    </View>);
  }
}

RoomMessage.propTypes = {
  message: PropTypes.object.isRequired,
  rules: PropTypes.object.isRequired,
};
export default RoomMessage;
