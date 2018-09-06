import * as React from 'react';
import RoomList from '../components/RoomList/index';

export default class RoomListScreen extends React.Component {
  state = {
    roomList: [],
  };

  componentDidMount() {
    this.setState({
      roomList: require('../../data/roomList'),
    });
  }

  render() {
    return <RoomList roomList={this.state.roomList}/>;
  }
}
