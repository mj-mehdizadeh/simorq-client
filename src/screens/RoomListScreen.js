import * as React from 'react';
import { connect } from 'react-redux';
import RoomList from '../components/RoomList/index';
import RoomsCreators from '../redux/rooms';

class RoomListScreen extends React.Component {
  state = {
    roomList: [],
  };

  componentDidMount() {
    const {getRoomList} = this.props;
    getRoomList();
    this.setState({
      roomList: [],
    });
  }

  render() {
    return <RoomList roomList={this.state.roomList}/>;
  }
}

function bindAction(dispatch) {
  return {
    getRoomList: () => dispatch(RoomsCreators.getRoomList()),
  };
}
const mapStateToProps = state => ({
  rooms: state.rooms,
});

export default connect(mapStateToProps, bindAction)(RoomListScreen);
