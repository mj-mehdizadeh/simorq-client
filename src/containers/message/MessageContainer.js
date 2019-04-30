// @flow
import * as React from 'react';
import RoomMessage from '../../components/RoomMessage';
import PropTypes from 'prop-types';
import {getMessage, getMessageForwardFromTitle, getMessageReplyTitle, getMessageRoomTitle} from '../../selector/messages';
import {connect} from 'react-redux';
import {getMessageBoxRules} from '../../services/messages/helper';
import {getRoomProp} from '../../selector/rooms';

class MessageContainer extends React.Component {
  onRoomPress = () => {
    /*navigate room*/
  };
  onForwardFromPress = () => {
    /*navigate room*/
  };
  onReplyPress = () => {
    /*navigate room*/
  };

  render() {
    if (!this.props.message) {
      return null;
    }
    return <RoomMessage
      rules={getMessageBoxRules(this.props.id, this.props.roomType)}
      message={this.props.message}
      roomTitle={this.props.roomTitle}
      forwardFromTitle={this.props.forwardFromTitle}
      replyToTitle={this.props.replyToTitle}
      onRoomPress={this.onRoomPress}
      onForwardFromPress={this.onForwardFromPress}
      onReplyPress={this.onReplyPress}
    />;
  }
}

MessageContainer.propTypes = {
  id: PropTypes.string.isRequired,
};
const mapStateToProps = (state, props) => ({
  message: getMessage(state, props.id),
  roomTitle: getMessageRoomTitle(state, props.id),
  roomType: getRoomProp(state, {roomId: props.roomId, key: 'type'}),
  forwardFromTitle: getMessageForwardFromTitle(state, props.id),
  replyToTitle: getMessageReplyTitle(state, props.id),
});

export default connect(mapStateToProps)(MessageContainer);
