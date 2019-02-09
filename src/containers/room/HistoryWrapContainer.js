// @flow
import * as React from 'react';
import RoomHistoryWrap from '../../components/RoomHistoryWrap';

class HistoryWrapContainer extends React.Component {
  state = {
    rooms: [],
    roomId: null,
  };

  openRoom = roomId => {
    if (!this.state.rooms.includes(roomId)) {
      this.setState({
        roomId,
        rooms: [...this.state.rooms, roomId],
      }, this.refs.history.historyIn);
    } else {
      this.setState({roomId}, this.refs.history.historyIn);
    }
  };

  render() {
    return <RoomHistoryWrap
      ref={'history'}
      roomId={this.state.roomId}
      rooms={this.state.rooms}/>;
  }
}

export default HistoryWrapContainer;



