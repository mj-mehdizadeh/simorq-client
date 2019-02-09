// @flow
import * as React from 'react';
import {BackHandler} from 'react-native';
import RoomHistoryWrap from '../../components/RoomHistoryWrap';

class HistoryWrapContainer extends React.PureComponent {
  state = {
    rooms: [],
    roomId: null,
  };

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress = () => {
    if (!this.state.roomId) {
      return false;
    }
    this.setState({roomId: null}, this.refs.history.historyOut);
    return true;
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



