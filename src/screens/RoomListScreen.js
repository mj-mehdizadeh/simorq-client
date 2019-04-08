import * as React from 'react';
import {connect} from 'react-redux';
import RoomList from '../components/RoomList/index';
import {getRoomList} from '../selector/rooms';
import Socket from '../services/socket';

class RoomListScreen extends React.PureComponent {

  componentDidMount() {
    Socket.init([]);
  }

  render() {
    return <RoomList
      rooms={this.props.rooms}/>;
  }
}

const mapStateToProps = state => ({
  rooms: getRoomList(state),
});

export default connect(mapStateToProps)(RoomListScreen);
