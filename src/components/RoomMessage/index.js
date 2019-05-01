import * as React from 'react';
import PropTypes from 'prop-types';
import {Text, View} from 'native-base';
import styles from './styles';
import ReplyToContainer from '../../containers/message/ReplyToContainer';
import MessageTitle from './MessageTitle';
import Media from './Media';
import File from './File';
import Footer from './Footer';

class RoomMessage extends React.PureComponent {
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
    const {rules, message, readHistoryMaxId} = this.props;
    return (<View style={styles.attachmentBox}>
      {rules.isMedia && <Media attachment={message.attachment} rules={rules}/>}
      {rules.isFile && <File attachment={message.attachment}/>}
      {rules.isAudio && <File attachment={message.attachment}/>}
      {rules.hasText && this.renderText()}
      <Footer
        failed={message.failed}
        sending={message.sending}
        seen={rules.isOutbox && readHistoryMaxId >= message.id}
        createdAt={message.createdAt}
        isOutbox={rules.isOutbox}
        media={rules.isMedia && !rules.hasText} message={message}/>
    </View>);
  }

  renderText() {
    const {text} = this.props.message;
    return (<View style={styles.textBox}>
      <Text style={styles.text}>{text}</Text>
    </View>);
  }
}

RoomMessage.propTypes = {
  t: PropTypes.func.isRequired,
  message: PropTypes.object.isRequired,
  rules: PropTypes.object.isRequired,
};
export default RoomMessage;
