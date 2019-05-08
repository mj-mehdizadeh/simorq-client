import * as React from 'react';
import PropTypes from 'prop-types';
import {getMessageProp, getMessageRoomTitle} from '../../selector/messages';
import {connect} from 'react-redux';
import ReplyTo from '../../components/RoomMessage/reply-to';

class ReplyToContainer extends React.PureComponent {
  onPress = () => {
    /*go to message*/
  };

  render() {
    return <ReplyTo
      roomTitle={this.roomTitle}
      message={this.message}
      smallThumb={this.smallThumb}
      onPress={this.onPress}
    />;
  }
}

const mapStateToProps = (state, props) => ({
  roomId: getMessageProp(state, {id: props.replyTo, key: 'roomId'}),
  roomTitle: getMessageRoomTitle(state, props.replyTo),
  message: getMessageProp(state, {id: props.replyTo, key: 'message'}),
  smallThumb: getMessageProp(state, {id: props.replyTo, key: 'attachment.thumbs.small'}),
});

ReplyToContainer.propTypes = {
  replyTo: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(ReplyToContainer);

