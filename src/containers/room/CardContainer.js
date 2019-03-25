// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import RoomCard from '../../components/RoomCard';
import {getRoom} from '../../selector/rooms';
import connect from 'react-redux/es/connect/connect';
import {getRoomLastMessage} from '../../selector/messages';

class CardContainer extends React.PureComponent {
  onPress = () => {
    if (this.props.onPress) {
      this.props.onPress(this.props.roomId);
    }
  };

  render() {
    return <RoomCard
      room={this.props.room}
      lastMessage={this.props.lastMessage}
      onPress={this.onPress}
    />;
  }
}

const mapStateToProps = (state, props) => ({
  room: getRoom(state, props),
  lastMessage: getRoomLastMessage(state, props),
});

export default connect(mapStateToProps)(CardContainer);

CardContainer.propTypes = {
  roomId: PropTypes.string.isRequired,
  index: PropTypes.number,
  room: PropTypes.object.isRequired,
  lastMessage: PropTypes.object,
  onPress: PropTypes.func,
};
