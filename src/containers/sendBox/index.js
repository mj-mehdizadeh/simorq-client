import * as React from 'react';
import PropTypes from 'prop-types';
import SendBox from '../../components/SendBox';
import {connect} from 'react-redux';
import {random} from 'lodash';
import {getRoomChatId} from '../../selector/rooms';
import {mongoObjectId} from '../../utils/core';
import {getMe} from '../../utils/client';
import {postNewMessage} from '../../services/messages/api';

class SendBoxContainer extends React.PureComponent {
  state = {
    text: '',
  };

  changeText = (text) => {
    this.setState({text});
  };

  onSubmit = () => {
    const {roomId, chatId} = this.props;
    const {text} = this.state;
    if (!text) {
      return;
    }
    postNewMessage({
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

const mapStateToProps = (state, props) => ({
  chatId: getRoomChatId(state, props),
});

export default connect(mapStateToProps)(SendBoxContainer);
