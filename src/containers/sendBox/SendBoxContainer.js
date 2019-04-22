import * as React from 'react';
import PropTypes from 'prop-types';
import SendBox from '../../components/SendBox';
import MessageCreators from '../../redux/messages';
import {connect} from 'react-redux';
import {random} from 'lodash';
import {getRoomChatId} from '../../selector/rooms';
import {mongoObjectId} from '../../utils/core';
import {getMe} from '../../utils/client';

class SendBoxContainer extends React.PureComponent {
  state = {
    text: '',
  };

  changeText = (text) => {
    this.setState({text});
  };

  onSubmit = () => {
    const {roomId, chatId, sendNewMessage} = this.props;
    const {text} = this.state;
    if (!text) {
      return;
    }
    sendNewMessage({
      id: mongoObjectId(),
      chatId,
      randomId: random(10000000, 999999999),
      text,
      roomId: getMe('roomId'),
      sending: true,
    }, {
      roomId,
    });
    this.setState({text: null});
  };

  render() {
    return <SendBox
      changeText={this.changeText}
      onSubmit={this.onSubmit}
      text={this.state.text}/>;
  }
}

SendBoxContainer.propTypes = {
  roomId: PropTypes.string,
};

function bindAction(dispatch) {
  return {
    sendNewMessage: (message, params) => dispatch(MessageCreators.newMessage(message, params)),
  };
}

const mapStateToProps = (state, props) => ({
  chatId: getRoomChatId(state, props),
});

export default connect(mapStateToProps, bindAction)(SendBoxContainer);
