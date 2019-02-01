import * as React from 'react';
import {connect} from 'react-redux';
import RoomList from '../components/RoomList/index';
import RoomsCreators from '../redux/rooms';
import {getRoomList} from '../selector/rooms';

class RoomListScreen extends React.PureComponent {

  componentDidMount() {
    const {getRoomList} = this.props;
    getRoomList();
  }

  render() {
    return <RoomList rooms={this.props.rooms}/>;
  }
}

function bindAction(dispatch) {
  return {
    getRoomList: () => dispatch(RoomsCreators.getRoomList()),
  };
}

const mapStateToProps = state => ({
  rooms: getRoomList(state),
});

export default connect(mapStateToProps, bindAction)(RoomListScreen);
