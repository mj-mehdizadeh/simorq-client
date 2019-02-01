// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import RoomCard from '../components/RoomCard/RoomCard';
import {getRoom} from '../selector/rooms';
import connect from 'react-redux/es/connect/connect';
import {getRoomLastMessage} from '../selector/messages';

class RoomCardContainer extends React.PureComponent {
  render() {
    return <RoomCard
      room={this.props.room}
      message={this.props.lastMessage}
    />;
  }
}

const mapStateToProps = (state, props) => ({
  room: getRoom(state, props),
  lastMessage: getRoomLastMessage(state, props),
});

export default connect(mapStateToProps)(RoomCardContainer);

RoomCardContainer.propTypes = {
  roomId: PropTypes.string.isRequired,
  index: PropTypes.number,
  room: PropTypes.object.isRequired,
  lastMessage: PropTypes.object,
};
