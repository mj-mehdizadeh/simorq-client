// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import RoomCard from '../../components/RoomCard';
import {getRoom} from '../../selector/rooms';
import connect from 'react-redux/es/connect/connect';
import {getRoomLastMessage} from '../../selector/messages';

class RoomCardContainer extends React.PureComponent {
  onPress = () => {
    if (this.props.onPress) {
      this.props.onPress(this.props.roomId);
    }
  };

  render() {
    return <RoomCard
      room={this.props.room}
      lastMessage={this.props.lastMessage}
      type={this.props.type}
      onPress={this.onPress}
    />;
  }
}

const mapStateToProps = (state, props) => ({
  room: getRoom(state, props.roomId),
  lastMessage: props.type === 'room' ? getRoomLastMessage(state, props) : null,
});

export default connect(mapStateToProps)(RoomCardContainer);

RoomCardContainer.defaultProps = {
  type: 'room',
};

RoomCardContainer.propTypes = {
  roomId: PropTypes.string.isRequired,
  index: PropTypes.number,
  room: PropTypes.object.isRequired,
  lastMessage: PropTypes.object,
  onPress: PropTypes.func,
  type: PropTypes.oneOf(['room', 'contact', 'search']),
};
